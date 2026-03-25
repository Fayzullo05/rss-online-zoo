import { getPets } from '../services/pets.service';
import { getUser } from '../utils/auth';

let selectedAmount: number | null = null;
let selectedPet: string | null = null;

function validateName(name: string): boolean {
  return /^[A-Za-z\s]+$/.test(name);
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

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
      buttons.forEach((b) => b.classList.remove('active'));

      btn.classList.add('active');

      selectedAmount = Number((btn as HTMLElement).dataset.value);

      updateNextButton();
    });
  });

  otherInput?.addEventListener('input', () => {
    const value = otherInput.value;

    buttons.forEach((b) => b.classList.remove('active'));

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

  const next = document.getElementById('step1Next');

  next?.addEventListener('click', () => {
    showStep(2);
    renderStep2();
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
      <div class="donation-steps">
        <span class="dot active"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
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

function renderStep2(): void {
  const step2 = document.getElementById('donationStep2');
  if (!step2) return;

  const user = getUser();

  step2.innerHTML = `
    <div class="donation-step">

      <p class="donation-info">Billing Information:</p>

      <label class="donation-field">
        <span>* Your Name</span>
        <input
          id="donorName"
          type="text"
          placeholder="First and last name"
          value="${user?.name ?? ''}"
        >
      </label>

      <label class="donation-field">
        <span>* Your Email Address</span>
        <input
          id="donorEmail"
          type="email"
          placeholder="Enter your email"
          value="${user?.email ?? ''}"
        >
      </label>

      <p class="donation-note">
        You will receive emails from the Online Zoo, including updates and news
        on the latest discoveries and translations. You can unsubscribe at any time.
      </p>

      <div class="donation-footer">

        <div class="donation-steps">
          <span class="dot active"></span>
          <span class="dot active"></span>
          <span class="dot"></span>
        </div>

        <button id="step2Back" class="back-btn">Back</button>

        <button id="step2Next" disabled>
          NEXT →
        </button>

      </div>

    </div>
  `;

  initStep2Logic();
}

function initStep2Logic(): void {
  const nameInput = document.getElementById('donorName') as HTMLInputElement;
  const emailInput = document.getElementById('donorEmail') as HTMLInputElement;
  const next = document.getElementById('step2Next') as HTMLButtonElement;
  const back = document.getElementById('step2Back');

  function updateButton() {
    const valid = validateName(nameInput.value) && validateEmail(emailInput.value);

    next.disabled = !valid;
  }

  nameInput.addEventListener('input', updateButton);
  emailInput.addEventListener('input', updateButton);

  back?.addEventListener('click', () => {
    showStep(1);
  });

  next.addEventListener('click', () => {
    showStep(3);
    renderStep3();
  });

  updateButton();
}

function renderStep3(): void {
  const step3 = document.getElementById('donationStep3');
  if (!step3) return;

  const user = getUser();
  const savedCards = getSavedCards();

  step3.innerHTML = `
    <div class="donation-step">

      <p class="donation-info">Payment Information:</p>
      ${
        savedCards.length
          ? `
        <label class="donation-field">
          <span>Saved cards</span>
          <select id="savedCards">
            <option value="">Select saved card</option>
            ${savedCards
              .map(
                (c: { number: string; cvv: string; exp: string }, i: number) => `
              <option value="${i}">
                ${c.number.slice(0, 4)} **** **** ${c.number.slice(-4)}
              </option>
            `
              )
              .join('')}
          </select>
        </label>
      `
          : ''
      }

      <div class="card-row">
        <label class="donation-field">
          <span>* Credit Card Number</span>
          <input id="cardNumber" type="text" placeholder="1234 5678 9012 3456" maxlength="19">
        </label>

        <label class="donation-field">
          <span>* CVV Number</span>
          <input id="cvv" type="text" maxlength="3">
        </label>
      </div>

      <label class="donation-field">
        <span>* Expiration Date</span>
        <input id="expDate" type="text" placeholder="MM/YY" maxlength="5">
      </label>

      ${
        user
          ? `<label class="donation-checkbox">
              <input type="checkbox" id="saveCard">
              Save card info for future donations
            </label>`
          : ''
      }

      <div class="donation-footer">

        <div class="donation-steps">
          <span class="dot active"></span>
          <span class="dot active"></span>
          <span class="dot active"></span>
        </div>

        <button id="step3Back" class="back-btn">Back</button>

        <button id="completeDonation" disabled>
          COMPLETE DONATION →
        </button>

      </div>

    </div>
  `;

  initStep3Logic();
}

function initStep3Logic(): void {
  const cardInput = document.getElementById('cardNumber') as HTMLInputElement;
  const cvvInput = document.getElementById('cvv') as HTMLInputElement;
  const expInput = document.getElementById('expDate') as HTMLInputElement;
  const submit = document.getElementById('completeDonation') as HTMLButtonElement;
  const back = document.getElementById('step3Back');

  const savedCards = getSavedCards();
  const savedSelect = document.getElementById('savedCards') as HTMLSelectElement;

  savedSelect?.addEventListener('change', () => {
    const card = savedCards[savedSelect.value];

    if (!card) return;

    cardInput.value = card.number;
    cvvInput.value = card.cvv;
    expInput.value = card.exp;

    validate();
  });

  cardInput.addEventListener('input', () => {
    let value = cardInput.value.replace(/\D/g, '');
    value = value.slice(0, 16);
    value = value.replace(/(.{4})/g, '$1 ').trim();
    cardInput.value = value;

    validate();
  });

  cvvInput.addEventListener('input', () => {
    cvvInput.value = cvvInput.value.replace(/\D/g, '').slice(0, 3);
    validate();
  });

  expInput.addEventListener('input', () => {
    let value = expInput.value.replace(/\D/g, '');

    if (value.length >= 3) {
      value = value.slice(0, 4);
      value = value.replace(/(\d{2})(\d{1,2})/, '$1/$2');
    }

    expInput.value = value;

    validate();
  });

  function validateExpiry(value: string): boolean {
    if (!/^\d{2}\/\d{2}$/.test(value)) return false;

    const [month, year] = value.split('/').map(Number);

    if (month < 1 || month > 12) return false;

    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    return year > currentYear || (year === currentYear && month >= currentMonth);
  }

  function validate() {
    const cardValid = /^\d{16}$/.test(cardInput.value.replace(/\s/g, ''));
    const cvvValid = /^\d{3}$/.test(cvvInput.value);
    const expValid = validateExpiry(expInput.value);

    submit.disabled = !(cardValid && cvvValid && expValid);
  }

  back?.addEventListener('click', () => {
    showStep(2);
  });

  validate();

  submit.addEventListener('click', async () => {
    try {
      const user = getUser();
      const saveCheckbox = document.querySelector('#saveCard') as HTMLInputElement;

      const name = user?.name || 'Anonymous';
      const email = user?.email || 'test@mail.com';

      const response = await fetch(
        'https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/donations',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            amount: selectedAmount,
            petId: 1,
          }),
        }
      );

      if (saveCheckbox?.checked) {
        saveCard({
          number: cardInput.value,
          cvv: cvvInput.value,
          exp: expInput.value,
        });
      }

      if (!response.ok) throw new Error();

      showNotification(
        `Thank you for your donation of $${selectedAmount} to ${selectedPet}!`,
        'success'
      );
    } catch {
      showNotification('Something went wrong. Please, try again later.', 'error');
    }
  });
}

function showNotification(message: string, type: 'success' | 'error'): void {
  const div = document.createElement('div');
  div.className = `donation-notification ${type}`;
  div.textContent = message;

  document.body.appendChild(div);

  setTimeout(() => div.remove(), 4000);
}

function getSavedCards() {
  const user = getUser();
  if (!user) return [];

  return JSON.parse(localStorage.getItem(`cards_${user.email}`) || '[]');
}

function saveCard(card: { number: string; cvv: string; exp: string }) {
  const user = getUser();
  if (!user) return;

  const key = `cards_${user.email}`;
  const existing = getSavedCards();

  existing.push(card);

  localStorage.setItem(key, JSON.stringify(existing));
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
