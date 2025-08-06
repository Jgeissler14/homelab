
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
    id: 'fraud-detection',
    name: 'Fraud Detection',
    description: 'A job that runs a fraud detection inference model.',
    template: 'default-job',
    params: {
      container_name: 'fraud-detection',
      image: 'tomsriddle/fraud-detection:1.0',
      command: [ "fraud_service.py" ]
    },
  },
];
