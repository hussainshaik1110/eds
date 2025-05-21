import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

export default function decorate(block) {
  // Use block directly instead of .default-content-wrapper
  const wrapper = block;
  if (!wrapper) return;

  // ===== DROPDOWN MENU =====
  const dropdownParents = wrapper.querySelectorAll('li:has(ul)');
  dropdownParents.forEach((parent) => {
    parent.classList.add('dropdown');
    const submenu = parent.querySelector('ul');
    submenu.classList.add('dropdown-menu');

    parent.addEventListener('click', (e) => {
      e.stopPropagation();
      // Close all other dropdowns
      dropdownParents.forEach((other) => {
        if (other !== parent) {
          other.classList.remove('open');
        }
      });
      parent.classList.toggle('open');
    });
  });

  // Close all dropdowns when clicking outside
  document.addEventListener('click', () => {
    dropdownParents.forEach((parent) => parent.classList.remove('open'));
  });

  // ===== HAMBURGER MENU =====
  const hamburger = document.createElement('div');
  hamburger.className = 'hamburger';
  hamburger.innerHTML = '<span></span><span></span><span></span>';
  wrapper.prepend(hamburger);

  hamburger.addEventListener('click', () => {
    wrapper.classList.toggle('open');
  });
}
