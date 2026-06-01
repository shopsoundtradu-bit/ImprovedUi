const NEXT = '../pages-6-7-8-chat/page-6-official-step-3-general-chat-page-highest-level-contains-projects-and-is-official-app-homepage.html';

// Auto-advance focus across OTP inputs.
const otpInputs = document.querySelectorAll('.otp-input');
otpInputs.forEach((inp, i) => {
  inp.addEventListener('input', () => {
    if (inp.value && i < otpInputs.length - 1) otpInputs[i + 1].focus();
  });
  inp.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && !inp.value && i > 0) otpInputs[i - 1].focus();
  });
});

document.querySelector('.btn-verify').addEventListener('click', () => {
  window.location.href = NEXT;
});