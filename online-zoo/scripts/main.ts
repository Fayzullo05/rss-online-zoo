import { getPets } from './services/pets.service';
import { renderPets } from './components/pets';

async function loadPets(): Promise<void> {
  const loader = document.getElementById('petsLoader');

  try {
    if (loader) loader.style.display = 'block';

    const pets = await getPets();

    renderPets(pets);

    if (loader) loader.style.display = 'none';
  } catch (error) {
    if (loader) {
      loader.innerText = 'Something went wrong. Update the page';
    }
  }
}

loadPets();
