import { useState, useEffect } from 'react';
import axios from 'axios';
import { jobs } from './jobs';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Paper,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { PlayArrow, Description } from '@mui/icons-material';

function App() {
  const [selectedJob, setSelectedJob] = useState(jobs[0]);
  const [params, setParams] = useState(selectedJob.params);
  const [jobName, setJobName] = useState('');
  const [status, setStatus] = useState('');
  const [log, setLog] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleJobChange = (event) => {
    const job = jobs.find((j) => j.id === event.target.value);
    setSelectedJob(job);
    setParams(job.params);
  };

  const handleParamsChange = (event) => {
    setParams({ ...params, [event.target.name]: event.target.value });
  };

  const runJob = async () => {
    setLoading(true);
    setError('');
    setJobName('');
    setStatus('');
    setLog('');

    try {
      const res = await axios.post('/api/jobs/run', {
        template: selectedJob.template,
        params,
      });
      setJobName(res.data.job_name);
      pollStatus(res.data.job_name);
    } catch (err) {
      setError('Failed to run job. Please check the backend.');
      setLoading(false);
    }
  };

  const pollStatus = (jobName) => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`/api/jobs/${jobName}/status`);
        setStatus(res.data.status);
        if (res.data.status === 'succeeded' || res.data.status === 'failed') {
          clearInterval(interval);
          setLoading(false);
          const logRes = await axios.get(`/api/jobs/${jobName}/logs`);
          setLog(logRes.data.log);
        }
      } catch (err) {
        setError('Failed to get job status.');
        setLoading(false);
        clearInterval(interval);
      }
    }, 2000);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Job Platform
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Select a Job
                </Typography>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel id="job-select-label">Job</InputLabel>
                  <Select
                    labelId="job-select-label"
                    value={selectedJob.id}
                    onChange={handleJobChange}
                  >
                    {jobs.map((job) => (
                      <MenuItem key={job.id} value={job.id}>
                        {job.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Typography sx={{ mt: 2 }}>{selectedJob.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Job Parameters
                </Typography>
                {Object.entries(params).map(([key, value]) => (
                  <TextField
                    key={key}
                    name={key}
                    label={key}
                    value={value}
                    onChange={handleParamsChange}
                    fullWidth
                    sx={{ mt: 2 }}
                  />
                ))}
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  startIcon={<PlayArrow />}
                  onClick={runJob}
                  disabled={loading}
                >
                  Run Job
                </Button>
              </CardActions>
            </Card>
          </Grid>
          {(loading || jobName || error) && (
            <Grid item xs={12}>
              <Paper sx={{ p: 2, mt: 2 }}>
                <Typography variant="h6">Job Status</Typography>
                {loading && <CircularProgress sx={{ mt: 2 }} />}
                {error && <Alert severity="error">{error}</Alert>}
                {jobName && <Typography>Job Name: {jobName}</Typography>}
                {status && <Typography>Status: {status}</Typography>}
                {log && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h6">Log</Typography>
                    <Paper component="pre" sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                      {log}
                    </Paper>
                  </Box>
                )}
              </Paper>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}

export default App;