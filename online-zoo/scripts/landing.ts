import { getPets } from './services/pets.service';
import { renderPets } from './components/pets';
import { Slider } from './components/slider';
import { getFeedback } from './services/feedback.service';
import { renderFeedback } from './components/feedback';

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
      new Slider(track, prevButton, nextButton, 1);
    }

    if (loader) loader.style.display = 'none';
  } catch (error) {
    if (loader) {
      loader.innerText = `Something went wrong. Update the page. Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  }
}

async function loadFeedback(): Promise<void> {
  const loader = document.getElementById('feedbackLoader');
  const track = document.getElementById('feedbackCards');

  try {
    if (loader) loader.style.display = 'block';

    const feedback = await getFeedback();

    renderFeedback(feedback);

    const prev = document.getElementById('feedbackLeftArrow');
    const next = document.getElementById('feedbackRightArrow');

    if (prev && next && track) {
      new Slider(track, prev, next, 2, 30);
    }

    if (loader) loader.style.display = 'none';
  } catch (error) {
    if (loader) {
      loader.innerText = `Something went wrong. Update the page. Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  }
}

loadPets();
loadFeedback();
