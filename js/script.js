
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
// Dynamically load registration form fields
const registerForm = document.getElementById("registerForm");

const formFields = [
  { label: "First name", id: "firstName", type: "text", col: "col-md-6", required: true },
  { label: "Last name", id: "lastName", type: "text", col: "col-md-6", required: true },
  { label: "Date of birth", id: "dob", type: "date", col: "col-md-6", required: true },
  {
    label: "Gender", id: "gender", type: "select", col: "col-md-6",
    options: ["Female", "Male", "Other"]
  },
  { label: "Parent / Guardian contact", id: "guardian", type: "text", col: "col-md-6", required: true },
  {
    label: "Class applying for", id: "classFor", type: "select", col: "col-md-6",
    options: ["Kindergarten", "Primary", "Junior Secondary", "Senior Secondary"]
  },
  { label: "Additional notes", id: "notes", type: "textarea", col: "col-12" }
];

formFields.forEach(field => {
  const div = document.createElement("div");
  div.className = field.col;

  const label = document.createElement("label");
  label.className = "form-label";
  label.textContent = field.label;

  let input;

  if (field.type === "select") {
    input = document.createElement("select");
    input.className = "form-select";
    input.id = field.id;
    field.options.forEach(opt => {
      const option = document.createElement("option");
      option.textContent = opt;
      input.appendChild(option);
    });
  } else if (field.type === "textarea") {
    input = document.createElement("textarea");
    input.className = "form-control";
    input.id = field.id;
    input.rows = 3;
  } else {
    input = document.createElement("input");
    input.className = "form-control";
    input.id = field.id;
    input.type = field.type;
  }

  if (field.required) input.required = true;

  div.appendChild(label);
  div.appendChild(input);
  registerForm.appendChild(div);
});

// Add Submit & Reset Buttons
const btnDiv = document.createElement("div");
btnDiv.className = "col-12 d-flex gap-2 mt-3";

btnDiv.innerHTML = `
  <button class="btn btn-success" type="submit">Submit Application</button>
  <button id="regReset" type="button" class="btn btn-outline-secondary">Reset</button>
`;

registerForm.appendChild(btnDiv);

// Handle Form Submission
registerForm.addEventListener("submit", e => {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();

  // Simple success card
  const successDiv = document.createElement("div");
  successDiv.className = "alert alert-success mt-3";
  successDiv.textContent = `🎉 Registration successful! Welcome ${firstName} ${lastName}.`;

  // Remove any existing success message before showing a new one
  const oldAlert = document.querySelector(".alert-success");
  if (oldAlert) oldAlert.remove();

  registerForm.appendChild(successDiv);
});

// Handle Reset Button
document.addEventListener("click", e => {
  if (e.target.id === "regReset") {
    registerForm.reset();
    const oldAlert = document.querySelector(".alert-success");
    if (oldAlert) oldAlert.remove();
  }
});


/* ---------- Small UX niceties ---------- */
// Smooth internal anchor scrolling
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if (href.length>1) { e.preventDefault(); document.querySelector(href)?.scrollIntoView({behavior:'smooth'}); }
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const galleryContainer = document.getElementById("gallery");

  const galleryItems = [
    { src: "assets/gallery/lab1.jpg", caption: "Technical Laboratory" },
    { src: "assets/gallery/lab2.jpg", caption: " State of the art libary" },
    { src: "assets/gallery/lab3.jpg", caption: " 2024/2025 Graduation" },
    { src: "assets/gallery/lab4.jpg", caption: "Music Auditorium" },
    { src: "assets/gallery/lab5.jpg", caption: "Computer Lab" },
    { src: "assets/gallery/lab6.jpg", caption: "Lecture Hall" },
    { src: "assets/gallery/lab7.jpg", caption: " Recreation ground and Playpark" },
    { src: "assets/gallery/lab8.jpg", caption: " Olympic Standard Swimming Pool" },
    { src: "assets/gallery/lab9.jpg", caption: "Lunch Hall" },
    { src: "assets/gallery/lab10.jpg", caption: "Track Field" },
    { src: "assets/gallery/lab11.jpg", caption: "Greenhouse" },
    { src: "assets/gallery/lab12.jpg", caption: "Co-curicular Activities" },


  ];

  galleryItems.forEach((item, index) => {
    const delay = (index % 3) * 50;
    const col = document.createElement("div");
    col.className = "col-12 col-md-4";
    col.setAttribute("data-aos", "zoom-in");
    col.setAttribute("data-aos-delay", delay);

    col.innerHTML = `
      <div class="card shadow-sm hover-lift">
        <img src="${item.src}" class="card-img-top" alt="${item.caption}">
        <div class="card-body text-center">
          <p class="mb-0 small">${item.caption}</p>
        </div>
      </div>
    `;
    galleryContainer.appendChild(col);
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const features = [
    {
      icon: "fa-graduation-cap",
      title: "Academic Excellence",
      desc: "Strong curriculum with experienced teachers and modern classrooms."
    },
    {
      icon: "fa-flask",
      title: "STEM Labs",
      desc: "Hands-on science and computer labs to spark innovation."
    },
    {
      icon: "fa-heart",
      title: "Pastoral Care",
      desc: "Supportive environment that cares for every student's wellbeing."
    },
    {
      icon: "fa-football",
      title: "Sports",
      desc: "Our sports program promotes fitness, teamwork, and school spirit."
    },
    {
      icon: "fa-bowl-food",
      title: "Food",
      desc: "Nutritious meals that support health and academic performance."
    },
    {
      icon: "fa-wheelchair-move",
      title: "Inclusion",
      desc: "Inclusive environment with equal opportunities for all learners."
    }
  ];

  const featuresRow = document.getElementById("featuresRow");

  features.forEach((item, i) => {
    const col = document.createElement("div");
    col.className = "col-md-4";
    col.setAttribute("data-aos", "zoom-in");
    col.setAttribute("data-aos-delay", i * 100);

    col.innerHTML = `
      <div class="card h-100 shadow-sm hover-lift">
        <div class="card-body text-center">
          <i class="fa-solid ${item.icon} fa-2x mb-3"></i>
          <h5>${item.title}</h5>
          <p>${item.desc}</p>
        </div>
      </div>
    `;

    featuresRow.appendChild(col);
  });
});
 


// ===== About Page Dynamic Cards =====
const curriculumData = [
  { title: "Interactive Lessons" },
  { title: "After-school Clubs" },
  { title: "Sports & Arts" },
  { title: "STEM Workshops" },
  { title: "Community Service" }
];

const curriculumContainer = document.getElementById("curriculumHighlights");

if (curriculumContainer) {
  curriculumData.forEach((item, i) => {
    const col = document.createElement("div");
    col.className = "col-md-4";
    col.setAttribute("data-aos", "flip-left");
    col.setAttribute("data-aos-delay", i * 100);
    col.innerHTML = `<div class="info-card p-3 shadow-sm">${item.title}</div>`;
    curriculumContainer.appendChild(col);
  });
}
 