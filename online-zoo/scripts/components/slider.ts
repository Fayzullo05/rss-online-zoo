export class Slider {
  private track: HTMLElement;
  private prevButton: HTMLElement;
  private nextButton: HTMLElement;
  private isAnimating = false;
  private gap: number;
  private itemsPerStep: number;

  constructor(
    track: HTMLElement,
    prev: HTMLElement,
    next: HTMLElement,
    itemsPerStep = 1,
    gap = 40
  ) {
    this.track = track;
    this.prevButton = prev;
    this.nextButton = next;
    this.itemsPerStep = itemsPerStep;
    this.gap = gap;

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
      for (let i = 0; i < this.itemsPerStep; i++) {
        const el = this.track.firstElementChild;
        if (el) this.track.appendChild(el);
      }

      this.track.style.transition = 'none';
      this.track.style.transform = 'translateX(0)';
      this.isAnimating = false;
    }, 400);
  }

  private prev(): void {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const first = this.track.firstElementChild as HTMLElement;
    const step = first.offsetWidth + this.gap;

    for (let i = 0; i < this.itemsPerStep; i++) {
      const last = this.track.lastElementChild;
      if (last) this.track.insertBefore(last, this.track.firstElementChild);
    }

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
