const messageForm = document.querySelector('#contact-form');
const sendButton = document.querySelector('#send-message');
const formStatus = document.querySelector('#form-status');
let deliveryEnabled = false;

try {
  const endpoint = new URL(messageForm.getAttribute('action'));
  if (endpoint.protocol !== 'https:' || endpoint.username || endpoint.password) {
    throw new Error('Use a public HTTPS form endpoint');
  }
  messageForm.action = endpoint.href;
  deliveryEnabled = true;
  sendButton.disabled = false;
} catch {
  sendButton.disabled = true;
  formStatus.textContent = 'The message service is temporarily unavailable. Please connect on LinkedIn instead.';
}

messageForm.addEventListener('submit', (event) => {
  if (!deliveryEnabled) {
    event.preventDefault();
    formStatus.textContent = 'The message service is temporarily unavailable. Please connect on LinkedIn instead.';
    return;
  }
  messageForm.querySelectorAll('input, textarea').forEach((field) => {
    field.value = field.value.trim();
  });
  if (!messageForm.reportValidity()) event.preventDefault();
});

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
