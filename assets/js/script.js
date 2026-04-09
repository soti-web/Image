'use strict';

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// Dark/Light Mode
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("ion-icon");

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.body.classList.add("light-mode");
  themeIcon.setAttribute("name", "sunny-outline");
} else {
  document.body.classList.remove("light-mode");
  themeIcon.setAttribute("name", "moon-outline");
}

themeToggle.addEventListener("click", function () {
  themeIcon.style.opacity = "0";
  themeIcon.style.transform = "rotate(90deg) scale(0.5)";
  setTimeout(() => {
    document.body.classList.toggle("light-mode");
    if (document.body.classList.contains("light-mode")) {
      themeIcon.setAttribute("name", "sunny-outline");
      document.documentElement.style.setProperty('--smoky-black', 'hsl(0, 0%, 93%)');
      localStorage.setItem("theme", "light");
    } else {
      themeIcon.setAttribute("name", "moon-outline");
      document.documentElement.style.setProperty('--smoky-black', 'hsl(0, 0%, 7%)');
      localStorage.setItem("theme", "dark");
    }
    themeIcon.style.opacity = "1";
    themeIcon.style.transform = "rotate(0deg) scale(1)";
  }, 200);
});


for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
}

modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// Filter / Select
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

let lastClickedBtn = filterBtn[0];
for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// Contact Form
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// Lightbox — تەنها یەک جار
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");
const projectItems = document.querySelectorAll(".project-item a");

lightbox.style.transition = "opacity 0.4s ease, visibility 0.4s";
lightbox.style.display = "flex";
lightbox.style.visibility = "hidden";
lightbox.style.opacity = "0";

for (let i = 0; i < projectItems.length; i++) {
  projectItems[i].addEventListener("click", function (e) {
    e.preventDefault();
    const img = this.querySelector("img");
    lightboxImg.src = img.src;
    lightbox.style.visibility = "visible";
    lightbox.style.opacity = "1";
    lightboxImg.style.transform = "scale(0.8)";
    setTimeout(() => {
      lightboxImg.style.transition = "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)";
      lightboxImg.style.transform = "scale(1)";
    }, 50);
  });
}

const closeLightbox = () => {
  lightbox.style.opacity = "0";
  lightboxImg.style.transform = "scale(0.8)";
  setTimeout(() => { lightbox.style.visibility = "hidden"; }, 400);
};

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });

// Order Button
const orderBtns = document.querySelectorAll("[data-order]");
for (let i = 0; i < orderBtns.length; i++) {
  orderBtns[i].addEventListener("click", function (e) {
    e.preventDefault();
    const contactLink = [...document.querySelectorAll("[data-nav-link]")]
      .find(el => el.innerHTML.toLowerCase() === "contact");
    if (contactLink) contactLink.click();
  });
}

// Page Navigation — تەنها یەک جار
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const pageName = this.getAttribute("data-page-en") || this.textContent.trim().toLowerCase();

    for (let j = 0; j < pages.length; j++) {
      if (pageName === pages[j].dataset.page) {
        pages[j].style.opacity = "0";
        pages[j].classList.add("active");
        requestAnimationFrame(() => {
          pages[j].style.transition = "opacity 0.5s ease";
          pages[j].style.opacity = "1";
        });
        navigationLinks[j].classList.add("active");
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        pages[j].classList.remove("active");
        pages[j].style.opacity = "0";
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}
