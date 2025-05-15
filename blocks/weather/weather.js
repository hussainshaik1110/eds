export default async function decorate(block) {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  
    // Try using browser Cache API
    const cacheKey = new Request(apiUrl);
    const cache = await caches.open('weather-block-cache');
  
    let response = await cache.match(cacheKey);
  
    if (!response) {
      try {
        response = await fetch(apiUrl);
        if (response.ok) {
          await cache.put(cacheKey, response.clone());
        } else {
          block.innerHTML = `<p>Error fetching weather data</p>`;
          return;
        }
      } catch (e) {
        block.innerHTML = `<p>Network error</p>`;
        return;
      }
    }
}