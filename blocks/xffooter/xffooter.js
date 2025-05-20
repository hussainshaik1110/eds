export default function decorate(block) {
  const wrapper = block.closest('.section').querySelector('.default-content-wrapper');
  if (!wrapper) return;

  // Select all <li> that have a nested <ul>
  const dropdownParents = wrapper.querySelectorAll('li:has(ul)');

  dropdownParents.forEach((parent) => {
    parent.classList.add('dropdown');

    const submenu = parent.querySelector('ul');
    submenu.classList.add('dropdown-menu');

    // Click to toggle dropdown
    parent.addEventListener('click', (e) => {
      // Prevent nested <ul> clicks from closing
      if (e.target.closest('ul') !== submenu) {
        e.stopPropagation();
        parent.classList.toggle('open');
      }
    });
  });

  // Optional: close dropdown when clicking outside
  document.addEventListener('click', () => {
    dropdownParents.forEach((parent) => parent.classList.remove('open'));
  });
}
