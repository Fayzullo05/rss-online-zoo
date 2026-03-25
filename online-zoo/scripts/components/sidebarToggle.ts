export function initSidebarToggle(): void {
  const sidebar = document.getElementById('sidebar');
  const button = document.getElementById('toggleButton');

  if (!sidebar || !button) return;

  button.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });
}
