document.addEventListener('DOMContentLoaded', () => {
  // Select all <li> elements with a nested <ul>
  const dropdownItems = document.querySelectorAll('li > ul');

  dropdownItems.forEach(submenu => {
    const parent = submenu.parentElement;
    parent.classList.add('dropdown');

    // Add a toggle icon or just click on the parent text
    parent.addEventListener('click', () => {
      parent.classList.toggle('open');
    });
  });
});
