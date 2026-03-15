let selectedAmount: number | null = null;
let selectedPet: string | null = null;

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
      selectedAmount = Number((btn as HTMLElement).dataset.value);
      updateNextButton();
    });
  });

  otherInput?.addEventListener('input', () => {
    const value = otherInput.value;

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
    <h2>MAKE YOUR DONATION</h2>

    <div class="amounts">
      <button class="donation-option" data-value="10">$10</button>
      <button class="donation-option" data-value="20">$20</button>
      <button class="donation-option" data-value="30">$30</button>
      <button class="donation-option" data-value="50">$50</button>
      <button class="donation-option" data-value="80">$80</button>
      <button class="donation-option" data-value="100">$100</button>
    </div>

    <input id="otherAmount" placeholder="Other amount">

    <select id="petSelect">
      <option value="">Choose your favourite</option>
      <option value="Panda">Panda</option>
      <option value="Tiger">Tiger</option>
      <option value="Lion">Lion</option>
    </select>

    <button id="step1Next" disabled>NEXT</button>
  `;

  initStep1Logic();
}

export function initDonationModal(): void {
  const modal = document.getElementById('donationModalMain');
  const close = document.getElementById('donationClose');

  if (!modal || !close) return;

  close.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.style.display = 'none';
  });
}
