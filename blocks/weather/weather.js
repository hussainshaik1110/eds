export default async function decorate(block) {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  
    const cache = await caches.open('posts-block-cache');
    const cacheKey = new Request(apiUrl);
  
    let response = await cache.match(cacheKey);
  
    if (!response) {
      try {
        response = await fetch(apiUrl);
        if (response.ok) {
          await cache.put(cacheKey, response.clone());
        } else {
          block.innerHTML = `<p>Error loading posts (status: ${response.status})</p>`;
          return;
        }
      } catch (e) {
        console.error('Fetch error:', e);
        block.innerHTML = `<p>Network error fetching posts</p>`;
        return;
      }
    }
  
    const posts = await response.json();
  
    const list = document.createElement('ul');
    posts.slice(0, 5).forEach((post) => {
      const item = document.createElement('li');
      item.innerHTML = `<strong>${post.title}</strong><br><strong>UserId</strong>-${post.userId}<br><strong>Id</strong>-${post.id}<br><strong>Body</strong>-${post.body}`;
      list.appendChild(item);
    });
  
    block.innerHTML = `<h3>Latest Posts</h3>`;
    block.appendChild(list);
  }
  