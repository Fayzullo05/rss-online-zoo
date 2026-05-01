let observer: IntersectionObserver | null = null;

export function initLazyImages() {
  const images = document.querySelectorAll<HTMLImageElement>('img[data-src]');

  if (!('IntersectionObserver' in window)) {
    images.forEach((img) => {
      img.src = img.dataset.src!;
    });
    return;
  }

  if (!observer) {
    observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const img = entry.target as HTMLImageElement;

        if (!img.dataset.src) return;

        img.src = img.dataset.src;
        img.removeAttribute('data-src');

        obs.unobserve(img);
      });
    });
  }

  images.forEach((img) => observer!.observe(img));
}
