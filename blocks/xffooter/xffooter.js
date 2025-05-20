export default function decorate(block) {
  const wrapper = block.closest('.section').querySelector('.default-content-wrapper');
  if (!wrapper) return;

  // Find all parent <li> elements that contain a nested <ul>
  const dropdownParents = wrapper.querySelectorAll('li:has(ul)');

  dropdownParents.forEach((parent) => {
    parent.classList.add('dropdown');

    // Optional: create a toggle icon or add indicator
    const toggle = document.createElement('span');
    toggle.className = 'dropdown-toggle';
    toggle.innerHTML = '▼'; // Simple arrow icon
    parent.prepend(toggle);

    // Hide nested menu by default
    parent.querySelector('ul').classList.add('dropdown-menu');

    // Toggle on click
    toggle.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent bubbling
      parent.classList.toggle('open');
    });
  });
}
