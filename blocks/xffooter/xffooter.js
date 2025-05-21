export default function decorate(block) {
  const wrapper = block.closest('.section').querySelector('.default-content-wrapper');
  if (!wrapper) return;

  // Select all <li> that have a nested <ul>
  const dropdownParents = wrapper.querySelectorAll('li:has(ul)');

  dropdownParents.forEach((parent) => {
    parent.classList.add('dropdown');
    const submenu = parent.querySelector('ul');
    submenu.classList.add('dropdown-menu');

    parent.addEventListener('click', (e) => {
      // Prevent click bubbling from affecting nested items
      e.stopPropagation();

      // Close all other dropdowns
      dropdownParents.forEach((other) => {
        if (other !== parent) {
          other.classList.remove('open');
        }
      });

      // Toggle this one
      parent.classList.toggle('open');
    });
  });

  // Close all when clicking outside
  document.addEventListener('click', () => {
    dropdownParents.forEach((parent) => parent.classList.remove('open'));
  });

  const hamburger = document.createElement('div');
  hamburger.className = 'hamburger';
  hamburger.innerHTML = '<span></span><span></span><span></span>';
  block.prepend(hamburger);

  hamburger.addEventListener('click', () => {
    wrapper.classList.toggle('open');
  });
}
}
