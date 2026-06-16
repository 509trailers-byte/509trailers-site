// ─────────────────────────────────────────
// 509 TRAILER RENTALS — AVAILABILITY CONFIG
// Update this file to change status on ALL pages at once
//
// available: true  = shows green "Available Now"
// available: false = shows red "Booked Until [date]"
// bookedUntil: null or 'June 20' etc.
// ─────────────────────────────────────────

var FLEET_STATUS = {
  'car-hauler':   { available: true,  bookedUntil: null },
  'dump-trailer': { available: true,  bookedUntil: null },
  'deck-over':    { available: true,  bookedUntil: null },
  'enclosed':     { available: false, bookedUntil: 'June 20' }
};

document.addEventListener('DOMContentLoaded', function() {

  // ── INDIVIDUAL TRAILER PAGES ──
  // Reads slug from <body data-trailer="...">
  var slug = document.body.getAttribute('data-trailer');
  if (slug && FLEET_STATUS[slug]) {
    var badge = document.querySelector('.status-badge');
    if (badge) updateBadge(badge, FLEET_STATUS[slug]);
  }

  // ── MAIN PAGE FLEET CARDS ──
  Object.keys(FLEET_STATUS).forEach(function(key) {
    var card = document.getElementById(key);
    if (!card) return;
    var badge = card.querySelector('.trailer-status');
    if (badge) updateBadge(badge, FLEET_STATUS[key]);
  });

  function updateBadge(badge, status) {
    if (status.available) {
      badge.textContent = 'Available Now';
      badge.className = badge.className.replace('status-coming', '').trim();
      if (!badge.className.includes('status-available')) badge.className += ' status-available';
      badge.removeAttribute('style');
    } else {
      badge.textContent = status.bookedUntil ? 'Booked Until ' + status.bookedUntil : 'Currently Booked';
      badge.className = badge.className.replace('status-available', '').replace('status-coming', '').trim();
      badge.style.background = 'rgba(215,43,43,0.12)';
      badge.style.color = '#FF6B6B';
      badge.style.border = '1px solid rgba(215,43,43,0.25)';
    }
  }

});
