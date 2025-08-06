import { useState } from 'react'

function App() {
  const [image, setImage] = useState('')
  const [command, setCommand] = useState('')
  const [job, setJob] = useState('')
  const [status, setStatus] = useState('')
  const [log, setLog] = useState('')

  const runJob = async () => {
    const res = await fetch('/api/jobs/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ template: 'my-job', params: {
        container_name: 'job',
        image,
        command
      }})
    })
    const data = await res.json()
    setJob(data.job_name)
    pollStatus(data.job_name)
  }

  const pollStatus = (jobName) => {
    const interval = setInterval(async () => {
      const res = await fetch(`/api/jobs/${jobName}/status`)
      const data = await res.json()
      setStatus(data.status)
      if (data.status === 'succeeded' || data.status === 'failed') {
        clearInterval(interval)
        const logRes = await fetch(`/api/jobs/${jobName}/logs`)
        const logData = await logRes.json()
        setLog(logData.log)
      }
    }, 1000)
  }

  return (
    <div>
      <h1>Run Job</h1>
      <input
        placeholder="Image"
        value={image}
        onChange={e => setImage(e.target.value)}
      />
      <input
        placeholder="Command"
        value={command}
        onChange={e => setCommand(e.target.value)}
      />
      <button onClick={runJob}>Run</button>
      {job && <div>Job: {job}</div>}
      {status && <div>Status: {status}</div>}
      {log && <pre>{log}</pre>}
    </div>
  )
}

export default App
