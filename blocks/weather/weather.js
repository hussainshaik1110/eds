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
  
    posts.slice(0, 5).forEach((post) => {
        const table = document.createElement('table');
        table.style.marginBottom = '1.5rem'; 
      
        const titleRow = document.createElement('tr');
        const titleCell = document.createElement('td');
        titleCell.colSpan = 2;
        titleCell.innerHTML = `<strong>Title - ${post.title}</strong>`;
        titleRow.appendChild(titleCell);
        table.appendChild(titleRow);
      
        const userRow = document.createElement('tr');
        userRow.innerHTML = `<td>UserId</td><td>${post.userId}</td>`;
        table.appendChild(userRow);
      
        const idRow = document.createElement('tr');
        idRow.innerHTML = `<td>Id</td><td>${post.id}</td>`;
        table.appendChild(idRow);
      
        const bodyRow = document.createElement('tr');
        bodyRow.innerHTML = `<td>Body</td><td>${post.body}</td>`;
        table.appendChild(bodyRow);
      
        block.appendChild(table);
      });
      
  }
  