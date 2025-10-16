console.log("Script loaded successfully");

// ===== Back to top =====
const back = document.getElementById('backToTop');
if (back) {
  window.addEventListener('scroll', () => {
    back.style.display = window.scrollY > 250 ? 'block' : 'none';
  });
  back.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );
}

// ===== Toast helper =====
function showToast(message, timeout = 2200) {
  const t = document.createElement('div');
  t.className = 'toastify';
  t.textContent = message;
  Object.assign(t.style, {
    position: 'fixed',
    right: '20px',
    bottom: '90px',
    background: '#111827',
    color: '#fff',
    padding: '10px 14px',
    borderRadius: '8px',
    zIndex: 99999,
    opacity: 0,
    transition: 'opacity .2s ease'
  });
  document.body.appendChild(t);
  requestAnimationFrame(() => (t.style.opacity = '1'));
  setTimeout(() => {
    t.style.opacity = '0';
    setTimeout(() => t.remove(), 300);
  }, timeout);
}

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  console.log("Contact form loaded");

  const contactFields = [
    { label: "Full name", id: "cname", type: "text", required: true },
    { label: "Email address", id: "cemail", type: "email", required: true },
    {
      label: "Subject", id: "csubject", type: "select",
      options: ["General enquiry", "Admissions", "Campus visit", "Fees & payment"]
    },
    { label: "Message", id: "cmessage", type: "textarea", rows: 5, required: true }
  ];

  contactForm.innerHTML = ""; // clear static HTML

  contactFields.forEach(field => {
    const div = document.createElement("div");
    div.className = "mb-3";

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
      input.rows = field.rows || 3;
    } else {
      input = document.createElement("input");
      input.className = "form-control";
      input.id = field.id;
      input.type = field.type;
    }

    if (field.required) input.required = true;
    div.appendChild(label);
    div.appendChild(input);
    contactForm.appendChild(div);
  });

  // Add buttons
  const btnGroup = document.createElement("div");
  btnGroup.className = "d-flex gap-2 mt-2";
  btnGroup.innerHTML = `
    <button type="submit" class="btn btn-primary">Send Message</button>
    <button type="button" id="contactReset" class="btn btn-outline-secondary">Reset</button>
  `;
  contactForm.appendChild(btnGroup);

  // Submit
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("cname").value.trim();
    const subject = document.getElementById("csubject").value;

    const oldAlert = document.querySelector(".alert-success");
    if (oldAlert) oldAlert.remove();

    const alertBox = document.createElement("div");
    alertBox.className = "alert alert-success mt-3";
    alertBox.textContent = `Thank you, ${name}! Your "${subject}" message has been sent successfully.`;
    contactForm.appendChild(alertBox);
    setTimeout(() => contactForm.reset(), 1000);
  });

  document.addEventListener("click", e => {
    if (e.target.id === "contactReset") {
      contactForm.reset();
      document.querySelector(".alert-success")?.remove();
    }
  });
}

// ===== Register Form =====
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  console.log("Register form loaded");

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

  registerForm.innerHTML = "";

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

  const btnDiv = document.createElement("div");
  btnDiv.className = "col-12 d-flex gap-2 mt-3";
  btnDiv.innerHTML = `
    <button class="btn btn-success" type="submit">Submit Application</button>
    <button id="regReset" type="button" class="btn btn-outline-secondary">Reset</button>
  `;
  registerForm.appendChild(btnDiv);

  registerForm.addEventListener("submit", e => {
    e.preventDefault();
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    document.querySelector(".alert-success")?.remove();

    const successDiv = document.createElement("div");
    successDiv.className = "alert alert-success mt-3";
    successDiv.textContent = `Registration successful! Welcome ${firstName} ${lastName}.`;
    registerForm.appendChild(successDiv);
  });

  document.addEventListener("click", e => {
    if (e.target.id === "regReset") {
      registerForm.reset();
      document.querySelector(".alert-success")?.remove();
    }
  });
}

// ===== Gallery =====
const galleryContainer = document.getElementById("gallery");
if (galleryContainer) {
  console.log("Gallery loaded");
  const galleryItems = [
    { src: "assets/gallery/lab1.jpg", caption: "Technical Laboratory" },
    { src: "assets/gallery/lab2.jpg", caption: "State of the Art Library" },
    { src: "assets/gallery/lab3.jpg", caption: "2024/2025 Graduation" },
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
        <div class="card-body text-center"><p class="mb-0 small">${item.caption}</p></div>
      </div>
    `;
    galleryContainer.appendChild(col);
  });
}



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
 

 console.log("no 2 works");

console.log("Script fully executed");

