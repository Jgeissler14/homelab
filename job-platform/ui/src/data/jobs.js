export const jobs = [
  {
    id: 'ubuntu-sleep',
    name: 'Ubuntu Sleep',
    description: 'A simple job that sleeps for 30 seconds.',
    template: 'default-job',
    params: {
      container_name: 'ubuntu',
      image: 'ubuntu:latest',
      command: ['sleep', '30'],
    },
  },
  {
    id: 'alpine-wget',
    name: 'Alpine Wget',
    description: 'A simple job that uses wget to download a file.',
    template: 'default-job',
    params: {
      container_name: 'alpine',
      image: 'alpine:latest',
      command: ['wget', '-q', '-O', '-', 'https://example.com'],
    },
  },
  {
    id: 'url-health-check',
    name: 'URL Health Check',
    description: 'Checks HTTP status and latency for a URL.',
    template: 'default-job',
    params: {
      container_name: 'url-health-check',
      image: 'curlimages/curl:latest',
      command: [
        'sh','-lc',
        'URL=https://example.com; ',
        'echo "Checking $URL"; ',
        'curl -s -o /dev/null -w "HTTP %{http_code} | time_total=%{time_total}s | size=%{size_download}B\\n" "$URL"'
      ],
    },
  },
  {
    id: 'repo-scan',
    name: 'Repo Snapshot (Git)',
    description: 'Clones a repo shallow and prints a quick file tree.',
    template: 'default-job',
    params: {
      container_name: 'repo-scan',
      image: 'alpine/git:latest',
      command: [
        'sh','-lc',
        'set -e; REPO=https://github.com/octocat/Hello-World.git; ',
        'echo "Cloning $REPO (depth=1)"; ',
        'git clone --depth=1 "$REPO" repo >/dev/null 2>&1; ',
        'echo "--- Files ---"; ',
        'cd repo && find . -maxdepth 2 -type f -print'
      ],
    },
  },
  {
    id: 'csv-quick-stats',
    name: 'CSV Quick Stats',
    description: 'Downloads a small CSV and prints row count and simple stats (stdlib only).',
    template: 'default-job',
    params: {
      container_name: 'csv-quick-stats',
      image: 'python:3.11-alpine',
      command: [
        'python','-c',
        'import csv, io, urllib.request, statistics as st; ',
        'url="https://people.sc.fsu.edu/~jburkardt/data/csv/airtravel.csv"; ',
        'print(f"Fetching {url}"); ',
        'data=urllib.request.urlopen(url, timeout=15).read().decode(); ',
        'rows=list(csv.DictReader(io.StringIO(data))); ',
        'print(f"Rows: {len(rows)}"); ',
        'vals=[int(r["1958"]) for r in rows if r.get("1958")]; ',
        'print("1958 flights -> min:",min(vals),"max:",max(vals),"avg:",round(st.mean(vals),2))'
      ],
    },
  },
  {
    id: 'weather-agent',
    name: 'Weather Summary (Agent Steps)',
    description: 'Calls a public API and logs plan → action → observation → summary (stdlib only).',
    template: 'default-job',
    params: {
      container_name: 'weather-agent',
      image: 'python:3.11-alpine',
      command: [
        'python','-c',
        'import json, urllib.request, time; ',
        'lat,lon=39.0997,-94.5786; ',
        'print("Plan: Get current weather for Kansas City"); time.sleep(0.5); ',
        'url=f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,relative_humidity_2m,weather_code"; ',
        'print("Action: GET", url); ',
        'resp=urllib.request.urlopen(url, timeout=15).read().decode(); ',
        'print("Observation: received bytes", len(resp)); time.sleep(0.5); ',
        'cur=json.loads(resp)["current"]; ',
        't=cur.get("temperature_2m"); rh=cur.get("relative_humidity_2m"); ',
        'print(f"Final: KC now ~{t}°C, RH {rh}%")'
      ],
    },
  },
  {
    id: 'dns-lookup',
    name: 'DNS Lookup + Timing',
    description: 'Resolves a hostname using Cloudflare DNS and prints timing.',
    template: 'default-job',
    params: {
      container_name: 'dns-lookup',
      image: 'alpine:latest',
      command: [
        'sh','-lc',
        'set -e; HOST=example.com; echo "Resolving $HOST via 1.1.1.1"; ',
        'START=$(date +%s%3N); nslookup $HOST 1.1.1.1; ',
        'END=$(date +%s%3N); echo "Lookup took $((END-START)) ms"'
      ],
    },
  },
];
