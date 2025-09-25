(function(){
  const searchInput = document.getElementById('search');
  const chips = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-tags]');

  function applyFilters() {
    const q = (searchInput?.value || '').toLowerCase().trim();
    const activeChip = document.querySelector('.chip.active');
    const category = activeChip ? activeChip.getAttribute('data-filter') : 'all';
    cards.forEach(card => {
      const tags = (card.getAttribute('data-tags') || '').toLowerCase();
      const title = (card.querySelector('h3')?.textContent || '').toLowerCase();
      const matchText = !q || title.includes(q) || tags.includes(q);
      const matchCat = category === 'all' || tags.includes(category);
      card.style.display = (matchText && matchCat) ? '' : 'none';
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      applyFilters();
    });
  });

  // Initial filter from URL q param
  const params = new URLSearchParams(window.location.search);
  const q = params.get('q');
  if (q && searchInput) {
    searchInput.value = q;
  }
  applyFilters();
})();


