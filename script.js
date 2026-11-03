const profileUrl = 'https://www.linkedin.com/in/tushargoyal1410';
const copyButton = document.querySelector('#copy-profile');
const copyStatus = document.querySelector('#copy-status');

copyButton.addEventListener('click', async () => {
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(profileUrl);
    copyStatus.textContent = 'Profile link copied. Ready to share!';
  } catch {
    copyStatus.textContent = 'Select and copy this link: ' + profileUrl;
    const selection = window.getSelection();
    if (selection) {
      const range = document.createRange();
      range.selectNodeContents(copyStatus);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
});

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.about, .section-heading, .benefit, .steps article, .faq, .contact').forEach((element) => {
    element.classList.add('reveal');
    observer.observe(element);
  });
}
