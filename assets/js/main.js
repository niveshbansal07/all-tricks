(function () {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('show', !expanded);
    });
  }

  // Set footer year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Smooth active link highlight
  const links = document.querySelectorAll('.nav-links a');
  links.forEach(l => {
    if (l.href === window.location.href) l.classList.add('active');
  });
})();


// Post utilities loaded conditionally
window.AllTricksPost = (function() {
  function generateTOC(containerSelector, tocSelector) {
    const container = document.querySelector(containerSelector);
    const toc = document.querySelector(tocSelector);
    if (!container || !toc) return;
    const headings = container.querySelectorAll('h2, h3');
    if (!headings.length) { toc.style.display = 'none'; return; }
    const ul = document.createElement('ul');
    headings.forEach(h => {
      const id = h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      h.id = id;
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${id}`;
      a.textContent = h.textContent;
      li.appendChild(a);
      ul.appendChild(li);
    });
    toc.appendChild(ul);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const link = toc.querySelector(`a[href="#${entry.target.id}"]`);
        if (link) {
          if (entry.isIntersecting) link.classList.add('active');
          else link.classList.remove('active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: [0, 1] });
    headings.forEach(h => observer.observe(h));
  }

  function shareCurrentPage(title) {
    const url = window.location.href;
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title || document.title);
    return {
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      copy: url
    };
  }

  return { generateTOC, shareCurrentPage };
})();


