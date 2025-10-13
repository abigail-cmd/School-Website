
// handles animations, back-to-top, localStorage form saving and UX polish

// Back to top
const back = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 250) back.style.display = 'block';
  else back.style.display = 'none';
});
back?.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

// Helper: show toast (simple)
function showToast(message, timeout=2200){
  const t = document.createElement('div');
  t.className = 'toastify';
  t.textContent = message;
  Object.assign(t.style, {position:'fixed', right:'20px', bottom:'90px', background:'#111827', color:'#fff', padding:'10px 14px', borderRadius:'8px', zIndex:99999, opacity:0, transition:'opacity .2s ease'});
  document.body.appendChild(t);
  requestAnimationFrame(()=> t.style.opacity = '1');
  setTimeout(()=> { t.style.opacity = '0'; setTimeout(()=> t.remove(),300)}, timeout);
}
