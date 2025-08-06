
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
    id: 'text-generation-inference',
    name: 'Text Generation Inference',
    description: 'A job that runs a text generation inference model.',
    template: 'default-job',
    params: {
      container_name: 'text-generation-inference',
      image: 'ghcr.io/huggingface/text-generation-inference:sha-9f38d93-trtllm',
      command: [ "--json-output" ]
    },
  },
];
