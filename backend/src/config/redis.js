/**
 * Redis client (SADD 2.2: cache + queue + pub/sub).
 * Optional: connect only if REDIS_URL is set. Use for cache, queues, realtime later.
 */
let client = null;

export function getRedis() {
  return client;
}

export async function connectRedis() {
  const url = process.env.REDIS_URL;
  if (!url) {
    console.log('Redis: no REDIS_URL set, skipping');
    return null;
  }
  try {
    const { createClient } = await import('redis');
    client = createClient({ url });
    client.on('error', (err) => console.warn('Redis error:', err.message));
    await client.connect();
    console.log('Redis connected');
    return client;
  } catch (err) {
    console.warn('Redis connection failed:', err.message);
    return null;
  }
}
