export const detectOS = () => {
  const agent = navigator.userAgent;
  if (agent.indexOf('Win') !== -1) return 'Windows';
  if (agent.indexOf('Mac') !== -1) return 'Mac OS';
  if (agent.indexOf('Linux') !== -1) return 'Linux';
  return 'Unknown';
};
