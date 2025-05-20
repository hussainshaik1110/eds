import { getMetadata } from '../../scripts/aem.js';
console.log("My script loaded1 ✅");

document.addEventListener('DOMContentLoaded', () => {
  // Select all <li> elements with a nested <ul>
  const dropdownItems = document.querySelectorAll('li > ul');
console.log("My script loaded2 ✅");

  dropdownItems.forEach(submenu => {
    const parent = submenu.parentElement;
    parent.classList.add('dropdown');
console.log("My script loaded3 ✅");

    // Add a toggle icon or just click on the parent text
    parent.addEventListener('click', () => {
      parent.classList.toggle('open');
      console.log("My script loaded4 ✅");
    });
  });
});
