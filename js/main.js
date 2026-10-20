// 1PM on a Monday — shared behavior (kept intentionally tiny)

// Flag JS early so CSS can reveal progressive-enhancement UI without a flash
document.documentElement.classList.add('has-js');

document.addEventListener('DOMContentLoaded', function () {
  // Stamp the current year in the footer
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Portfolio: filter the work cards by service category
  var filterBar = document.querySelector('.work-filters');
  if (filterBar) {
    var buttons = filterBar.querySelectorAll('[data-filter]');
    var cards = document.querySelectorAll('.work-card');
    var emptyMsg = document.querySelector('.work-empty');

    var applyFilter = function (filter) {
      var shown = 0;
      for (var i = 0; i < cards.length; i++) {
        var cats = (cards[i].getAttribute('data-category') || '').split(/\s+/);
        var match = filter === 'all' || cats.indexOf(filter) !== -1;
        cards[i].hidden = !match;
        if (match) { shown++; }
      }
      for (var j = 0; j < buttons.length; j++) {
        var on = buttons[j].getAttribute('data-filter') === filter;
        buttons[j].classList.toggle('pill-active', on);
        buttons[j].setAttribute('aria-pressed', on ? 'true' : 'false');
      }
      if (emptyMsg) { emptyMsg.hidden = shown !== 0; }
    };

    filterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-filter]');
      if (btn) { applyFilter(btn.getAttribute('data-filter')); }
    });
  }
});
