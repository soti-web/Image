'use strict';

// ===================================
// زمانەکان - Language Data
// ===================================

const translations = {
  en: {
    "nav-about": "About",
    "nav-project": "Project",
    "nav-contact": "Contact",
    "sidebar-title": "developer",
    "sidebar-show-contacts": "Show Contacts",
    "contact-email": "Email",
    "contact-telegram": "Telegram",
    "contact-location": "Location",
    "about-title": "About",
    "service-design-title": "Design",
    "service-design-text": "We create logos, banners, posters, and ads professionally and modernly based on your needs.",
    "service-web-title": "Web",
    "service-web-text": "I can help you build a website that grows your business.",
    "service-raport-title": "Raport & Seminar",
    "service-raport-text": "I create modern reports and seminars with attractive design and clear structure.",
    "service-mini-title": "Mini Project",
    "service-mini-text": "I am ready to help you complete your projects professionally and successfully.",
    "team-title": "TEAM",
    "project-title": "Project",
    "filter-all": "All",
    "filter-website": "Website",
    "filter-project": "Project",
    "filter-graphic": "Graphic Design",
    "select-category": "Select category",
    "contact-title": "Contact",
    "form-title": "Contact Form",
    "form-name": "Full name",
    "form-email": "Email address",
    "form-message": "Your Message",
    "form-btn": "Send Message",
  },

  ku: {
    "nav-about": "دەربارە",
    "nav-project": "پرۆژە",
    "nav-contact": "پەیوەندی",
    "sidebar-title": "پێشەیی",
    "sidebar-show-contacts": "پەیوەندیەکان",
    "contact-email": "ئیمەیڵ",
    "contact-telegram": "تێلێگرام",
    "contact-location": "شوێن",
    "about-title": "دەربارە",
    "service-design-title": "دیزاین",
    "service-design-text": "بەپێی خواستی خۆت لۆگۆ، بانەر، پۆستەر، ریکلام، بۆت دروست دەکەین بەشێوەیەکی پرۆفیشناڵانەو سەردەمیانە.",
    "service-web-title": "وێب",
    "service-web-text": "دەتوانم یارمەتیت بدەم بۆ دروستکردنی وێبسایتێک کە کار و بزنسەکەت گەشە پێبدات.",
    "service-raport-title": "راپۆرت و سیمینار",
    "service-raport-text": "راپۆرت و سیمیناری مۆدێرن دروست دەکەم بە دیزاینێکی سەرنجڕاکێش و ڕێکخستنی ڕوون.",
    "service-mini-title": "پرۆژەی بچووک",
    "service-mini-text": "ئامادەم یارمەتیت بدەم بۆ ئەنجامدانی پڕۆژەکانت بە شێوەیەکی پیشەیی و سەرکەوتوو.",
    "team-title": "تیم",
    "project-title": "پرۆژەکان",
    "filter-all": "هەموو",
    "filter-website": "وێبسایت",
    "filter-project": "پرۆژە",
    "filter-graphic": "گرافیک دیزاین",
    "select-category": "جۆر هەڵبژێرە",
    "contact-title": "پەیوەندی",
    "form-title": "فۆرمی پەیوەندی",
    "form-name": "ناوی تەواو",
    "form-email": "ئیمەیڵ",
    "form-message": "پەیامەکەت",
    "form-btn": "پەیام بنێرە",
  }
};

// ===================================
// Current Language
// ===================================

let currentLang = "en";

// ===================================
// Apply Language Function
// ===================================

