export default function TTLExpirationWorker(cache, interval = 5000) {
  const intervalId = setInterval(() => {
    cache.cleanupExpired();
  }, interval);

  return function stop() {
    clearInterval(intervalId);
  };
}
