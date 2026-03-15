import { getPets } from '../services/pets.service';

let selectedAmount: number | null = null;
let selectedPet: string | null = null;
let donorName = '';
let donorEmail = '';

function showStep(step: 1 | 2 | 3): void {
  const s1 = document.getElementById('donationStep1');
  const s2 = document.getElementById('donationStep2');
  const s3 = document.getElementById('donationStep3');

  if (!s1 || !s2 || !s3) return;

  s1.style.display = step === 1 ? 'block' : 'none';
  s2.style.display = step === 2 ? 'block' : 'none';
  s3.style.display = step === 3 ? 'block' : 'none';
}

function updateNextButton(): void {
  const next = document.getElementById('step1Next') as HTMLButtonElement;
  if (!next) return;

  next.disabled = !(selectedAmount && selectedPet);
}

function initStep1Logic(): void {
  const buttons = document.querySelectorAll('.donation-option');
  const otherInput = document.getElementById('otherAmount') as HTMLInputElement;
  const petSelect = document.getElementById('petSelect') as HTMLSelectElement;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {

      buttons.forEach(b => b.classList.remove('active'));

      btn.classList.add('active');

      selectedAmount = Number((btn as HTMLElement).dataset.value);

      updateNextButton();
    });
  });

  otherInput?.addEventListener('input', () => {
    const value = otherInput.value;

    buttons.forEach(b => b.classList.remove('active'));

    if (/^[0-9]+$/.test(value) && Number(value) > 0) {
      selectedAmount = Number(value);
    } else {
      selectedAmount = null;
    }

    updateNextButton();
  });

  petSelect?.addEventListener('change', () => {
    selectedPet = petSelect.value || null;
    updateNextButton();
  });
}

function renderStep1(): void {
  const step1 = document.getElementById('donationStep1');
  if (!step1) return;

  step1.innerHTML = `
    <p class="donation-info">Donation Information:</p>

    <p class="donation-label">* Choose your donation amount:</p>

    <div class="amounts">
      <button class="donation-option" data-value="10">$10</button>
      <button class="donation-option" data-value="20">$20</button>
      <button class="donation-option" data-value="30">$30</button>
      <button class="donation-option" data-value="50">$50</button>
      <button class="donation-option" data-value="80">$80</button>
      <button class="donation-option" data-value="100">$100</button>
    </div>

    <div class="donation-row">
      <button class="secondary-btn">OTHER AMOUNT</button>
      <input id="otherAmount" type="text">
    </div>

    <div class="donation-row">
      <button class="secondary-btn">FOR SPECIAL PET</button>
      <select id="petSelect">
        <option value="" disabled selected>Choose your favourite</option>
      </select>
    </div>

    <label class="donation-checkbox">
      <input type="checkbox">
      Make this a monthly recurring gift
    </label>

    <div class="donation-footer">
      <button id="step1Next" disabled>NEXT →</button>
    </div>
  `;

    const petSelect = document.getElementById('petSelect');

    getPets().then((pets) => {
      if (!petSelect) return;

      pets.forEach((pet) => {
        const option = document.createElement('option');
        option.value = pet.name;
        option.textContent = pet.name;
        petSelect.appendChild(option);
      });
    });

  initStep1Logic();
}

export function initDonationModal(): void {
  const modal = document.getElementById('donationModalMain');
  const close = document.getElementById('donationClose');
  const open = document.getElementById('openDonationModal');

  if (!modal || !close || !open) return;

  open.addEventListener('click', () => {
    modal.style.display = 'flex';
    renderStep1();
    showStep(1);
  });

  close.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.style.display = 'none';
  });
}
