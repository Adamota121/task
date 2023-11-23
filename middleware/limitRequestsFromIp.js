const rateLimit = {};

export function limitRequestsPerIP(req, res, next) {
  const ip = req.ip;
  
  if (rateLimit[ip]) {
    const timeSinceLastRequest = Date.now() - rateLimit[ip];
    if (timeSinceLastRequest < 2000) {
      // Если прошло меньше 2 секунд, отправляем ошибку 429 (слишком много запросов)
      return res.status(429).json({ error: 'Too many requests' });
    }
  }

  // Обновляем время последнего запроса для данного IP-адреса
  rateLimit[ip] = Date.now();

  next();
}
