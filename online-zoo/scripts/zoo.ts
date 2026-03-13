import { getCameras } from './services/camera.service';
import { renderSidebar } from './components/sidebar';
import { initSidebarToggle } from './components/sidebarToggle';
import { renderZooInfo } from './components/zoo-info';
import { getPetById } from './services/pets.service';

async function loadZoo(): Promise<void> {
  const loader = document.getElementById('zooLoader');

  try {
    if (loader) loader.style.display = 'block';

    const cameras = await getCameras();

    renderSidebar(cameras);

    const menu = document.getElementById('sideMenu');
    if (!menu) return;

    menu.addEventListener('click', (event) => {
      const item = (event.target as HTMLElement).closest('.animal-item') as HTMLElement | null;
      if (!item) return;

      const petId = Number(item.dataset.pet);
      loadPetInfo(petId);
    });

    if (loader) loader.style.display = 'none';
  } catch {
    if (loader) {
      loader.innerText = 'Failed to load animals';
    }
  }
}

async function loadPetInfo(petId: number): Promise<void> {
  const loader = document.getElementById('animalLoader');

  try {
    if (loader) loader.style.display = 'flex';

    const pet = await getPetById(petId);

    renderZooInfo(pet);

    if (loader) loader.style.display = 'none';
  } catch {
    if (loader) {
      loader.textContent = 'Something went wrong. Please, refresh the page';
    }
  }
}

loadZoo();
initSidebarToggle();
loadPetInfo(1);
