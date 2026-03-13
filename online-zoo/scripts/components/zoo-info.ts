import type { PetDetails } from '../types/pet-details.interface';

export function renderZooInfo(pet: PetDetails): void {
  const container = document.getElementById('animalInfo');
  if (!container) return;

  container.innerHTML = `
      <div class="info-card">
        <h2>Did you know?</h2>
        <p>${pet.description}</p>
      </div>

      <div class="info-main">

        <div class="info-details">
          <ul>
            <li><strong>Common name:</strong> ${pet.commonName}</li>
            <li><strong>Scientific name:</strong> ${pet.scientificName}</li>
            <li><strong>Type:</strong> ${pet.type}</li>
            <li><strong>Size:</strong> ${pet.size}</li>
            <li><strong>Diet:</strong> ${pet.diet}</li>
            <li><strong>Habitat:</strong> ${pet.habitat}</li>

            <li>
              <strong>Range:</strong> ${pet.range}
              <button class="view-map">
                View Map
                <img src="../../assets/animal/arrow orange.svg" alt="Arrow" class="info-arrow-default">
              </button>
            </li>
          </ul>
        </div>

        <div class="info-image">
          <img src="../../assets/animal/info-${pet.id}.svg" alt="${pet.commonName}">
        </div>

      </div>

      <div class="info-description">
        <p>${pet.detailedDescription}</p>
      </div>
  `;
}
