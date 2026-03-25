const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleButton');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
  sidebar.classList.toggle('expanded');
});
