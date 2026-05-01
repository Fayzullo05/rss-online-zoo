import type { Feedback } from '../types/feedback.interface';

export function renderFeedbackSkeleton(): void {
  const container = document.getElementById('feedbackCards');
  if (!container) return;

  container.innerHTML = '';

  for (let i = 0; i < 3; i++) {
    const card = document.createElement('div');
    card.className = 'feedback-card';

    card.innerHTML = `
      <div class="skeleton" style="height: 20px; width: 50%; margin-bottom: 10px;"></div>
      <div class="skeleton" style="height: 14px; width: 100%; margin-bottom: 6px;"></div>
      <div class="skeleton" style="height: 14px; width: 90%;"></div>
    `;

    container.appendChild(card);
  }
}

export function renderFeedback(feedback: Feedback[]): void {
  const container = document.getElementById('feedbackCards');

  if (!container) return;

  container.innerHTML = '';

  feedback.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'feedback-card';

    card.innerHTML = `
      <div class="feedback-quote">“</div>
      <h3>${item.city}, ${item.month} ${item.year}</h3>
      <p>${item.text}</p>
      <h4>${item.name}</h4>
    `;

    container.appendChild(card);
  });
}
