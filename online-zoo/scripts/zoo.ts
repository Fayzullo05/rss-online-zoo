import { getCameras } from './services/camera.service';
import { renderSidebar } from './components/sidebar';
import { initSidebarToggle } from './components/sidebarToggle';

async function loadZoo(): Promise<void> {
  const loader = document.getElementById('zooLoader');

  try {
    if (loader) loader.style.display = 'block';

    const cameras = await getCameras();
    console.log(cameras);
    renderSidebar(cameras);

    if (loader) loader.style.display = 'none';
  } catch {
    if (loader) {
      loader.innerText = 'Failed to load animals';
    }
  }
}

loadZoo();
initSidebarToggle();
