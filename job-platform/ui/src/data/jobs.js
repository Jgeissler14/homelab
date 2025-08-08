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
    id: 'pdf-summarizer',
    name: 'PDF Summarizer',
    description: 'Downloads a sample PDF and extracts the text for quick review.',
    template: 'default-job',
    params: {
      container_name: 'pdf-summarizer',
      image: 'python:3.11-alpine',
      command: [
        'sh', '-lc',
        'pip install --quiet pymupdf && ',
        'wget -q https://arxiv.org/pdf/2106.14834.pdf -O sample.pdf && ',
        'python -c "import fitz; doc=fitz.open(\'sample.pdf\'); ',
        'print(\'--- First 5 lines of text ---\'); ',
        '[print(page.get_text().splitlines()[0:5]) or exit() for page in doc[:1]]"'
      ],
    },
  },
  {
    id: 'website-scan',
    name: 'Website Metadata Extractor',
    description: 'Fetches a site and extracts title, description, and headings.',
    template: 'default-job',
    params: {
      container_name: 'website-scan',
      image: 'python:3.11-alpine',
      command: [
        'sh', '-lc',
        'pip install --quiet requests beautifulsoup4 && ',
        'python -c "import requests,bs4; ',
        'r=requests.get(\'https://example.com\'); ',
        's=bs4.BeautifulSoup(r.text, \'html.parser\'); ',
        'print({\'title\':s.title.string, ',
        '\'description\':s.find(\'meta\',attrs={\'name\':\'description\'}) and s.find(\'meta\',attrs={\'name\':\'description\'})[\'content\'], ',
        '\'headings\':[h.text for h in s.find_all(\'h1\')]})"'
      ],
    },
  },
  {
    id: 'sentiment-analysis',
    name: 'Sentiment Analysis',
    description: 'Runs a small AI model to detect sentiment in a text snippet.',
    template: 'default-job',
    params: {
      container_name: 'sentiment-analysis',
      image: 'python:3.11-alpine',
      command: [
        'sh', '-lc',
        'pip install --quiet textblob && ',
        'python -c "from textblob import TextBlob; ',
        'text=\'Customer service was fast and friendly!\'; ',
        'print(f\'Text: {text}\'); ',
        'print(\'Sentiment:\', TextBlob(text).sentiment)"'
      ],
    },
  },
  {
    id: 'csv-insight',
    name: 'CSV Quick Insights',
    description: 'Downloads a sample CSV and prints basic stats.',
    template: 'default-job',
    params: {
      container_name: 'csv-insight',
      image: 'python:3.11-alpine',
      command: [
        'sh', '-lc',
        'pip install --quiet pandas && ',
        'wget -q https://people.sc.fsu.edu/~jburkardt/data/csv/airtravel.csv -O data.csv && ',
        'python -c "import pandas as pd; ',
        'df=pd.read_csv(\'data.csv\'); print(df.head()); print(df.describe())"'
      ],
    },
  },
  {
    id: 'ai-agent-sim',
    name: 'Agentic AI Workflow Demo',
    description: 'Simulates a short AI agent reasoning and tool use cycle.',
    template: 'default-job',
    params: {
      container_name: 'ai-agent-sim',
      image: 'python:3.11-alpine',
      command: [
        'python', '-c',
        'import time; print("Goal: Get weather for Kansas City"); ',
        'time.sleep(1); print("Step 1: Call weather API..."); ',
        'time.sleep(1); print("Observation: 85°F, Sunny"); ',
        'print("Step 2: Summarize for user"); ',
        'time.sleep(1); print("Final: It\'s sunny and 85°F in KC today.")'
      ],
    },
  },
];
