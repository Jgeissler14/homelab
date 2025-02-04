import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 100,
  stages: [
    { duration: '1m', target: 100 },
    { duration: '3m', target: 500 },
    { duration: '1m', target: 0 },
  ],
};

export default function () {
  http.get('http://my-website.com');
  sleep(0.1);
}