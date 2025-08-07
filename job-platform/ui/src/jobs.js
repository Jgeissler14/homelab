
export const fetchJobs = async () => {
  const response = await fetch('/api/jobs');
  const data = await response.json();
  return data.templates;
};
