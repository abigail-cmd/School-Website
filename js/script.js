
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


/* ---------- Contact form (contact.html) ---------- */
(function contactModule(){
  const form = document.getElementById('contactForm');
  if (!form) return;
  const cname = document.getElementById('cname');
  const cemail = document.getElementById('cemail');
  const csubject = document.getElementById('csubject');
  const cmessage = document.getElementById('cmessage');
  const resetBtn = document.getElementById('contactReset');

  // load existing
  const stored = localStorage.getItem('bf_contact');
  if (stored){
    try {
      const o = JSON.parse(stored);
      cname.value = o.name || '';
      cemail.value = o.email || '';
      csubject.value = o.subject || 'General enquiry';
      cmessage.value = o.message || '';
    } catch(e){}
  }

  form.addEventListener('submit', (ev)=>{
    ev.preventDefault();
    const data = { name:cname.value.trim(), email:cemail.value.trim(), subject:csubject.value, message:cmessage.value.trim(), time: new Date().toISOString() };
    localStorage.setItem('bf_contact', JSON.stringify(data));
    showToast('Contact saved locally. We will get back to you!');
    form.reset();
  });

  resetBtn.addEventListener('click', ()=> { form.reset(); localStorage.removeItem('bf_contact'); showToast('Contact form cleared'); });
})();

/* ---------- Registration form (register.html) ---------- */
(function regModule(){
  const form = document.getElementById('registerForm');
  if (!form) return;
  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const dob = document.getElementById('dob');
  const gender = document.getElementById('gender');
  const guardian = document.getElementById('guardian');
  const classFor = document.getElementById('classFor');
  const notes = document.getElementById('notes');
  const resetBtn = document.getElementById('regReset');

  // load cached applications array
  const applications = JSON.parse(localStorage.getItem('bf_applications') || '[]');

  form.addEventListener('submit', (ev)=> {
    ev.preventDefault();
    const app = {
      id: 'app_' + Date.now(),
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      dob: dob.value,
      gender: gender.value,
      guardian: guardian.value.trim(),
      classFor: classFor.value,
      notes: notes.value.trim(),
      submittedAt: new Date().toISOString()
    };
    applications.push(app);
    localStorage.setItem('bf_applications', JSON.stringify(applications));
    showToast('Application saved locally. Thank you!');
    form.reset();
  });

  resetBtn?.addEventListener('click', ()=> { form.reset(); showToast('Form cleared'); });
})();

/* ---------- Small UX niceties ---------- */
// Smooth internal anchor scrolling
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if (href.length>1) { e.preventDefault(); document.querySelector(href)?.scrollIntoView({behavior:'smooth'}); }
  });
});
