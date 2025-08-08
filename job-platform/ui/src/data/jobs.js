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
    },
  },
];
