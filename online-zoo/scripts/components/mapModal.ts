import * as L from 'leaflet';
let map: L.Map | null = null;

export function openMap(lat: string, lng: string): void {
  const modal = document.getElementById('mapModal');
  const mapContainer = document.getElementById('map');

  if (!modal || !mapContainer) return;

  modal.style.display = 'flex';

  if (map) {
    map.remove();
  }

  map = L.map('map').setView([parseFloat(lat), parseFloat(lng)], 6);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap',
  }).addTo(map);

  L.marker([parseFloat(lat), parseFloat(lng)]).addTo(map);
}

export function initMapModal(): void {
  const modal = document.getElementById('mapModal');
  const close = document.getElementById('mapClose');

  if (!modal || !close) return;

  close.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modal.style.display = 'none';
    }
  });
}
