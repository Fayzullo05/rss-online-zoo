export class Slider {
  private track: HTMLElement;
  private prevButton: HTMLElement;
  private nextButton: HTMLElement;
  private isAnimating = false;
  private gap = 40;

  constructor(track: HTMLElement, prev: HTMLElement, next: HTMLElement) {
    this.track = track;
    this.prevButton = prev;
    this.nextButton = next;

    this.init();
  }

  private init(): void {
    this.nextButton.addEventListener('click', () => this.next());
    this.prevButton.addEventListener('click', () => this.prev());
  }

  private next(): void {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const first = this.track.firstElementChild as HTMLElement;
    const step = first.offsetWidth + this.gap;

    this.track.style.transition = 'transform 0.4s ease';
    this.track.style.transform = `translateX(-${step}px)`;

    setTimeout(() => {
      this.track.appendChild(first);
      this.track.style.transition = 'none';
      this.track.style.transform = 'translateX(0)';
      this.isAnimating = false;
    }, 400);
  }

  private prev(): void {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const last = this.track.lastElementChild as HTMLElement;
    const first = this.track.firstElementChild as HTMLElement;
    const step = first.offsetWidth + this.gap;

    this.track.insertBefore(last, first);

    this.track.style.transition = 'none';
    this.track.style.transform = `translateX(-${step}px)`;

    requestAnimationFrame(() => {
      this.track.style.transition = 'transform 0.4s ease';
      this.track.style.transform = 'translateX(0)';
    });

    setTimeout(() => {
      this.isAnimating = false;
    }, 400);
  }
}
