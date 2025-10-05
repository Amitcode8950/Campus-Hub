// script.js — Option A (Campus Hub)
// Requirements (from README):
// - Implement TWO small interactions (e.g., nav toggle + search filter)
// - Make it keyboard friendly; keep ARIA attributes in sync.

const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');
const q = document.getElementById('q');
const list = document.getElementById('eventList');
const stats = document.getElementById('stats');

// TODO 1: Implement mobile navigation toggle (click + Enter/Space)
//  - Toggle 'open' class on .nav-list
//  - Update aria-expanded on the button
navToggle.addEventListener('click', () => {
  // your code here
});
navToggle.addEventListener('keydown', (e) => {
  // Support Enter/Space
});

// Render events from events.json
async function loadEvents() {
  const res = await fetch('events.json');
  const items = await res.json();
  window.__EVENTS__ = items;
  render(items);
  updateStats(items.length);
}

function cardTemplate(ev) {
  return `<li class="card">
      <h3>${ev.title}</h3>
      <p>${ev.date} • <span class="badge">${ev.club}</span></p>
      <p>${ev.desc}</p>
    </li>`;
}

function render(items) {
  list.innerHTML = items.map(cardTemplate).join('');
}

// TODO 2: Implement search filter for title/club
q.addEventListener('input', () => {
  const term = q.value.trim().toLowerCase();
  const items = (window.__EVENTS__ || []).filter(ev =>
    ev.title.toLowerCase().includes(term) ||
    ev.club.toLowerCase().includes(term)
  );
  render(items);
  updateStats(items.length);
});

function updateStats(n) {
  const total = (window.__EVENTS__ || []).length;
  stats.textContent = `${n} shown / ${total} total`;
}

loadEvents();
