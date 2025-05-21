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

  document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.default-content-wrapper');

  // Create hamburger
  const hamburger = document.createElement('div');
  hamburger.className = 'hamburger';
  hamburger.innerHTML = '<span></span><span></span><span></span>';
  wrapper.prepend(hamburger);

  // Toggle menu
  hamburger.addEventListener('click', () => {
    wrapper.classList.toggle('open');
  });

  // Dropdown logic
  const dropdownParents = wrapper.querySelectorAll('li:has(ul)');

  dropdownParents.forEach((parent) => {
    parent.classList.add('nav-drop');

    parent.addEventListener('click', (e) => {
      e.stopPropagation();

      // Close all other dropdowns
      dropdownParents.forEach((el) => {
        if (el !== parent) el.classList.remove('open');
      });

      // Toggle current
      parent.classList.toggle('open');
    });
  });
});


 
}
