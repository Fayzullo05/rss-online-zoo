import type { Pet } from '../types/pets.interface';

const petImages: Record<string, string> = {
  'Giant Panda': 'panda.svg',
  'Madagascarian Lemur': 'lemur.svg',
  'Gorilla in Congo': 'gorilla.svg',
  'Chinese Alligator': 'alligator.svg',
  'West End Bald Eagles': 'eagle.svg',
  'Australian Koala': 'koala.svg',
  'African Lion': 'lion.svg',
  'Sumatran Tiger': 'tiger.svg',
};

export function renderPets(pets: Pet[]): void {
  const grid = document.getElementById('petsGrid');

  if (!grid) return;

  grid.innerHTML = '';

  pets.slice(0, 8).forEach((pet) => {
    const image = petImages[pet.commonName] ?? 'panda.svg';

    const card = document.createElement('div');
    card.className = 'pet-card';

    card.innerHTML = `
      <div class="pet-image">
        <img src="../../assets/landing/${image}" alt="${pet.commonName}">
        <span class="pet-name">${pet.name}</span>
      </div>

      <div class="pet-content">
        <h3>${pet.commonName}</h3>
        <p>${pet.description ?? ''}</p>
        <button class="pet-link">
          View live cam
          <span class="pet-arrow"></span>
        </button>
      </div>
    `;

    grid.appendChild(card);
  });
}
