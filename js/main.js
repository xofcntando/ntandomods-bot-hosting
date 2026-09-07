/* ============================================================
   NTANDOMODS — main.js
   Navbar, scroll reveal, FAQ accordion, copy buttons,
   deploy link generator, active section highlighting
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Navbar: scrolled state ---------- */
  const navbar = document.getElementById("navbar");
  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 12);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  hamburger.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    hamburger.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", String(open));
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    })
  );

  /* ---------- Scroll reveal ---------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  /* ---------- Active nav link on scroll ---------- */
  const sections = ["home", "bots", "deploy", "generator", "env", "faq"];
  const navAnchors = document.querySelectorAll(".nav-links a");
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navAnchors.forEach((a) => {
            a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections
    .map((id) => document.getElementById(id))
    .filter(Boolean)
    .forEach((sec) => sectionObserver.observe(sec));

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach((item) => {
    const q = item.querySelector(".faq-q");
    const a = item.querySelector(".faq-a");
    q.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      /* close all others */
      document.querySelectorAll(".faq-item.open").forEach((other) => {
        other.classList.remove("open");
        other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
        other.querySelector(".faq-a").style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("open");
        q.setAttribute("aria-expanded", "true");
        a.style.maxHeight = a.scrollHeight + "px";
      }
    });
  });

  /* ---------- Copy buttons ---------- */
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const sourceId = btn.getAttribute("data-copy");
      const source = document.getElementById(sourceId);
      if (!source) return;
      const text = source.innerText;
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        /* fallback for older browsers */
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }
      const original = btn.innerHTML;
      btn.classList.add("done");
      btn.textContent = "Copied ✓";
      setTimeout(() => {
        btn.classList.remove("done");
        btn.innerHTML = original;
      }, 1600);
    });
  });

  /* ---------- Deploy link generator ---------- */
  const repoInput = document.getElementById("repoInput");
  const genBtn = document.getElementById("genBtn");
  const genError = document.getElementById("genError");
  const genResult = document.getElementById("genResult");
  const genLink = document.getElementById("genLink");
  const genGo = document.getElementById("genGo");

  function normalizeRepoUrl(raw) {
    const value = raw.trim();
    if (!value) return null;
    /* accept bare "user/repo" shorthand */
    const shortMatch = value.match(/^([\w.-]+)\/([\w.-]+)$/);
    if (shortMatch) return "https://github.com/" + shortMatch[0];
    /* accept full-ish URLs with or without protocol */
    const urlMatch = value.match(/^(?:https?:\/\/)?(?:www\.)?github\.com\/([\w.-]+)\/([\w.-]+)/i);
    if (!urlMatch) return null;
    return "https://github.com/" + urlMatch[1] + "/" + urlMatch[2];
  }

  function generate() {
    const repo = normalizeRepoUrl(repoInput.value);
    genError.classList.remove("show");
    genResult.classList.remove("show");
    if (!repo) {
      genError.classList.add("show");
      return;
    }
    const deployUrl = "https://render.com/deploy?repo=" + encodeURIComponent(repo);
    genLink.textContent = deployUrl;
    genGo.href = deployUrl;
    genResult.classList.add("show");
  }

  genBtn.addEventListener("click", generate);
  repoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") generate();
  });

  /* ---------- Footer year safety ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
