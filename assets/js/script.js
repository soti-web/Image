'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}
//dark light mode
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("ion-icon");

themeToggle.addEventListener("click", function () {
  themeIcon.style.opacity = "0";
  themeIcon.style.transform = "rotate(90deg) scale(0.5)";

  setTimeout(() => {
    document.body.classList.toggle("light-mode");
    if (document.body.classList.contains("light-mode")) {
      themeIcon.setAttribute("name", "sunny-outline");
      document.documentElement.style.setProperty('--smoky-black', 'hsl(0, 0%, 93%)');
    } else {
      themeIcon.setAttribute("name", "moon-outline");
      document.documentElement.style.setProperty('--smoky-black', 'hsl(0, 0%, 7%)');
    }
    themeIcon.style.opacity = "1";
    themeIcon.style.transform = "rotate(0deg) scale(1)";
  }, 200);
});




// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}





// filter variables
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





// add event in all filter button items for large screen
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



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}


// Lightbox zoom rsm
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");

const projectItems = document.querySelectorAll(".project-item a");

for (let i = 0; i < projectItems.length; i++) {
  projectItems[i].addEventListener("click", function (e) {
    e.preventDefault();
    const img = this.querySelector("img");
    lightboxImg.src = img.src;
    lightbox.style.display = "flex";
  });
}

lightboxClose.addEventListener("click", function () {
  lightbox.style.display = "none";
});

lightbox.addEventListener("click", function (e) {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});


//order
const orderBtns = document.querySelectorAll("[data-order]");
for (let i = 0; i < orderBtns.length; i++) {
  orderBtns[i].addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector("[data-nav-link]").click();
    // بە contact page بچە
    const contactLink = [...document.querySelectorAll("[data-nav-link]")]
      .find(el => el.innerHTML.toLowerCase() === "contact");
    if (contactLink) contactLink.click();
  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    const pageName = this.getAttribute("data-page-en") || this.textContent.trim().toLowerCase();

    for (let i = 0; i < pages.length; i++) {
      if (pageName === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}


// --- ئەم بەشە لە کۆتایی Script.js زیاد بکە یان شوێنی کۆدە کۆنەکان بگرەوە ---

// 1. باشترکردنی گۆڕینی لاپەڕەکان (Smooth Page Navigation)
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const pageName = this.getAttribute("data-page-en") || this.textContent.trim().toLowerCase();

    for (let i = 0; i < pages.length; i++) {
      if (pageName === pages[i].dataset.page) {
        // ئەنیمەیشنی ونبوون و دەرکەوتن
        pages[i].style.opacity = "0";
        pages[i].classList.add("active");
        
        requestAnimationFrame(() => {
          pages[i].style.transition = "opacity 0.5s ease";
          pages[i].style.opacity = "1";
        });

        navigationLinks[i].classList.add("active");
        window.scrollTo({ top: 0, behavior: 'smooth' }); // سکڕۆڵکردن بۆ سەرەوە بە نەرمی
      } else {
        pages[i].classList.remove("active");
        pages[i].style.opacity = "0";
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

// 2. باشترکردنی Lightbox (خاڵی سێیەم کە داوات کردبوو)
// ئەم کۆدە وێنەکە بە نەرمی گەورە دەکات و کاتێک دایدەخەیت بە نەرمی ون دەبێت
if (lightbox) {
  lightbox.style.transition = "opacity 0.4s ease, visibility 0.4s";
  lightbox.style.display = "flex";
  lightbox.style.visibility = "hidden";
  lightbox.style.opacity = "0";

  for (let i = 0; i < projectItems.length; i++) {
    projectItems[i].addEventListener("click", function (e) {
      e.preventDefault();
      const img = this.querySelector("img");
      lightboxImg.src = img.src;
      
      // نیشاندانی Lightbox بە ئەنیمەیشن
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
    setTimeout(() => {
      lightbox.style.visibility = "hidden";
    }, 400);
  };

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
}


