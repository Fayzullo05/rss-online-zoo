import type { Feedback } from '../types/feedback.interface';

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
