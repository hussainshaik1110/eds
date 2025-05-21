import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
  const metaPath = getMetadata('nav');
  if (!metaPath) return;

  // Load fragment content
  const fragment = await loadFragment(metaPath);
  if (!fragment) return;

  // Append fragment content into the block
  while (fragment.firstElementChild) {
    block.append(fragment.firstElementChild);
  }

  // Wait for content to be in DOM before selecting
  const wrapper = block.querySelector('.default-content-wrapper') || block;
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
