import type { Camera } from '../types/camera.interface';

const iconMap: Record<string, string> = {
  1: 'Panda.svg',
  2: 'Eagle.svg',
  3: 'Gorilla.svg',
  4: 'Lemur.svg',
};

export function renderSidebar(cameras: Camera[]): void {
  const menu = document.getElementById('sideMenu');

  if (!menu) return;

  menu.innerHTML = '';

  cameras.slice(0, 4).forEach((camera) => {
    const item = document.createElement('li');
    item.className = 'animal-item';

    const icon = iconMap[camera.petId] ?? 'Panda.svg';

    item.innerHTML = `
      <div class="icon-wrapper-outer">
        <div class="icon-wrapper">
          <img src="../../assets/animal/${icon}" alt="${camera.text}">
        </div>
      </div>

      <span class="animal-text">
        ${camera.text}
      </span>
    `;

    menu.appendChild(item);
  });
}
