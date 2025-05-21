import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

export default function decorate(block) {
  const wrapper = block.closest('.section').querySelector('.default-content-wrapper');
  if (!wrapper) return;

  const dropdownParents = wrapper.querySelectorAll('li:has(ul)');

  dropdownParents.forEach((parent) => {
    parent.classList.add('dropdown');
    const submenu = parent.querySelector('ul');
    submenu.classList.add('dropdown-menu');

    parent.addEventListener('click', (e) => {
      e.stopPropagation();

      // Close all others
      dropdownParents.forEach((other) => {
        if (other !== parent) {
          other.classList.remove('open');
        }
      });

      parent.classList.toggle('open');
    });
  });

  document.addEventListener('click', () => {
    dropdownParents.forEach((parent) => parent.classList.remove('open'));
  });

  // Hamburger logic
  const hamburger = document.createElement('div');
  hamburger.classList.add('hamburger');
  hamburger.innerHTML = `<span></span><span></span><span></span>`;

  wrapper.insertBefore(hamburger, wrapper.firstChild);

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    wrapper.classList.toggle('open');
  });

  // Close hamburger nav when clicking outside
  document.addEventListener('click', () => {
    wrapper.classList.remove('open');
  });
}
