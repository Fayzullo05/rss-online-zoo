import { getPets } from './services/pets.service';
import { renderPets } from './components/pets';
import { Slider } from './components/slider';

async function loadPets(): Promise<void> {
  const loader = document.getElementById('petsLoader');

  try {
    if (loader) loader.style.display = 'block';

    const pets = await getPets();

    renderPets(pets);

    const prevButton = document.getElementById('leftArrow');
    const nextButton = document.getElementById('rightArrow');
    const track = document.querySelector('.pets-grid');

    if (prevButton && nextButton && track instanceof HTMLElement) {
      new Slider(track, prevButton, nextButton);
    }

    if (loader) loader.style.display = 'none';
  } catch (error) {
    if (loader) {
      loader.innerText = 'Something went wrong. Update the page';
    }
  }
}

loadPets();