function applyLanguage(lang) {
  const t = translations[lang];
  const isKu = lang === "ku";

  // Fade out
  const allText = document.querySelectorAll(
    ".service-item-title, .service-item-text, .article-title, .contact-title, .navbar-link, .testimonials-title, .form-title"
  );
  allText.forEach(el => el.style.opacity = "0");

  setTimeout(() => {

    // Direction
    document.documentElement.setAttribute("dir", isKu ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", isKu ? "ku" : "en");

    // Navbar links
    const navLinks = document.querySelectorAll("[data-nav-link]");
    const navKeys = ["nav-about", "nav-project", "nav-contact"];
    navLinks.forEach((link, i) => {
      if (navKeys[i]) {
        link.textContent = t[navKeys[i]];
        link.setAttribute("data-page-en", ["about", "project", "contact"][i]);
      }
    });

    // Sidebar title
    const sidebarTitle = document.querySelector(".info-content .title");
    if (sidebarTitle) sidebarTitle.textContent = t["sidebar-title"];

    // Show Contacts button
    const showContacts = document.querySelector(".info_more-btn span");
    if (showContacts) showContacts.textContent = t["sidebar-show-contacts"];

    // Contact titles
    const contactTitles = document.querySelectorAll(".contact-title");
    const contactKeys = ["contact-email", "contact-telegram", "contact-location"];
    contactTitles.forEach((el, i) => {
      if (contactKeys[i]) el.textContent = t[contactKeys[i]];
    });

    // About title
    const aboutTitle = document.querySelector(".about .article-title");
    if (aboutTitle) aboutTitle.textContent = t["about-title"];

    // Service items
    const serviceTitles = document.querySelectorAll(".service-item-title");
    const serviceTexts = document.querySelectorAll(".service-item-text");
    const serviceTitleKeys = ["service-design-title", "service-web-title", "service-raport-title", "service-mini-title"];
    const serviceTextKeys = ["service-design-text", "service-web-text", "service-raport-text", "service-mini-text"];

    serviceTitles.forEach((el, i) => {
      if (serviceTitleKeys[i]) el.textContent = t[serviceTitleKeys[i]];
    });
    serviceTexts.forEach((el, i) => {
      if (serviceTextKeys[i]) el.textContent = t[serviceTextKeys[i]];
    });

    // Team title
    const teamTitle = document.querySelector(".testimonials-title");
    if (teamTitle) teamTitle.textContent = t["team-title"];

    // Project title
    const projectTitle = document.querySelector(".project .article-title");
    if (projectTitle) projectTitle.textContent = t["project-title"];

    // Filter buttons
    const filterBtns = document.querySelectorAll("[data-filter-btn]");
    const filterKeys = ["filter-all", "filter-website", "filter-project", "filter-graphic"];
    filterBtns.forEach((btn, i) => {
      if (filterKeys[i]) btn.textContent = t[filterKeys[i]];
    });

    // Select category
    const selectVal = document.querySelector("[data-selecct-value]");
    if (selectVal) selectVal.textContent = t["select-category"];

    // Select items
    const selectItems = document.querySelectorAll("[data-select-item] button");
    const selectKeys = ["filter-all", "filter-website", "filter-project", "filter-graphic"];
    selectItems.forEach((item, i) => {
      if (selectKeys[i]) item.textContent = t[selectKeys[i]];
    });

    // Contact page title
    const contactPageTitle = document.querySelector(".contact .article-title");
    if (contactPageTitle) contactPageTitle.textContent = t["contact-title"];

    // Form title
    const formTitle = document.querySelector(".form-title");
    if (formTitle) formTitle.textContent = t["form-title"];

    // Form placeholders
    const formName = document.querySelector("input[name='fullname']");
    const formEmail = document.querySelector("input[name='email']");
    const formMsg = document.querySelector("textarea[name='message']");
    if (formName) formName.placeholder = t["form-name"];
    if (formEmail) formEmail.placeholder = t["form-email"];
    if (formMsg) formMsg.placeholder = t["form-message"];

    // Form button
    const formBtn = document.querySelector(".form-btn span");
    if (formBtn) formBtn.textContent = t["form-btn"];

    // Toggle button text
    const langToggle = document.getElementById("lang-toggle");
    if (langToggle) langToggle.textContent = isKu ? "EN" : "KU";

    // Fade in
    allText.forEach(el => el.style.opacity = "1");

  }, 300);
}

// ===================================
// Lang Toggle Button
// ===================================

const langToggle = document.getElementById("lang-toggle");

if (langToggle) {
  langToggle.addEventListener("click", function () {
    this.style.opacity = "0";
    this.style.transform = "scale(0.7)";

    setTimeout(() => {
      currentLang = currentLang === "en" ? "ku" : "en";
      applyLanguage(currentLang);
      this.style.opacity = "1";
      this.style.transform = "scale(1)";
    }, 150);
  });
}
