const passInput = document.getElementById('passInput');
const submitBtn = document.getElementById('submitBtn');

const NEXT = '../pages-6-7-8-chat/page-6-official-step-3-general-chat-page-highest-level-contains-projects-and-is-official-app-homepage.html';

passInput.addEventListener('input', () => {
  if (passInput.value.length >= 1) {
    submitBtn.classList.add('active');
  } else {
    submitBtn.classList.remove('active');
  }
});

function go() {
  if (submitBtn.classList.contains('active')) window.location.href = NEXT;
}
submitBtn.addEventListener('click', go);
passInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); go(); } });