import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 100,
  stages: [
    { duration: '1m', target: 1000 },
    { duration: '3m', target: 5000 },
    { duration: '1m', target: 0 },
  ],
};

export default function () {
  http.get('http://20.120.147.230');
  sleep(0.1);
}