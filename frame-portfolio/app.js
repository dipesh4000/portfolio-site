import { portfolio as p } from './content.js';

const esc = (value) => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const href = value => {
  try { const url = new URL(value, location.href); return ['http:', 'https:', 'mailto:'].includes(url.protocol) ? esc(url.href) : '#'; }
  catch { return '#'; }
};
const arrow = '<span aria-hidden="true">↗</span>';
const barcode = '<span class="barcode" aria-hidden="true"></span>';
const stripes = '<span class="stripes" aria-hidden="true"></span>';
const links = [['projects', 'Work'], ['about', 'Profile'], ['experience', 'Experience'], ['contact', 'Contact']].filter(([id]) => p.sections[id]);
const external = (url, text, className = '') => `<a class="${className}" href="${href(url)}" target="_blank" rel="noopener noreferrer">${text}${arrow}</a>`;
const metrics = values => values.map(m => `<div><strong>${esc(m.value)}</strong><span>${esc(m.label)}</span></div>`).join('');
document.title = `${p.firstName} ${p.lastName} — ${p.headline}`;
document.querySelector('meta[name="description"]').content = `${p.firstName} ${p.lastName}. ${p.role}. ${p.description}`;
if (/^#[0-9a-f]{6}$/i.test(p.accent)) document.documentElement.style.setProperty('--red', p.accent);

function projectArt(type) {
  // Abstract interface illustrations, not screenshots or live API output.
  if (type === 'vision') return `<div class="orbital-grid"></div><div class="planet"></div><div class="satellite"><i></i><b></b><i></i></div><div class="target-box"><span>SPACECRAFT</span></div><span class="art-coordinates">X 042.86<br>Y 018.24</span>`;
  if (type === 'data') return `<div class="data-stack"><div>01 <b>BRONZE</b><span>RAW</span></div><div>02 <b>SILVER</b><span>CLEAN</span></div><div>03 <b>GOLD</b><span>READY</span></div></div>`;
  if (type === 'api') return `<div class="api-window"><div class="window-dots">● ● ● <span>api / v1</span></div><p><em>GET</em> /items/{id}</p><pre>{<br>  <span>"status"</span>: "success",<br>  <span>"data"</span>: { ... }<br>}</pre><small>SCHEMA VALIDATED <b>✓</b></small></div>`;
  return `<div class="network-art"><span class="network-core">API</span><i class="node n1">USER</i><i class="node n2">POST</i><i class="node n3">AUTH</i><i class="node n4">DATA</i></div>`;
}

document.querySelector('#app').innerHTML = `
  <div class="site-frame" id="top">
    <header class="header">
      <div class="header-top"><a class="wordmark" href="#top" aria-label="${esc(p.firstName)} ${esc(p.lastName)} home">${esc(p.brand)} <span>ENGINEER & BUILDER</span></a><span class="edition">${esc(p.edition)}</span><a class="header-contact" href="mailto:${esc(p.email)}">LET’S TALK ${arrow}</a></div>
      <div class="header-bottom"><div class="header-mark" aria-hidden="true">${stripes}<span>● ● ●</span></div><nav aria-label="Main navigation">${links.map(([id, title], i) => `<a href="#${id}"><small>0${i + 1}</small> ${title}</a>`).join('')}</nav><span class="header-code">DESIGNED TO BUILD.<br>BUILT TO MAKE A DIFFERENCE.</span></div>
    </header>
    <main id="main">
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero-grid" aria-hidden="true"></div><div class="hero-chevrons" aria-hidden="true"></div>
        <div class="hero-topline"><span>INDEPENDENT MIND. ENGINEERED IMPACT.</span><span>28.5355° N / 77.3910° E</span></div>
        <h1 id="hero-title" class="hero-title"><span>${esc(p.firstName)}</span><span>${esc(p.lastName)}</span></h1>
        <img class="hero-character" src="${href(p.heroImage)}" alt="Original scarlet and carbon-fiber armored figure, looking over its shoulder" fetchpriority="high" width="1024" height="1536">
        <div class="hero-side-label"><span>THE HUMAN<br>BEHIND THE SYSTEM.</span><b>01 / ${new Date().getFullYear()}</b></div>
        <div class="hero-role"><span>FIELD OF OPERATION</span><strong>${esc(p.role)}</strong><p>${esc(p.specialties)}</p><div class="mini-rule">${barcode}<span>BUILD. LEARN. REPEAT.</span></div></div>
        <a class="hero-explore" href="#${links[0]?.[0] || 'main'}">EXPLORE THE WORK <span aria-hidden="true">↓</span></a>
        <div class="hero-dossier">
          <div class="dossier-name"><small>MEET THE ENGINEER</small><strong>${esc(p.firstName)} ${esc(p.lastName)}</strong><span>${esc(p.location)}</span></div>
          <div class="dossier-barcode">${barcode}<small>DK — ENGINEERING / 001</small></div>
          <div class="dossier-status"><span class="status"><i></i>${esc(p.availability)}</span><span>${esc(p.role)} / ${new Date().getFullYear()}</span></div>
          ${external(p.resume, 'VIEW RÉSUMÉ', 'button button-dark')}
          <div class="dossier-bottom"><span>HUMAN CURIOSITY. MACHINE PRECISION.</span><div>${p.socials.map(s => external(s.url, esc(s.label))).join('')}</div>${stripes}</div>
        </div>
      </section>
      <div class="red-ticker" aria-label="Specialties"><div><span>MACHINE LEARNING</span><b>✳</b><span>DATA SCIENCE</span><b>✳</b><span>BACKEND ENGINEERING</span><b>✳</b><span>BUILT WITH INTENT</span><b>↗</b></div></div>
      ${p.sections.projects ? `<section class="work section" id="projects">
        <div class="section-meta"><span>01 / SELECTED WORK</span><span>IDEAS → REAL-WORLD SYSTEMS</span>${stripes}</div>
        <div class="section-heading"><h2>PROOF OF<br><em>WORK.</em></h2><div><p>A few things I’ve built.<br>Every project, a problem worth solving.</p><div class="filters" role="group" aria-label="Filter projects"><button class="active" data-filter="All" aria-pressed="true">All work <sup>${String(p.projects.length).padStart(2, '0')}</sup></button>${[...new Set(p.projects.map(x => x.category))].map(c => `<button data-filter="${esc(c)}" aria-pressed="false">${esc(c)}</button>`).join('')}</div></div></div>
        <div class="project-grid">${p.projects.map(x => `<article class="project" data-category="${esc(x.category)}"><a class="project-art art-${esc(x.type)}" href="${href(x.url)}" target="_blank" rel="noopener noreferrer" aria-label="View ${esc(x.title)} on GitHub"><div class="art-top"><span>PROJECT / ${esc(x.id)}</span>${arrow}</div>${projectArt(x.type)}<span class="art-caption">${esc(x.label)}</span><span class="illustration-label">CONCEPT VISUAL</span></a><div class="project-info"><div class="project-number">${esc(x.id)} /</div><div><h3>${external(x.url, esc(x.title))}</h3><p>${esc(x.description)}</p><ul class="tags">${x.stack.map(s => `<li>${esc(s)}</li>`).join('')}</ul></div></div></article>`).join('')}</div>
        <p id="filter-status" class="sr-only" role="status" aria-live="polite"></p>
      </section>` : ''}
      ${p.sections.about ? `<section class="about section" id="about"><div class="section-meta"><span>02 / THE PROFILE</span><span>MORE THAN A JOB TITLE</span>${stripes}</div><div class="about-grid"><div class="profile-photo"><img src="${href(p.portrait)}" alt="${esc(p.firstName)} ${esc(p.lastName)}" loading="lazy" width="600" height="800"><div class="photo-overlay"><span>IDENTITY VERIFIED / HUMAN</span><strong>${esc(p.brand)}</strong></div><span class="photo-corner" aria-hidden="true">+</span></div><div class="about-copy"><span class="eyebrow">CURIOUS BY DEFAULT.</span><h2>INTELLIGENCE,<br><em>ENGINEERED.</em></h2><p>${esc(p.description)}</p><div class="metrics" id="metrics">${metrics(p.metrics)}</div><div class="education">${p.education.map(e => `<span>↗ ${esc(e)}</span>`).join('')}</div></div></div><div class="skills"><div class="skills-title"><span>THE TOOLKIT</span><strong>READY TO<br>BUILD.</strong>${barcode}</div>${p.skills.map((s, i) => `<div class="skill-group"><small>0${i + 1} / ${esc(s.name)}</small><p>${s.items.map(esc).join('<br>')}</p></div>`).join('')}</div></section>` : ''}
      ${p.sections.experience ? `<section class="experience section" id="experience"><div class="section-meta"><span>03 / FIELD EXPERIENCE</span><span>LEARNING THROUGH DOING</span>${stripes}</div><div class="section-heading"><h2>IN THE<br><em>FIELD.</em></h2><p>Real teams. Real constraints.<br>Better systems, built together.</p></div><div class="experience-list">${p.experience.map((x, i) => `<article><span class="experience-index">0${i + 1}</span><span class="experience-date">${esc(x.period)}</span><div><h3>${esc(x.company)}</h3><span class="experience-role">${esc(x.role)}</span><p>${esc(x.text)}</p></div>${arrow}</article>`).join('')}</div></section>` : ''}
      ${p.sections.contact ? `<section class="contact section" id="contact"><div class="section-meta"><span>04 / NEXT TRANSMISSION</span><span>${esc(p.availability)}</span>${stripes}</div><div class="contact-heading"><h2>LET’S BUILD<br><span>SOMETHING.</span></h2><a class="contact-arrow" href="mailto:${esc(p.email)}" aria-label="Email ${esc(p.firstName)}">↗</a></div><div class="contact-bottom"><p>Have a project, an opportunity, or a good question?<br>I’d like to hear it.</p><div><a class="email-link" href="mailto:${esc(p.email)}">${esc(p.email)}</a><button class="copy-email" aria-label="Copy email address">COPY EMAIL <span aria-hidden="true">⧉</span></button><span id="copy-status" role="status" aria-live="polite"></span></div></div></section>` : ''}
    </main>
    <footer><a class="wordmark" href="#top">${esc(p.brand)}</a><span>© ${new Date().getFullYear()} ${esc(p.firstName)} ${esc(p.lastName)}<br>CRAFTED WITH CURIOSITY.</span><div>${p.socials.map(s => external(s.url, esc(s.label))).join('')}</div><a class="back-top" href="#top">BACK TO TOP ↑</a></footer>
  </div>`;

document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
  let count = 0;
  document.querySelectorAll('.project').forEach(card => { card.hidden = category !== 'All' && card.dataset.category !== category; if (!card.hidden) count++; });
  document.querySelector('#filter-status').textContent = `${count} projects shown.`;
}));

document.querySelector('.copy-email')?.addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try { await navigator.clipboard.writeText(p.email); status.textContent = 'Email copied.'; }
  catch { status.textContent = 'Select the email address to copy it.'; }
});

if (p.metricsEndpoint && document.querySelector('#metrics')) {
  try {
    const url = new URL(p.metricsEndpoint, location.href);
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Invalid endpoint');
    const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!response.ok) throw new Error('Metrics unavailable');
    const data = await response.json();
    if (!Array.isArray(data.metrics) || !data.metrics.length || !data.metrics.every(m => ['string', 'number'].includes(typeof m.value) && typeof m.label === 'string')) throw new Error('Invalid metrics');
    document.querySelector('#metrics').innerHTML = metrics(data.metrics.slice(0, 4));
  } catch { /* The configured static metrics remain visible if the service is unavailable. */ }
}
