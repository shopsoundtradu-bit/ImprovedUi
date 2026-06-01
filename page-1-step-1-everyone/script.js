// ── Test-wiring (no real auth) ──────────────────────────────────────────────
// Paths are relative to this folder (page-1-step-1-everyone/).
const ROUTES = {
  googleApple: '../page-3-step-2-new-users-via-google-apple/page-3-step-2-new-users-via-google-apple.html',
  emailRegister: '../page-4-step-2-new-users-via-email-and-password/page-4-step-2-new-users-via-email-and-password.html',
  emailLogin: '../page-2-step-2-returning-registered-users-via-email-password/page-2-step-2-returning-registered-users-via-email-password.html',
  emailOtp: '../page-5-step-2or3-new-users-and-2fa-enabled-users-via-email-and-password-or-email-only-login/page-5-step-2or3-new-users-and-2fa-enabled-users-via-email-and-password-or-email-only-login.html',
};

const input = document.getElementById('userInput');
const button = document.getElementById('nextBtn');

input.addEventListener('input', () => {
  button.className = input.value.trim().length > 0 ? 'btn-continue active' : 'btn-continue';
});

function routeForEmail(value) {
  const v = value.trim();
  if (v === '1111') return ROUTES.emailRegister;
  if (v === '2222') return ROUTES.emailLogin;
  if (v === '3333') return ROUTES.emailOtp;
  // Default: treat unknown input as new-user registration so the tester can still proceed.
  return ROUTES.emailRegister;
}

button.addEventListener('click', () => {
  if (!button.classList.contains('active')) return;
  window.location.href = routeForEmail(input.value);
});

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && button.classList.contains('active')) {
    e.preventDefault();
    window.location.href = routeForEmail(input.value);
  }
});

// Social buttons → registration screen for new Google/Apple users.
document.querySelectorAll('.btn-social').forEach((btn) => {
  btn.addEventListener('click', () => {
    window.location.href = ROUTES.googleApple;
  });
});