// ─────────────────────────────────────────────────────
// 509 TRAILER RENTALS — AVAILABILITY CONFIG
// Edit FLEET_STATUS below to update badges site-wide.
//
// available: true  → green "Available Now"
// available: false → red "Booked Until [date]"
// ─────────────────────────────────────────────────────

var FLEET_STATUS = {
  'car-hauler':   { available: true,  bookedUntil: null },
  'dump-trailer': { available: true,  bookedUntil: null },
  'deck-over':    { available: true,  bookedUntil: null },
  'enclosed':     { available: true,  bookedUntil: null }
};

document.addEventListener('DOMContentLoaded', function() {

  // ── INDIVIDUAL TRAILER PAGES ──
  var slug = document.body.getAttribute('data-trailer');
  if (slug && FLEET_STATUS[slug]) {
    var badge = document.querySelector('.status-badge');
    if (badge) applyStatus(badge, FLEET_STATUS[slug], 'badge');
  }

  // ── MAIN PAGE CARDS ──
  Object.keys(FLEET_STATUS).forEach(function(key) {
    var card = document.getElementById(key);
    if (!card) return;
    var badge = card.querySelector('.trailer-status');
    if (badge) applyStatus(badge, FLEET_STATUS[key], 'card');
  });

  function applyStatus(el, status, type) {
    if (status.available) {
      el.textContent = 'Available Now';
      if (type === 'badge') el.classList.remove('booked');
      if (type === 'card') {
        el.className = 'trailer-status status-available';
        el.removeAttribute('style');
      }
    } else {
      el.textContent = status.bookedUntil
        ? 'Booked Until ' + status.bookedUntil
        : 'Currently Booked';
      if (type === 'badge') el.classList.add('booked');
      if (type === 'card') {
        el.className = 'trailer-status';
        el.style.background = 'rgba(215,43,43,0.12)';
        el.style.color = '#FF6B6B';
        el.style.border = '1px solid rgba(215,43,43,0.25)';
      }
    }
  }

});
