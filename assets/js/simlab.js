/* ==========================================================================
   Pentarch SimLab — shared core (registry, header/mega menu, hero, footer,
   search palette, and helpers every lab uses).  Exposes window.SL
   ========================================================================== */
(function () {
  'use strict';

  /* ---------------- Registry ---------------- */
  const DEPTS = [
    { id: 'engineering', name: 'Engineering', icon: 'cog', blurb: 'Mechanical, civil, electrical and mechatronics labs: gears, robots, structures, engines and circuits.' },
    { id: 'physics', name: 'Physics & Aerospace', icon: 'rocket', blurb: 'Motion, flight, orbits, waves and optics. Build machines and fly them.' },
    { id: 'life', name: 'Life Sciences & Anatomy', icon: 'dna', blurb: 'Explore the body organ by organ, then go down to cells, chromosomes and genes.' },
    { id: 'health', name: 'Medicine & Health', icon: 'heart-pulse', blurb: 'Pharmacology, epidemiology and clinical decision-making simulators.' },
    { id: 'chemistry', name: 'Chemistry', icon: 'flask-conical', blurb: 'Atoms, molecules, reactions and the wet lab, without the broken glassware.' },
    { id: 'computing', name: 'Computing & Maths', icon: 'binary', blurb: 'Algorithms, logic, networks and the mathematics behind everything else.' },
    { id: 'media', name: 'Media & Creative Arts', icon: 'clapperboard', blurb: 'Run a TV gallery, a radio desk and a mixing console; learn camera, light and music.' },
    { id: 'operations', name: 'Operations & Emergency', icon: 'siren', blurb: 'Control rooms under pressure: plants, grids, dispatch and air traffic.' },
    { id: 'earth', name: 'Earth & Agriculture', icon: 'sprout', blurb: 'Ecosystems, climate, farming and the restless planet beneath us.' },
    { id: 'business', name: 'Business & Economics', icon: 'trending-up', blurb: 'Markets, money and decisions, modelled and made visible.' },
  ];

  const MODULES = [
    // Engineering
    { id: 'gears', dept: 'engineering', title: 'Gear Trains & Torque', icon: 'cog', desc: 'Build gear trains, compute ratios, speed and torque, and watch the teeth mesh.', level: 'Year 1–2' },
    { id: 'robot-arm', dept: 'engineering', title: 'Robot Arm Kinematics', icon: 'bot', desc: 'Denavit–Hartenberg matrices, forward and inverse kinematics, Jacobians and workspace.', level: 'Year 2–4' },
    { id: 'engine', dept: 'engineering', title: 'Four-Stroke Engine', icon: 'flame', desc: 'Animated piston engine with a live P–V diagram, Otto cycle efficiency and power.', level: 'Year 1–3' },
    { id: 'beams', dept: 'engineering', title: 'Beam Bending & Statics', icon: 'ruler', desc: 'Place supports and loads; get reactions, shear force and bending moment diagrams.', level: 'Year 1–2' },
    { id: 'truss-bridge', dept: 'engineering', title: 'Bridge Builder', icon: 'construction', desc: 'Design a truss bridge, load it, and see member forces in tension and compression.', level: 'Year 1–3' },
    { id: 'circuits', dept: 'engineering', title: 'Circuit Lab', icon: 'zap', desc: 'DC, RC and RLC circuits with a virtual oscilloscope and multimeter.', level: 'Year 1–2' },
    // Physics & Aerospace
    { id: 'projectile', dept: 'physics', title: 'Projectile Motion', icon: 'target', desc: 'Throw a stone, kick a ball or fire a cannon, with and without air resistance.', level: 'Foundation' },
    { id: 'wind-tunnel', dept: 'physics', title: 'Wind Tunnel & Airfoils', icon: 'wind', desc: 'Shape an airfoil, set the angle of attack and watch streamlines, pressure and lift.', level: 'Year 2–3' },
    { id: 'plane-builder', dept: 'physics', title: 'Build & Fly a Plane', icon: 'plane', desc: 'Design wings, engine and mass, then take off, fly and land your aircraft.', level: 'All levels' },
    { id: 'helicopter', dept: 'physics', title: 'Helicopter Flight', icon: 'fan', desc: 'Collective, cyclic and tail rotor: learn to hover, translate and land.', level: 'All levels' },
    { id: 'oscillations', dept: 'physics', title: 'Springs, Pendulums & Resonance', icon: 'activity', desc: 'Simple harmonic motion, damping, driven oscillators and resonance curves.', level: 'Year 1' },
    { id: 'orbits', dept: 'physics', title: 'Orbits & Rocket Launch', icon: 'orbit', desc: 'Newtonian gravity, Kepler’s laws, orbital transfers and launching to orbit.', level: 'Year 1–3' },
    { id: 'waves-optics', dept: 'physics', title: 'Waves & Optics', icon: 'waves', desc: 'Interference, the double slit, lenses and mirrors with live ray tracing.', level: 'Year 1–2' },
    // Life sciences
    { id: 'ear', dept: 'life', title: 'The Human Ear', icon: 'ear', desc: 'Navigate the outer, middle and inner ear and follow a sound wave to the brain.', level: 'All levels' },
    { id: 'eye', dept: 'life', title: 'The Eye & Vision', icon: 'eye', desc: 'Anatomy of the eye, accommodation, and how lenses correct myopia and hyperopia.', level: 'All levels' },
    { id: 'heart', dept: 'life', title: 'Heart & Circulation', icon: 'heart-pulse', desc: 'A beating heart, blood flow through the chambers and the ECG it produces.', level: 'All levels' },
    { id: 'skeleton', dept: 'life', title: 'Skeleton & Muscles', icon: 'bone', desc: 'Explore bones and joints, and the lever mechanics of muscles in motion.', level: 'All levels' },
    { id: 'cell', dept: 'life', title: 'Cell Explorer', icon: 'microscope', desc: 'Animal and plant cells, organelle by organelle, with transport across membranes.', level: 'Foundation' },
    { id: 'neuron', dept: 'life', title: 'Neurons & Action Potentials', icon: 'brain', desc: 'Stimulate a neuron and watch ion channels fire (Hodgkin–Huxley model).', level: 'Year 2–3' },
    { id: 'chromosomes', dept: 'life', title: 'Chromosomes, Mitosis & Meiosis', icon: 'split', desc: 'Karyotypes, cell division step by step, crossing over and nondisjunction.', level: 'Year 1–2' },
    { id: 'dna-lab', dept: 'life', title: 'DNA Lab: Splicing & Protein Synthesis', icon: 'dna', desc: 'Transcribe, splice out introns, translate codons and engineer mutations.', level: 'Year 1–3' },
    { id: 'gene-mixer', dept: 'life', title: 'Gene Mixer', icon: 'git-merge', desc: 'Cross organisms, mix alleles and predict outcomes with Punnett squares and pedigrees.', level: 'Year 1–2' },
    // Medicine & health
    { id: 'pharmacology', dept: 'health', title: 'Pharmacokinetics', icon: 'pill', desc: 'Absorption, half-life and steady state: model drug concentration over time.', level: 'Year 2–4' },
    { id: 'epidemic', dept: 'health', title: 'Epidemic Simulator', icon: 'shield-plus', desc: 'SIR/SEIR outbreaks, R₀, vaccination thresholds and public health measures.', level: 'Year 1–3' },
    { id: 'vitals', dept: 'health', title: 'Patient Monitor & Triage', icon: 'monitor-dot', desc: 'Read a bedside monitor, recognise deterioration and prioritise patients.', level: 'Clinical years' },
    // Chemistry
    { id: 'periodic-table', dept: 'chemistry', title: 'Periodic Table Explorer', icon: 'grid-3x3', desc: 'Every element with electron configurations, Bohr models and periodic trends.', level: 'Foundation' },
    { id: 'molecule-builder', dept: 'chemistry', title: 'Molecule Builder', icon: 'atom', desc: 'Bond atoms together, check valence and see 3D VSEPR shapes.', level: 'Year 1' },
    { id: 'titration', dept: 'chemistry', title: 'Titration Lab', icon: 'beaker', desc: 'Run an acid–base titration drop by drop, plot the pH curve and pick indicators.', level: 'Year 1' },
    { id: 'gas-laws', dept: 'chemistry', title: 'Gas Laws & Kinetic Theory', icon: 'thermometer', desc: 'A box of molecules: pressure, volume, temperature and the Maxwell–Boltzmann spread.', level: 'Year 1' },
    { id: 'reaction-kinetics', dept: 'chemistry', title: 'Reaction Rates & Equilibrium', icon: 'flask-round', desc: 'Arrhenius, catalysts, rate laws and Le Chatelier’s principle in action.', level: 'Year 1–2' },
    // Computing & maths
    { id: 'algorithms', dept: 'computing', title: 'Algorithm Visualizer', icon: 'bar-chart-3', desc: 'Sorting, searching and pathfinding animated step by step, with complexity.', level: 'Year 1–2' },
    { id: 'logic-gates', dept: 'computing', title: 'Logic Circuit Builder', icon: 'cpu', desc: 'Wire gates into adders, latches and counters; generate truth tables.', level: 'Year 1' },
    { id: 'networking', dept: 'computing', title: 'Networks & Packets', icon: 'network', desc: 'Watch packets travel the OSI layers, get routed, lost and retransmitted.', level: 'Year 1–2' },
    { id: 'calculus', dept: 'computing', title: 'Calculus Visualizer', icon: 'sigma', desc: 'Derivatives as slopes, integrals as areas, limits and Taylor series.', level: 'Foundation' },
    { id: 'fourier', dept: 'computing', title: 'Fourier & Signals', icon: 'audio-waveform', desc: 'Build waves from sines, see spectra, sampling and aliasing.', level: 'Year 2' },
    { id: 'matrices', dept: 'computing', title: 'Matrix Transformations', icon: 'move-3d', desc: 'Drag a 2×2 or 3×3 matrix and see the space bend; eigenvectors and determinants.', level: 'Year 1' },
    // Media & creative arts
    { id: 'tv-studio', dept: 'media', title: 'TV Match Director', icon: 'tv', desc: 'Direct a live football broadcast: cut cameras, run replays, graphics and audio.', level: 'All levels' },
    { id: 'radio-studio', dept: 'media', title: 'Radio Studio On-Air', icon: 'radio', desc: 'Present a live show: mic, jingles, ad breaks, callers and the clock.', level: 'All levels' },
    { id: 'mixer', dept: 'media', title: 'Audio Mixing Desk', icon: 'sliders-horizontal', desc: 'A real-sounding multitrack mixer: gain, EQ, compression, panning and meters.', level: 'All levels' },
    { id: 'piano', dept: 'media', title: 'Piano & Music Theory', icon: 'piano', desc: 'Play a full keyboard and learn notes, scales, chords and progressions.', level: 'All levels' },
    { id: 'camera', dept: 'media', title: 'Camera & Exposure', icon: 'camera', desc: 'Aperture, shutter and ISO: the exposure triangle with depth of field and motion blur.', level: 'All levels' },
    { id: 'lighting', dept: 'media', title: 'Studio Lighting', icon: 'lightbulb', desc: 'Set key, fill and back lights; learn classic portrait and interview setups.', level: 'All levels' },
    { id: 'newsroom', dept: 'media', title: 'Newsroom & Crisis Comms', icon: 'newspaper', desc: 'Verify sources, write to deadline and handle a PR crisis as it unfolds.', level: 'All levels' },
    // Operations
    { id: 'plant-operator', dept: 'operations', title: 'Plant Operator Console', icon: 'gauge', desc: 'Run a water treatment and borehole plant; diagnose alarms and recover from faults.', level: 'All levels' },
    { id: 'power-grid', dept: 'operations', title: 'Power Grid Control', icon: 'zap', desc: 'Balance supply and demand, hold 50 Hz and respond to generator trips.', level: 'Year 2–4' },
    { id: 'dispatch', dept: 'operations', title: 'Emergency Dispatch Centre', icon: 'phone-call', desc: 'Take calls, triage incidents and send ambulances, fire and police in time.', level: 'All levels' },
    { id: 'air-traffic', dept: 'operations', title: 'Air Traffic Control', icon: 'radar', desc: 'Sequence arrivals and departures, keep separation and land them safely.', level: 'All levels' },
    // Earth & agriculture
    { id: 'ecosystem', dept: 'earth', title: 'Predator–Prey Ecosystem', icon: 'rabbit', desc: 'Lotka–Volterra dynamics and an agent-based savannah you can disturb.', level: 'Year 1' },
    { id: 'climate', dept: 'earth', title: 'Climate & Carbon Budget', icon: 'cloud-sun', desc: 'Energy balance, greenhouse forcing and emission pathways to 2100.', level: 'Year 1–3' },
    { id: 'farm', dept: 'earth', title: 'Crop & Water Balance', icon: 'sprout', desc: 'Plan a season: rainfall, irrigation, soil moisture and crop yield.', level: 'All levels' },
    { id: 'earthquake', dept: 'earth', title: 'Earthquakes & Seismic Waves', icon: 'mountain', desc: 'P and S waves, seismograms, locating epicentres and magnitude.', level: 'Year 1–2' },
    // Business & economics
    { id: 'market', dept: 'business', title: 'Supply & Demand Market', icon: 'scale', desc: 'Shift curves, add taxes and price controls, and measure surplus and deadweight loss.', level: 'Year 1' },
    { id: 'business-finance', dept: 'business', title: 'Business Finance Lab', icon: 'calculator', desc: 'Break-even, cash flow, loans and NPV for a small business you design.', level: 'Year 1–2' },
  ];

  const byId = Object.fromEntries(MODULES.map(m => [m.id, m]));
  const deptById = Object.fromEntries(DEPTS.map(d => [d.id, d]));
  const PARENT = 'https://pentarchcommunications.com/';

  /* ---------------- Icons (Lucide, loaded from CDN) ---------------- */
  function icon(name, cls) { return `<i data-lucide="${name}"${cls ? ` class="${cls}"` : ''}></i>`; }
  function refreshIcons(root) {
    if (window.lucide && window.lucide.createIcons) {
      try { window.lucide.createIcons({ attrs: { 'stroke-width': 1.9 }, nameAttr: 'data-lucide', root: root || document }); } catch (e) { try { window.lucide.createIcons(); } catch (_) {} }
    }
  }
  const LOGO_SRC = 'https://pentarchcommunications.com/wp-content/uploads/2026/01/LOGO-SYMBOL-TRANSPARENT-150x150.png';
  const LOGO = `<img src="${LOGO_SRC}" alt="Pentarch" width="36" height="36">`;

  /* ---------------- Header ---------------- */
  // ---- theme (light / dark), remembered per device; first visit follows the device setting ----
  function themeNow() { return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'; }
  function applyTheme(t, save) {
    document.documentElement.dataset.theme = t;
    if (save) { try { localStorage.setItem('sl-theme', t); } catch (e) {} }
    const b = document.getElementById('slTheme');
    if (b) { b.innerHTML = icon(t === 'light' ? 'moon' : 'sun'); b.setAttribute('aria-label', t === 'light' ? 'Switch to dark mode' : 'Switch to light mode'); refreshIcons(); }
    const mt = document.querySelector('meta[name=theme-color]'); if (mt) mt.content = t === 'light' ? '#f5f7fb' : '#070b16';
    document.dispatchEvent(new CustomEvent('sl-theme', { detail: t }));
  }
  (function initTheme() {
    let t = null; try { t = localStorage.getItem('sl-theme'); } catch (e) {}
    if (!t) t = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    document.documentElement.dataset.theme = t;
  })();
  function header() {
    const deptItems = DEPTS.map(d => {
      const mods = MODULES.filter(m => m.dept === d.id);
      return `<div class="item" data-dept="${d.id}"><button aria-haspopup="true">${d.name.split(' ')[0].replace('&', '')}${icon('chevron-down', 'chev')}</button>
        <div class="mega" data-dept="${d.id}"><div class="container mega-inner">
          <div class="mega-intro"><div class="tag" style="color:var(--accent);font:600 .7rem var(--mono);letter-spacing:.14em;text-transform:uppercase;margin-bottom:8px">${icon(d.icon)} Department</div><h4>${d.name}</h4><p>${d.blurb}</p><a class="btn sm" href="index.html#${d.id}">All ${mods.length} labs ${icon('arrow-right')}</a></div>
          <div class="mega-grid">${mods.map(m => `<a class="mlink" href="${m.id}.html"><span class="ic">${icon(m.icon)}</span><span><b>${m.title}</b><span>${m.desc}</span></span></a>`).join('')}</div>
        </div></div></div>`;
    });
    // Split: first 4 departments get their own tabs; the rest grouped under "More"
    const main = deptItems.slice(0, 5).join('');
    const more = `<div class="item"><button aria-haspopup="true">More labs${icon('chevron-down', 'chev')}</button>
      <div class="mega"><div class="container mega-inner">
        <div class="mega-intro"><h4>Every discipline</h4><p>${MODULES.length} interactive labs across ${DEPTS.length} departments. Press <kbd>/</kbd> anywhere to search.</p><a class="btn sm" href="index.html#labs">Browse all ${icon('arrow-right')}</a></div>
        <div class="mega-depts">${DEPTS.slice(5).map(d => `<div data-dept="${d.id}"><h5>${icon(d.icon)}${d.name}</h5>${MODULES.filter(m => m.dept === d.id).map(m => `<a href="${m.id}.html">${m.title}</a>`).join('')}</div>`).join('')}</div>
      </div></div></div>`;
    return `<header class="sl-header" id="slHeader"><div class="container bar">
      <a class="sl-logo" href="index.html"><span class="mark">${LOGO}</span><span><b class="pw">PENTARCH</b> SimLab<small>Learn by doing</small></span></a>
      <nav class="sl-nav" aria-label="Departments"><div class="item m-search"><a href="#" id="slSearchM">${icon('search')} Search all labs</a></div>${main}${more}</nav>
      <button class="sl-search" id="slSearchBtn" aria-label="Search labs">${icon('search')}<span>Search</span><kbd>/</kbd></button>
      <button class="sl-theme" id="slTheme" aria-label="Switch to light mode" title="Light or dark">${icon('sun')}</button>
      <button class="sl-burger" id="slBurger" aria-label="Menu">${icon('menu')}</button>
    </div></header>`;
  }

  function footer() {
    const cols = [['Engineering', 'engineering'], ['Science', 'life'], ['Media', 'media'], ['Operations', 'operations']];
    const groups = {
      engineering: ['engineering', 'physics', 'computing'],
      life: ['life', 'health', 'chemistry', 'earth'],
      media: ['media', 'business'],
      operations: ['operations'],
    };
    return `<footer class="sl-footer"><div class="container">
      <div class="cols">
        <div><a class="sl-logo" href="index.html" style="padding:0"><span class="mark">${LOGO}</span><span><b class="pw">PENTARCH</b> SimLab<small>Learn by doing</small></span></a>
          <p class="muted small" style="margin-top:14px;max-width:330px">Interactive simulations for university and college students. Experiment, build, break things and understand why. A learning platform by Pentarch Communications.</p>
          <a href="${PARENT}" style="display:inline-flex;align-items:center;gap:6px">${icon('arrow-up-left')} pentarchcommunications.com</a><button class="btn sm" id="slOffline" hidden style="margin-top:14px">${icon('download')} Save all labs for offline use</button><div class="small muted" id="slOfflineMsg" style="margin-top:6px"></div></div>
        ${cols.map(([t, k]) => `<div><h5>${t}</h5>${MODULES.filter(m => groups[k].includes(m.dept)).slice(0, 9).map(m => `<a href="${m.id}.html">${m.title}</a>`).join('')}</div>`).join('')}
      </div>
      <div class="base"><span>© ${new Date().getFullYear()} Pentarch Communications · Pentarch SimLab</span><span>Simulations are simplified models for learning. Always follow your institution’s lab and safety procedures.</span></div>
    </div></footer>`;
  }

  function pageHero(m) {
    const d = deptById[m.dept];
    return `<section class="page-hero" data-fx="${m.dept}" aria-label="Lab introduction"><canvas class="hero-fx" aria-hidden="true"></canvas><div class="container">
      <div class="crumbs"><a href="index.html">SimLab</a> / <a href="index.html#${d.id}">${d.name}</a> / ${m.title}</div>
      <div class="tag">${icon(m.icon)} ${d.name}</div>
      <h1>${m.title}</h1>
      <p class="lead">${m.desc}</p>
      <div class="meta"><span class="chip">${icon('graduation-cap')} ${m.level}</span><span class="chip">${icon('mouse-pointer-click')} Interactive</span><span class="chip">${icon('book-open')} Theory, worked examples & quiz</span><button class="chip present-btn" id="slPresentBtn" hidden aria-label="Present the lab full screen">${icon('presentation')} Present</button><button class="chip tour-btn" id="slTourBtn" hidden>${icon('compass')} Take the guided tour</button></div>
    </div></section>`;
  }

  /* ---------------- Search palette ---------------- */
  const KW = {"gears": "gear ratio torque gearbox posho mill transmission rpm sprocket worm planetary mechanism", "robot-arm": "robotics kinematics inverse kinematics manipulator automation dh denavit hartenberg", "engine": "internal combustion otto cycle diesel petrol piston thermodynamics motor boda", "beams": "bending moment shear force deflection structural civil stress strain", "truss-bridge": "bridge structure civil structural members tension compression", "circuits": "electricity electric ohms law ohm resistor capacitor voltage current electronics led solar battery breadboard oscilloscope", "projectile": "kinematics motion trajectory throw ball range physics", "wind-tunnel": "aerodynamics airfoil lift drag aeronautical bernoulli", "plane-builder": "aircraft aeroplane airplane flight fly pilot aviation", "helicopter": "rotor flight hover aviation pilot", "oscillations": "shm simple harmonic motion pendulum spring damping resonance vibration", "orbits": "gravity satellite kepler planets space rocket astronomy", "waves-optics": "light lens mirror interference diffraction refraction optics waves", "ear": "hearing audiology ent cochlea otitis rinne weber anatomy", "eye": "vision optometry ophthalmology refraction snellen cataract trachoma anatomy", "heart": "cardiology cardiac ecg ekg blood pressure auscultation murmur anatomy cardiovascular", "skeleton": "bones fracture orthopaedics xray x-ray joints muscles anatomy", "cell": "biology osmosis membrane organelles iv fluids diffusion", "neuron": "nerve action potential nervous system physiology electrolytes potassium", "chromosomes": "meiosis mitosis karyotype down syndrome genetics cell division", "dna-lab": "genetics transcription translation pcr crispr mutation sickle hiv genexpert", "gene-mixer": "genetics inheritance mendel punnett cross sickle blood group g6pd heredity", "pharmacology": "drugs dosage dose calculation drip rate pharmacokinetics medicine pharmacy nursing", "epidemic": "epidemiology outbreak sir model vaccination immunisation kepi cholera malaria covid public health", "vitals": "nursing triage news2 etat monitor vital signs emergency clinical osce", "periodic-table": "elements chemistry atoms electron configuration", "molecule-builder": "chemistry bonds vsepr molecular shape organic", "titration": "acid base acid-base ph neutralisation chemistry burette indicator", "gas-laws": "boyle charles pressure volume temperature ideal gas kinetic theory", "reaction-kinetics": "reaction rate equilibrium catalyst activation energy chemistry", "algorithms": "sorting searching computer science programming coding big o dijkstra pathfinding", "logic-gates": "digital electronics boolean binary and or not computer", "networking": "internet tcp ip packets routing computer networks", "calculus": "derivative integral differentiation integration limits maths mathematics", "fourier": "signals frequency spectrum fft sampling audio dsp", "matrices": "linear algebra transformation vectors eigenvalues maths mathematics", "tv-studio": "television broadcast director football match producer media", "radio-studio": "radio presenter broadcast fm media", "mixer": "sound audio mixing desk eq music production", "piano": "music keyboard chords notes scales", "camera": "photography exposure aperture shutter iso", "lighting": "film lighting three point studio photography", "newsroom": "journalism news editor pr public relations media", "plant-operator": "water treatment scada process control power station industrial operator", "power-grid": "electricity grid power station frequency kplc energy", "dispatch": "emergency call 999 112 ambulance dispatcher", "air-traffic": "atc air traffic control aviation radar airport", "ecosystem": "ecology predator prey wildlife population biology environment", "climate": "climate change global warming greenhouse co2 environment", "farm": "agriculture crops maize irrigation farming soil", "earthquake": "seismology seismic geology earthquakes waves rift valley", "market": "economics supply demand price stock market inflation", "business-finance": "business finance accounting loan interest rate cash flow break-even npv entrepreneurship"};
  /** Does lab `id` match search word `w` through its keywords? (used by the home catalogue) */
  function matches(id, w) { return new RegExp('(^|[^a-z0-9])' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).test((KW[id] || '').toLowerCase()); }
  function palette() {
    const el = document.createElement('div');
    el.className = 'palette'; el.id = 'slPalette';
    el.innerHTML = `<div class="box"><input placeholder="Search ${MODULES.length} labs: gears, DNA, mixer, orbit…" aria-label="Search labs"><ul></ul></div>`;
    document.body.appendChild(el);
    const input = el.querySelector('input'), ul = el.querySelector('ul');
    let sel = 0, list = [];
    const render = () => {
      const q = input.value.trim().toLowerCase();
      const words = q.split(/[\s,]+/).filter(Boolean);
      const hay = m => (m.title + ' ' + m.desc + ' ' + deptById[m.dept].name + ' ' + m.id.replace(/-/g, ' ') + ' ' + (KW[m.id] || '')).toLowerCase();
      const score = m => { const h = hay(m), t = m.title.toLowerCase(); let sc = 0; for (const w of words) { const re = new RegExp('(^|[^a-z0-9])' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')); if (!re.test(h)) return -1; sc += re.test(t) ? 3 : re.test(KW[m.id] || '') ? 2 : 1; } return sc; };
      list = !words.length ? MODULES.slice(0, 12) : MODULES.map(m => [m, score(m)]).filter(x => x[1] >= 0).sort((a, b) => b[1] - a[1]).map(x => x[0]).slice(0, 12);
      sel = Math.min(sel, Math.max(0, list.length - 1));
      ul.innerHTML = list.map((m, i) => `<li class="${i === sel ? 'sel' : ''}" data-dept="${m.dept}"><a href="${m.id}.html"><span class="ic">${icon(m.icon)}</span><span><b>${m.title}</b><br><span class="small muted">${deptById[m.dept].name}</span></span></a></li>`).join('') || '<li class="muted small" style="padding:12px">No labs match.</li>';
      refreshIcons(ul);
    };
    input.addEventListener('input', () => { sel = 0; render(); });
    input.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { sel = Math.min(sel + 1, list.length - 1); render(); e.preventDefault(); }
      if (e.key === 'ArrowUp') { sel = Math.max(sel - 1, 0); render(); e.preventDefault(); }
      if (e.key === 'Enter' && list[sel]) location.href = list[sel].id + '.html';
      if (e.key === 'Escape') hide();
    });
    el.addEventListener('click', e => { if (e.target === el) hide(); });
    const show = () => { el.classList.add('show'); input.value = ''; render(); setTimeout(() => input.focus(), 30); };
    const hide = () => el.classList.remove('show');
    document.addEventListener('keydown', e => {
      const t = e.target.tagName;
      if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(t) && !e.target.isContentEditable) { e.preventDefault(); show(); }
    });
    return show;
  }

  /* ---------------- Progress (per browser) ---------------- */
  const PKEY = 'sl-progress-v1';
  function progress() { try { return JSON.parse(localStorage.getItem(PKEY)) || {}; } catch (e) { return {}; } }
  function saveProgress(p) { try { localStorage.setItem(PKEY, JSON.stringify(p)); } catch (e) {} }
  function markVisit(id) { const p = progress(); p[id] = Object.assign(p[id] || {}, { v: Date.now() }); saveProgress(p); }
  function markQuiz(id, score, total) { const p = progress(); const e = p[id] || {}; if (!e.q || score / total >= e.q[0] / e.q[1]) e.q = [score, total]; p[id] = e; saveProgress(p); }

  function moreLabs(m) {
    const same = MODULES.filter(x => x.dept === m.dept);
    const i = same.indexOf(m), prev = same[(i - 1 + same.length) % same.length], next = same[(i + 1) % same.length];
    const others = MODULES.filter(x => x.dept !== m.dept);
    const pick = [...same.filter(x => x !== m && x !== prev && x !== next), ...others.filter((_, k) => (k * 7 + i) % 11 === 0)].slice(0, 3);
    const d = deptById[m.dept];
    const card = x => `<a class="card" href="${x.id}.html" data-dept="${x.dept}"><span class="badge">${deptById[x.dept].name}</span><span class="ic">${icon(x.icon)}</span><h3>${x.title}</h3><p>${x.desc}</p><span class="go">Open lab ${icon('arrow-right')}</span></a>`;
    const sec = document.createElement('section');
    sec.className = 'container sl-more'; sec.setAttribute('aria-label', 'More labs');
    sec.innerHTML = `<div class="sl-pn">
        <a href="${prev.id}.html" class="sl-pn-a"><span>${icon('arrow-left')} Previous in ${d.name}</span><b>${prev.title}</b></a>
        <a href="${next.id}.html" class="sl-pn-a right"><span>Next in ${d.name} ${icon('arrow-right')}</span><b>${next.title}</b></a>
      </div>
      <h2 class="sl-more-h">Keep exploring</h2>
      <div class="grid3">${pick.map(card).join('')}</div>`;
    return sec;
  }

  function decorateProgress() {
    const p = progress();
    document.querySelectorAll('a.card[href$=".html"], a.mlink[href$=".html"]').forEach(a => {
      const id = a.getAttribute('href').replace('.html', ''), e = p[id];
      if (!e || a.querySelector('.sl-done')) return;
      const t = document.createElement('span'); t.className = 'sl-done';
      t.title = e.q ? `Best quiz score ${e.q[0]}/${e.q[1]}` : 'Visited';
      t.innerHTML = icon(e.q && e.q[0] === e.q[1] ? 'award' : 'check') + (e.q ? `<i>${e.q[0]}/${e.q[1]}</i>` : '');
      a.appendChild(t);
    });
    refreshIcons();
  }

  /* ---------------- Department-themed animated hero backgrounds ---------------- */
  function heroFx(sec) {
    const cv = sec.querySelector('.hero-fx'); if (!cv) return;
    const dept = sec.dataset.fx, st = canvas(cv), reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const acc = getComputedStyle(document.body).getPropertyValue('--accent').trim() || '#7c5cff';
    const rnd = (a, b) => a + Math.random() * (b - a);
    const pts = Array.from({ length: 40 }, () => ({ x: Math.random(), y: Math.random(), v: rnd(.2, 1), p: Math.random() * 6.28 }));
    const draw = t => {
      const { ctx, w, h } = st; if (!w) return; ctx.clearRect(0, 0, w, h);
      const x0 = w * 0.45; ctx.save(); ctx.globalAlpha = .55; ctx.strokeStyle = acc; ctx.fillStyle = acc; ctx.lineWidth = 1.2;
      const fade = ctx.createLinearGradient(x0, 0, w, 0); fade.addColorStop(0, 'rgba(0,0,0,0)'); fade.addColorStop(.35, acc); fade.addColorStop(1, acc);
      ctx.strokeStyle = fade; ctx.fillStyle = fade;
      if (dept === 'engineering') {
        [[.72, .45, 70, 18, 1], [.86, .28, 44, 12, -1.5], [.9, .78, 56, 14, -1.29]].forEach(([cx, cy, r, z, sp]) => {
          const X = w * cx, Y = h * cy, a0 = t * .25 * sp; ctx.beginPath();
          for (let i = 0; i <= z * 4; i++) { const a = a0 + i / (z * 4) * 6.283, rr = (i % 4 === 1 || i % 4 === 2) ? r + 6 : r - 6; ctx.lineTo(X + Math.cos(a) * rr, Y + Math.sin(a) * rr); }
          ctx.stroke(); ctx.beginPath(); ctx.arc(X, Y, r * .25, 0, 7); ctx.stroke();
        });
        ctx.globalAlpha = .18; for (let x = x0; x < w; x += 24) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      } else if (dept === 'physics') {
        for (let k = 0; k < 4; k++) { const v = 1 + k * .25; ctx.beginPath(); for (let i = 0; i <= 60; i++) { const u = i / 60, X = x0 + u * (w - x0) * v * .8, Y = h * .95 - Math.sin(u * Math.PI) * h * (.4 + k * .12); if (X > w) break; i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.stroke(); const u = ((t * .15 + k * .23) % 1); ctx.beginPath(); ctx.arc(x0 + u * (w - x0) * v * .8, h * .95 - Math.sin(u * Math.PI) * h * (.4 + k * .12), 3.5, 0, 7); ctx.fill(); }
      } else if (dept === 'life') {
        const cx = w * .8, n = 22; for (let i = 0; i < n; i++) { const y = i / (n - 1) * h, a = t * .8 + i * .5, dx = Math.cos(a) * 60; ctx.globalAlpha = .25; ctx.beginPath(); ctx.moveTo(cx + dx, y); ctx.lineTo(cx - dx, y); ctx.stroke(); ctx.globalAlpha = .6 + .3 * Math.sin(a); ctx.beginPath(); ctx.arc(cx + dx, y, 3.5, 0, 7); ctx.fill(); ctx.beginPath(); ctx.arc(cx - dx, y, 3.5, 0, 7); ctx.fill(); }
      } else if (dept === 'health') {
        ctx.lineWidth = 2; ctx.beginPath(); const per = 220, sh = (t * 90) % per;
        for (let X = x0; X < w; X += 2) { const u = ((X - x0 + sh) % per) / per; let y = 0; if (u > .3 && u < .34) y = -8; else if (u > .4 && u < .42) y = 10; else if (u > .42 && u < .46) y = -60; else if (u > .46 && u < .49) y = 18; else if (u > .6 && u < .7) y = -14 * Math.sin((u - .6) / .1 * Math.PI); X === x0 ? ctx.moveTo(X, h * .55 + y) : ctx.lineTo(X, h * .55 + y); }
        ctx.stroke();
      } else if (dept === 'chemistry') {
        const ms = [[.75, .4], [.9, .7], [.62, .78]]; ms.forEach(([mx, my], k) => { const X = w * mx, Y = h * my, a = t * .5 + k; const at = [[0, 0], ...[0, 1, 2, 3].map(i => [Math.cos(a + i * 1.57) * 34, Math.sin(a + i * 1.57) * 18])]; at.slice(1).forEach(q => { ctx.beginPath(); ctx.moveTo(X, Y); ctx.lineTo(X + q[0], Y + q[1]); ctx.stroke(); }); at.forEach((q, i) => { ctx.beginPath(); ctx.arc(X + q[0], Y + q[1], i ? 5 : 9, 0, 7); ctx.fill(); }); });
      } else if (dept === 'computing') {
        ctx.font = '12px JetBrains Mono, monospace'; pts.forEach((p, i) => { const X = x0 + p.x * (w - x0), Y = ((p.y * h + t * 30 * p.v) % (h + 20)) - 10; ctx.globalAlpha = .25 + .5 * p.v; ctx.fillText((Math.floor(t * 2 * p.v + i) % 2) ? '1' : '0', X, Y); });
      } else if (dept === 'media') {
        const n = 48, bw = (w - x0) / n; for (let i = 0; i < n; i++) { const v = (Math.sin(t * 3 + i * .45) * .5 + .5) * (Math.sin(t * 1.3 + i * .17) * .4 + .6); const bh = v * h * .6; ctx.globalAlpha = .25 + .5 * v; ctx.fillRect(x0 + i * bw, h * .55 - bh / 2, bw * .55, bh); }
      } else if (dept === 'operations') {
        const cx = w * .8, cy = h * .5, R = Math.min(h * .45, 140); ctx.globalAlpha = .3; for (let i = 1; i <= 3; i++) { ctx.beginPath(); ctx.arc(cx, cy, R * i / 3, 0, 7); ctx.stroke(); }
        const a = t * 1.1; ctx.globalAlpha = .7; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R); ctx.stroke();
        pts.slice(0, 6).forEach(p => { const pa = p.p, d = Math.abs(((a - pa) % 6.283 + 6.283) % 6.283); ctx.globalAlpha = Math.max(.1, 1 - d / 3); ctx.beginPath(); ctx.arc(cx + Math.cos(pa) * R * p.v * .9, cy + Math.sin(pa) * R * p.v * .9, 3, 0, 7); ctx.fill(); });
      } else if (dept === 'earth') {
        for (let k = 1; k <= 7; k++) { ctx.globalAlpha = .12 + k * .06; ctx.beginPath(); for (let i = 0; i <= 80; i++) { const a = i / 80 * 6.283, r = k * 18 * (1 + .18 * Math.sin(a * 3 + t * .3 + k) + .08 * Math.sin(a * 5 - t * .2)); const X = w * .8 + Math.cos(a) * r * 1.4, Y = h * .5 + Math.sin(a) * r; i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.stroke(); }
      } else if (dept === 'business') {
        const n = 26, bw = (w - x0) / n; let v = h * .6; for (let i = 0; i < n; i++) { const o = v, c = v - Math.sin(i * 1.7 + Math.floor(t)) * 18 - 6; const hi = Math.min(o, c) - 8, lo = Math.max(o, c) + 8; ctx.globalAlpha = .55; ctx.beginPath(); ctx.moveTo(x0 + i * bw + bw * .3, hi); ctx.lineTo(x0 + i * bw + bw * .3, lo); ctx.stroke(); ctx.fillRect(x0 + i * bw + bw * .1, Math.min(o, c), bw * .4, Math.abs(c - o) + 1); v = Math.max(h * .2, Math.min(h * .85, c)); }
      }
      ctx.restore();
    };
    if (reduce) { setTimeout(() => draw(0), 50); return; }
    // Decorative only: 20 fps on phones/low-end devices, 30 fps elsewhere, so the lab below gets the CPU.
    const minGap = LOWEND ? 50 : 33; let lastDraw = 0;
    const lp = loop((dt, t) => { const n = performance.now(); if (n - lastDraw < minGap) return; lastDraw = n; draw(t); }).start();
    if ('IntersectionObserver' in window) new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? lp.start() : lp.stop())).observe(sec);
  }

  /* ---------------- Guided tour ---------------- */
  let _tour = null;
  /** Register a guided tour: steps = [{el:'css selector', title, text, before?:fn}] */
  function tour(steps) {
    _tour = steps.filter(Boolean);
    wireTourBtn();
    { const tb = document.getElementById('slTheme'); if (tb) { applyTheme(themeNow()); tb.addEventListener('click', () => applyTheme(themeNow() === 'light' ? 'dark' : 'light', true)); } }
    const key = 'sl-tour-seen-' + (document.body.dataset.page || '');
    let seen = false; try { seen = !!localStorage.getItem(key); } catch (e) {}

    document.addEventListener('click', e => { if (e.target.closest('[data-tour]')) { e.preventDefault(); runTour(); } });
  }
  function wireTourBtn() {
    const b = document.getElementById('slTourBtn');
    if (b && _tour && _tour.length) { b.hidden = false; b.onclick = () => { b.classList.remove('tour-new'); runTour(); }; let seen = false; try { seen = !!localStorage.getItem('sl-tour-seen-' + (document.body.dataset.page || '')); } catch (e) {} if (!seen) b.classList.add('tour-new'); }
  }
  function runTour(start) {
    if (!_tour || !_tour.length) return;
    try { localStorage.setItem('sl-tour-seen-' + (document.body.dataset.page || ''), '1'); } catch (e) {}
    document.querySelectorAll('.sl-tour').forEach(x => x.remove());
    document.querySelectorAll('.toast').forEach(x => { if (x.querySelector('[data-tour]')) x.remove(); });
    let i = start || 0;
    const ov = document.createElement('div'); ov.className = 'sl-tour';
    ov.innerHTML = `<div class="sl-tour-hole"></div><div class="sl-tour-tip" role="dialog" aria-modal="true" aria-labelledby="slTourH" aria-live="polite"><div class="sl-tour-n"></div><h4 id="slTourH"></h4><p></p><div class="btn-row"><button class="btn sm ghost" data-a="skip">Close</button><span style="flex:1"></span><button class="btn sm" data-a="back">Back</button><button class="btn sm primary" data-a="next">Next</button></div></div>`;
    document.body.appendChild(ov);
    const hole = ov.querySelector('.sl-tour-hole'), tip = ov.querySelector('.sl-tour-tip');
    const show = () => {
      const s = _tour[i]; if (s.before) try { s.before(); } catch (e) {}
      const el = s.el && document.querySelector(s.el);
      tip.querySelector('.sl-tour-n').textContent = `Step ${i + 1} of ${_tour.length}`;
      tip.querySelector('h4').textContent = s.title || ''; tip.querySelector('p').innerHTML = s.text || '';
      tip.querySelector('[data-a=back]').disabled = i === 0;
      tip.querySelector('[data-a=next]').textContent = i === _tour.length - 1 ? 'Finish' : 'Next';
      const place = () => {
        if (!el) { hole.style.cssText = 'left:50%;top:40%;width:0;height:0'; tip.style.cssText = 'left:50%;top:40%;transform:translate(-50%,-50%)'; return; }
        const r = el.getBoundingClientRect(), pad = 8;
        hole.style.cssText = `left:${r.left - pad}px;top:${r.top - pad}px;width:${r.width + pad * 2}px;height:${r.height + pad * 2}px`;
        const tw = Math.min(340, innerWidth - 24); tip.style.width = tw + 'px'; const th = tip.offsetHeight || 190, below = r.bottom + 14 + th < innerHeight;
        let left = Math.max(12, Math.min(innerWidth - tw - 12, r.left + r.width / 2 - tw / 2));
        let top = below ? r.bottom + 14 : Math.max(12, r.top - 14 - tip.offsetHeight);
        if (r.height > innerHeight * .6) top = innerHeight - th - 12;
        top = Math.max(12, Math.min(innerHeight - th - 12, top));
        tip.style.cssText = `left:${left}px;top:${top}px;width:${tw}px`;
      };
      if (el) { el.scrollIntoView({ behavior: 'instant', block: 'center' }); requestAnimationFrame(() => requestAnimationFrame(place)); setTimeout(place, 250); } place();
    };
    const onScroll = () => { if (ov.isConnected) { const s = _tour[i], el = s.el && document.querySelector(s.el); if (el) { const r = el.getBoundingClientRect(), pad = 8; hole.style.left = r.left - pad + 'px'; hole.style.top = r.top - pad + 'px'; } } };
    window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', show);
    const end = () => { ov.remove(); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', show); document.removeEventListener('keydown', key); };
    const key = e => { if (e.key === 'Escape') end(); if (e.key === 'ArrowRight') nav(1); if (e.key === 'ArrowLeft') nav(-1); };
    const nav = d => { i += d; if (i < 0) i = 0; if (i >= _tour.length) { end(); toast('Tour complete. Now try the challenges tab.', 'ok'); return; } show(); };
    document.addEventListener('keydown', key);
    ov.addEventListener('click', e => { const a = e.target.closest('[data-a]'); if (!a) { if (e.target === ov) end(); return; } if (a.dataset.a === 'skip') end(); if (a.dataset.a === 'back') nav(-1); if (a.dataset.a === 'next') nav(1); });
    show();
  }

  /* ---------------- Offline support (service worker) ---------------- */
  function offline() {
    if (!('serviceWorker' in navigator) || location.protocol === 'file:') return;
    navigator.serviceWorker.register('sw.js').catch(() => {});
    const b = document.getElementById('slOffline'), msg = document.getElementById('slOfflineMsg'); if (!b) return;
    b.hidden = false;
    let saved = false; try { saved = !!localStorage.getItem('sl-offline-saved'); } catch (e) {}
    if (saved) msg.textContent = 'All labs are saved on this device. They work without internet.';
    else msg.textContent = 'About 6 MB, once. Labs you open are also kept for offline use automatically.';
    b.onclick = () => saveOffline(MODULES.map(m => m.id), b, msg, 'All labs');
  }
  /** Save a set of labs (ids) for offline use; reports progress into msg. */
  async function saveOffline(ids, btn, msg, label) {
    if (!('serviceWorker' in navigator) || location.protocol === 'file:') { if (msg) msg.textContent = 'Offline saving works on the live site.'; return; }
    const reg = await navigator.serviceWorker.ready; if (!reg.active) return;
    const urls = ['index.html', ...ids.map(id => id + '.html'), ...ids.map(id => 'assets/thumbs/' + id + '.webp')];
    if (btn) btn.disabled = true; if (msg) msg.textContent = 'Saving… 0%';
    const on = e => {
      if (!e.data || e.data.type !== 'save-progress' || e.data.total !== urls.length) return;
      if (msg) msg.textContent = `Saving… ${Math.round(e.data.done / e.data.total * 100)}%`;
      if (e.data.done === e.data.total) {
        navigator.serviceWorker.removeEventListener('message', on);
        if (msg) msg.textContent = `Done. ${label} now work without internet on this device.`; if (btn) btn.disabled = false;
        try { localStorage.setItem(ids.length === MODULES.length ? 'sl-offline-saved' : 'sl-offline-' + label, '1'); } catch (er) {}
        toast(`${label} saved for offline use.`, 'ok');
      }
    };
    navigator.serviceWorker.addEventListener('message', on);
    reg.active.postMessage({ type: 'save-all', urls });
  }

  /* ---------------- Mount ---------------- */
  // Keyboard access for wide equations, tables and other horizontally scrolling boxes
  function a11yScroll() {
    document.querySelectorAll('main *').forEach(el => {
      if (el.hasAttribute('tabindex') || el.closest('canvas,svg,button,a')) return;
      const cs = getComputedStyle(el); const ox = /auto|scroll/.test(cs.overflowX) && el.scrollWidth > el.clientWidth, oy = /auto|scroll/.test(cs.overflowY) && el.scrollHeight > el.clientHeight;
      if (!(ox || oy) || el.querySelector('a,button,input,select,textarea,[tabindex]')) return;
      el.tabIndex = 0; if (!el.getAttribute('role')) el.setAttribute('role', 'region'); if (!el.getAttribute('aria-label')) el.setAttribute('aria-label', el.matches('table,.tbl-wrap') || el.querySelector('table') ? 'Table (scrolls sideways)' : 'Scrollable content');
    });
  }
  let a11yT; const a11yLater = () => { clearTimeout(a11yT); a11yT = setTimeout(a11yScroll, 400); };
  window.addEventListener('load', () => { a11yLater(); setTimeout(a11yScroll, 2500); }); window.addEventListener('resize', a11yLater); document.addEventListener('click', e => { if (e.target.closest('[role=tab],.tab,.tabs button')) a11yLater(); });
  function mount() {
    const page = document.body.dataset.page;
    const m = byId[page];
    if (m && !document.body.dataset.dept) document.body.dataset.dept = m.dept;
    const h = document.getElementById('sl-header'); if (h) h.outerHTML = header();
    const mainEl = document.querySelector('main'); if (mainEl) { if (!mainEl.id) mainEl.id = 'main'; const sk = document.createElement('a'); sk.className = 'skip-link'; sk.href = '#' + mainEl.id; sk.textContent = 'Skip to content'; document.body.prepend(sk); }
    const hero = document.getElementById('sl-hero'); if (hero && m) hero.outerHTML = pageHero(m);
    wireTourBtn();
    const pb = document.getElementById('slPresentBtn'), labEl = document.querySelector('main .lab') || (document.querySelector('main .stage') || {}).parentElement;
    if (pb && labEl && document.fullscreenEnabled) {
      pb.hidden = false;
      pb.onclick = () => document.fullscreenElement ? document.exitFullscreen() : labEl.requestFullscreen().catch(() => {});
      document.addEventListener('fullscreenchange', () => { const on = document.fullscreenElement === labEl; pb.setAttribute('aria-pressed', on); labEl.classList.toggle('presenting', on); if (on && !labEl.querySelector('.present-exit')) { const x = document.createElement('button'); x.className = 'btn sm present-exit'; x.innerHTML = icon('minimize-2') + ' Exit (Esc)'; x.onclick = () => document.exitFullscreen(); labEl.prepend(x); refreshIcons(); } if (!on) labEl.querySelectorAll('.present-exit').forEach(e => e.remove()); setTimeout(() => window.dispatchEvent(new Event('resize')), 120); });
    }
    const heroEl = document.querySelector('.page-hero[data-fx]'); if (heroEl) setTimeout(() => heroFx(heroEl), 30);
    const f = document.getElementById('sl-footer');
    if (f && m) f.parentNode.insertBefore(moreLabs(m), f);
    if (f) f.outerHTML = footer();
    if (m) markVisit(m.id);
    if (m) document.title = document.title || `${m.title} · Pentarch SimLab`;
    const showPalette = palette();
    const sb = document.getElementById('slSearchBtn'); if (sb) sb.onclick = showPalette;
    const sm = document.getElementById('slSearchM'); if (sm) sm.onclick = e => { e.preventDefault(); document.getElementById('slHeader').classList.remove('mobile-open'); showPalette(); };
    const hdr = document.getElementById('slHeader');
    const burger = document.getElementById('slBurger');
    if (burger) burger.onclick = () => { hdr.classList.toggle('mobile-open'); burger.setAttribute('aria-expanded', hdr.classList.contains('mobile-open')); };
    document.querySelectorAll('.sl-nav>.item>button').forEach(b => b.addEventListener('click', () => {
      const it = b.parentElement, was = it.classList.contains('open');
      document.querySelectorAll('.sl-nav>.item.open').forEach(x => x.classList.remove('open'));
      if (!was) it.classList.add('open');
      document.querySelectorAll('.sl-nav>.item>button').forEach(x => x.setAttribute('aria-expanded', x.parentElement.classList.contains('open')));
    }));
    document.addEventListener('click', e => { if (!e.target.closest('.sl-nav')) document.querySelectorAll('.sl-nav>.item.open').forEach(x => x.classList.remove('open')); });
    // tabs
    document.querySelectorAll('[data-tabs]').forEach(tabs);
    // reveal on scroll
    const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 }) : null;
    document.querySelectorAll('.reveal').forEach(el => io ? io.observe(el) : el.classList.add('in'));
    // range fill
    document.querySelectorAll('input[type=range]').forEach(rangeFill);
    document.addEventListener('input', e => { if (e.target.type === 'range') rangeFill(e.target); });
    refreshIcons();
    renderMath();
    setTimeout(decorateProgress, 60);
    setTimeout(stickyStages, 900);
    offline();
    document.dispatchEvent(new CustomEvent('sl:ready'));
  }

  /* ---------------- Helpers ---------------- */
  function rangeFill(r) { const min = +r.min || 0, max = +r.max || 100; r.style.setProperty('--p', ((r.value - min) / (max - min) * 100) + '%'); }

  function tabs(root) {
    const btns = root.querySelectorAll(':scope > .tablist > button');
    const panels = root.querySelectorAll(':scope > .tabpanel');
    btns.forEach((b, i) => b.addEventListener('click', () => {
      btns.forEach(x => x.classList.remove('on')); panels.forEach(x => x.classList.remove('on'));
      b.classList.add('on'); if (panels[i]) { panels[i].classList.add('on'); renderMath(panels[i]); }
      root.dispatchEvent(new CustomEvent('tab', { detail: i }));
    }));
    if (!root.querySelector('.tablist > button.on') && btns[0]) { btns[0].classList.add('on'); panels[0] && panels[0].classList.add('on'); }
  }

  /** Render LaTeX with KaTeX auto-render ($...$ inline, $$...$$ display, \( \) and \[ \]). */
  function renderMath(el) {
    const go = () => {
      if (!window.renderMathInElement) return false;
      try {
        window.renderMathInElement(el || document.body, {
          delimiters: [{ left: '$$', right: '$$', display: true }, { left: '\\[', right: '\\]', display: true }, { left: '$', right: '$', display: false }, { left: '\\(', right: '\\)', display: false }],
          throwOnError: false, ignoredClasses: ['no-math'],
        });
      } catch (e) { console.warn(e); }
      return true;
    };
    if (!go()) { let n = 0; const t = setInterval(() => { if (go() || ++n > 40) clearInterval(t); }, 150); }
  }
  /** Render a single TeX string into an element. */
  function tex(el, s, display) {
    if (window.katex) { try { window.katex.render(s, el, { throwOnError: false, displayMode: !!display }); return; } catch (e) {} }
    el.textContent = s;
  }

  /** Bind a range/select/input to a callback; updates a sibling <output>. */
  function bind(sel, cb, fmt) {
    const el = typeof sel === 'string' ? document.querySelector(sel) : sel;
    if (!el) return null;
    const out = el.closest('.ctl') && el.closest('.ctl').querySelector('output');
    const upd = () => { const v = el.type === 'checkbox' ? el.checked : (el.type === 'range' || el.type === 'number' ? parseFloat(el.value) : el.value); if (out) out.textContent = fmt ? fmt(v) : v; cb && cb(v, el); };
    el.addEventListener('input', upd); el.addEventListener('change', upd); upd();
    return el;
  }

  // Phones and low-core devices: draw canvases at most 1.5x so simulations keep real-time speed.
  const LOWEND = (window.matchMedia && matchMedia('(pointer:coarse)').matches) || (navigator.hardwareConcurrency || 8) <= 4;
  /** HiDPI canvas that tracks its container size. onResize(w,h) is called with CSS pixel size. */
  function canvas(cv, onResize) {
    const ctx = cv.getContext('2d');
    const state = { ctx, w: 0, h: 0, dpr: 1 };
    let first = true;
    const fit = () => {
      const r = cv.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, LOWEND ? 1.5 : 2);
      const w = Math.max(1, Math.round(r.width)), h = Math.max(1, Math.round(r.height));
      if (w === state.w && h === state.h && dpr === state.dpr) return;
      cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      Object.assign(state, { w, h, dpr });
      if (!onResize) return;
      // First call is deferred so code like `const st = SL.canvas(cv, () => draw(st))` is safe.
      if (first) { first = false; Promise.resolve().then(() => onResize(state.w, state.h)); } else onResize(w, h);
    };
    if ('ResizeObserver' in window) new ResizeObserver(fit).observe(cv); else window.addEventListener('resize', fit);
    fit();
    return state;
  }

  /** requestAnimationFrame loop with dt in seconds (clamped). Returns {start,stop,running}. */
  function loop(fn) {
    let id = 0, last = 0, running = false;
    const tick = t => { const dt = Math.min(0.05, (t - (last || t)) / 1000); last = t; fn(dt, t / 1000); if (running) id = requestAnimationFrame(tick); };
    return {
      start() { if (!running) { running = true; last = 0; id = requestAnimationFrame(tick); } return this; },
      stop() { running = false; cancelAnimationFrame(id); return this; },
      get running() { return running; },
    };
  }

  function fmt(n, d = 2) {
    if (n === null || n === undefined || !isFinite(n)) return '—';
    const a = Math.abs(n);
    if (a !== 0 && (a >= 1e6 || a < 1e-3)) { const [mm, ee] = n.toExponential(Math.max(1, d - 1)).split('e'); const sup = { '-': '\u207B', '+': '', 0: '\u2070', 1: '\u00B9', 2: '\u00B2', 3: '\u00B3', 4: '\u2074', 5: '\u2075', 6: '\u2076', 7: '\u2077', 8: '\u2078', 9: '\u2079' }; return mm.replace('-', '\u2212') + '\u00D710' + ee.split('').map(c => sup[c] ?? c).join(''); }
    return n.toLocaleString('en', { maximumFractionDigits: d, minimumFractionDigits: 0 }).replace(/^-/, '\u2212');
  }

  function toast(msg, type, ms) {
    let box = document.querySelector('.toasts');
    if (!box) { box = document.createElement('div'); box.className = 'toasts'; document.body.appendChild(box); }
    const t = document.createElement('div'); t.className = 'toast ' + (type || ''); t.innerHTML = msg + '<button class="toast-x" aria-label="Dismiss">\u00D7</button>'; t.querySelector('.toast-x').onclick = () => t.remove();
    box.appendChild(t); setTimeout(() => { t.style.opacity = 0; t.style.transition = '.3s'; setTimeout(() => t.remove(), 300); }, ms || 3800);
  }

  function modal(html, opts) {
    const m = document.createElement('div'); m.className = 'modal show';
    m.innerHTML = `<div class="box">${html}<div class="btn-row" style="margin-top:16px;justify-content:flex-end"><button class="btn primary" data-close>${(opts && opts.ok) || 'Close'}</button></div></div>`;
    document.body.appendChild(m); refreshIcons(m); renderMath(m);
    const close = () => { m.remove(); opts && opts.onClose && opts.onClose(); };
    m.addEventListener('click', e => { if (e.target === m || e.target.closest('[data-close]')) close(); });
    return { el: m, close };
  }

  /** Very small TeX-to-words converter for screen-reader text in quiz options. */
  function texSpeech(str) {
    let t = String(str).replace(/<[^>]+>/g, '');
    t = t.replace(/\$([^$]*)\$/g, (_, m) => ' ' + m
      .replace(/\\frac\{([^}]*)\}\{([^}]*)\}/g, '$1 over $2').replace(/\\sqrt\{([^}]*)\}/g, 'square root of $1')
      .replace(/\^2/g, ' squared').replace(/\^3/g, ' cubed').replace(/\^\{([^}]*)\}/g, ' to the power $1').replace(/\^(\w)/g, ' to the power $1')
      .replace(/_\{([^}]*)\}/g, ' sub $1').replace(/_(\w)/g, ' sub $1')
      .replace(/\\(cdot|times)/g, ' times ').replace(/\\(sin|cos|tan|ln|log|exp)/g, ' $1 ').replace(/\\pi/g, ' pi ')
      .replace(/\\(alpha|beta|gamma|delta|theta|lambda|mu|omega|rho|sigma|tau|phi|Delta|Omega)/g, ' $1 ')
      .replace(/\\(left|right|,|;|!|quad|text|mathrm)/g, ' ').replace(/[{}\\]/g, '').replace(/\s+/g, ' ') + ' ');
    return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').trim();
  }

  /** Quiz: questions = [{q, options:[...], answer:index, why}] */
  /* Quiz. Options are shuffled (unless an option refers to the others, e.g. "all of the above") so the
     right answer is not always in the same slot. Banks of more than 6 questions run as one-at-a-time
     practice sets of 10 with a progress bar, review of mistakes, retry and an exam mode
     (no feedback until the end, 60 s per question). */
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function prepQ(q) {
    const fixed = q.options.some(o => /\b(all|none|both|neither) of (the )?(above|these)|^(both|all|none|neither)\b|\b[A-D] and [A-D]\b/i.test(String(o).replace(/<[^>]+>/g, '')));
    const order = fixed || q.keepOrder ? q.options.map((_, j) => j) : shuffle(q.options.map((_, j) => j));
    return { q: q.q, why: q.why, options: order.map(j => q.options[j]), answer: order.indexOf(q.answer) };
  }
  const optHTML = (o, j) => `<button class="opt" data-j="${j}"><span class="ol">${'ABCDEFG'[j]}</span><span class="ot">${o}${/\$/.test(String(o)) ? `<span class="sr-only">${texSpeech(o)}</span>` : ''}</span></button>`;
  function quiz(container, questions) {
    const el = typeof container === 'string' ? document.querySelector(container) : container;
    if (!el || !questions || !questions.length) return;
    el.classList.add('quiz');
    const page = document.body.dataset.page;
    if (questions.length <= 6) { // short inline quizzes: list view
      const qs = questions.map(prepQ); let score = 0, answered = 0;
      el.innerHTML = qs.map((q, i) => `<div class="q" data-i="${i}"><p>${i + 1}. ${q.q}</p><div class="opts">${q.options.map(optHTML).join('')}</div><div class="why">${q.why || ''}</div></div>`).join('') + `<p class="score"></p>`;
      el.addEventListener('click', e => {
        const b = e.target.closest('.opt'); if (!b || !el.contains(b)) return;
        const qd = b.closest('.q'); if (qd.classList.contains('done')) return;
        const q = qs[+qd.dataset.i], j = +b.dataset.j;
        qd.classList.add('done'); answered++;
        qd.querySelectorAll('.opt')[q.answer].classList.add('right');
        if (j === q.answer) score++; else b.classList.add('wrong');
        if (answered === qs.length && page) markQuiz(page, score, qs.length);
        el.querySelector('.score').textContent = `Score: ${score} / ${answered}${answered === qs.length && score === qs.length ? ' · Perfect score!' : ''}`;
      });
      renderMath(el); return;
    }
    const SET = 10, nSets = Math.ceil(questions.length / SET);
    let exam = false, set = [], idx = 0, picks = [], timer = null, tLeft = 0, setNo = 0, pool = [];
    el.classList.add('qz');
    function newPool() { pool = shuffle(questions.map((_, i) => i)); setNo = 0; }
    function start(indices) {
      clearInterval(timer);
      set = indices.map(i => Object.assign(prepQ(questions[i]), { src: i })); idx = 0; picks = [];
      if (exam) { tLeft = set.length * 60; timer = setInterval(() => { tLeft--; const t = el.querySelector('.qz-time'); if (t) t.textContent = fmtT(tLeft); if (tLeft <= 0) finish(); }, 1000); }
      show();
    }
    const fmtT = s => `${Math.floor(Math.max(0, s) / 60)}:${String(Math.max(0, s) % 60).padStart(2, '0')}`;
    function nextSet() { if (setNo * SET >= pool.length) newPool(); const s = pool.slice(setNo * SET, setNo * SET + SET); setNo++; start(s); }
    function head() {
      const sc = picks.filter((p, i) => p === set[i].answer).length;
      return `<div class="qz-head"><div class="qz-meta"><b>Set ${setNo || 1} of ${nSets}</b> · Question ${Math.min(idx + 1, set.length)} of ${set.length}${exam ? ` · <span class="qz-time">${fmtT(tLeft)}</span>` : ` · Score ${sc}/${picks.length}`}</div>
        <div class="qz-bar"><i style="width:${(picks.length / set.length) * 100}%"></i></div>
        <div class="qz-modes"><button class="chip ${exam ? '' : 'on'}" data-m="practice">Practice</button><button class="chip ${exam ? 'on' : ''}" data-m="exam">Exam mode (timed)</button><span class="qz-bank">${questions.length} questions in this bank</span></div></div>`;
    }
    function show() {
      const q = set[idx], done = picks[idx] !== undefined;
      el.innerHTML = head() + `<div class="q ${done && !exam ? 'done' : ''}"><p>${q.q}</p><div class="opts">${q.options.map(optHTML).join('')}</div><div class="why">${q.why || ''}</div></div>
        <div class="qz-nav"><button class="btn" data-qa="prev" ${idx ? '' : 'disabled'}>Back</button><button class="btn primary" data-qa="next" ${done ? '' : 'disabled'}>${idx === set.length - 1 ? 'Finish set' : 'Next question'}</button></div>`;
      if (done) { const os = el.querySelectorAll('.q .opt'); if (exam) os[picks[idx]].classList.add('sel'); else { os[q.answer].classList.add('right'); if (picks[idx] !== q.answer) os[picks[idx]].classList.add('wrong'); } }
      renderMath(el); refreshIcons();
    }
    function finish() {
      clearInterval(timer);
      const sc = set.reduce((s, q, i) => s + (picks[i] === q.answer ? 1 : 0), 0), pct = Math.round(100 * sc / set.length);
      if (page) markQuiz(page, sc, set.length);
      const wrong = set.map((q, i) => ({ q, i })).filter(o => picks[o.i] !== o.q.answer);
      el.innerHTML = `<div class="qz-end"><div class="qz-score ${pct >= 70 ? 'ok' : ''}">${sc}/${set.length}<small>${pct}%</small></div><p>${pct >= 90 ? 'Excellent: exam ready on this set.' : pct >= 70 ? 'Good pass. Review the ones you missed below.' : 'Keep going: read each explanation below, then retry.'}</p>
        <div class="btn-row"><button class="btn primary" data-qa="nextset">Next set</button>${wrong.length ? '<button class="btn" data-qa="retry">Retry the ones I missed</button>' : ''}<button class="btn" data-qa="restart">Start over (new shuffle)</button></div></div>
        <div class="qz-review">${set.map((q, i) => { const ok = picks[i] === q.answer; return `<div class="q done"><p>${ok ? '✓' : '✗'} ${q.q}</p><div class="opts">${q.options.map((o, j) => `<div class="opt ${j === q.answer ? 'right' : (j === picks[i] ? 'wrong' : '')}"><span class="ol">${'ABCDEFG'[j]}</span><span class="ot">${o}</span></div>`).join('')}</div><div class="why">${q.why || ''}</div></div>`; }).join('')}</div>`;
      el._wrong = wrong.map(o => o.q.src); renderMath(el);
    }
    el.addEventListener('click', e => {
      const m = e.target.closest('[data-m]'); if (m && el.contains(m)) { exam = m.dataset.m === 'exam'; newPool(); nextSet(); return; }
      const a = e.target.closest('[data-qa]');
      if (a && el.contains(a)) {
        const act = a.dataset.qa;
        if (act === 'prev' && idx > 0) { idx--; show(); }
        else if (act === 'next') { if (idx < set.length - 1) { idx++; show(); } else finish(); }
        else if (act === 'nextset') nextSet();
        else if (act === 'retry') start(el._wrong || []);
        else if (act === 'restart') { newPool(); nextSet(); }
        if (act !== 'prev') el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        return;
      }
      const b = e.target.closest('button.opt'); if (!b || !el.contains(b)) return;
      if (picks[idx] !== undefined && !exam) return;
      picks[idx] = +b.dataset.j; show();
      if (exam && idx < set.length - 1) setTimeout(() => { if (picks[idx] !== undefined) { idx++; show(); } }, 250);
    });
    newPool(); nextSet();
  }

  /** Lazily create a shared AudioContext (must be called from a user gesture first time). */
  let _ac = null;
  function audio() { if (!_ac) { const C = window.AudioContext || window.webkitAudioContext; _ac = C ? new C() : null; } if (_ac && _ac.state === 'suspended') _ac.resume(); return _ac; }

  // Small numeric helpers
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const deg = r => r * 180 / Math.PI, rad = d => d * Math.PI / 180;
  function cssVar(name, el) { return getComputedStyle(el || document.body).getPropertyValue(name).trim(); }
  /** Pointer helper: returns {x,y} in CSS pixels relative to element */
  function ptr(e, el) { const r = el.getBoundingClientRect(); const p = e.touches ? e.touches[0] : e; return { x: p.clientX - r.left, y: p.clientY - r.top }; }
  /** Draw an arrow on a 2D context */
  function arrow(ctx, x1, y1, x2, y2, color, w, head) {
    const a = Math.atan2(y2 - y1, x2 - x1), hl = head || 9;
    ctx.save(); ctx.strokeStyle = ctx.fillStyle = color || '#fff'; ctx.lineWidth = w || 2;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - hl * Math.cos(a - .4), y2 - hl * Math.sin(a - .4)); ctx.lineTo(x2 - hl * Math.cos(a + .4), y2 - hl * Math.sin(a + .4)); ctx.closePath(); ctx.fill(); ctx.restore();
  }
  /** Round axis ticks: returns {lo, hi, step} covering [a,b] with ~n steps of 1/2/2.5/5×10^k */
  function niceRange(a, b, n) {
    if (!isFinite(a) || !isFinite(b)) return { lo: 0, hi: 1, step: .2 };
    if (a === b) { a -= 1; b += 1; }
    const raw = (b - a) / (n || 5), mag = Math.pow(10, Math.floor(Math.log10(raw))), r = raw / mag;
    const step = (r <= 1 ? 1 : r <= 2 ? 2 : r <= 2.5 ? 2.5 : r <= 5 ? 5 : 10) * mag;
    return { lo: Math.floor(a / step + 1e-9) * step, hi: Math.ceil(b / step - 1e-9) * step, step };
  }
  /** Simple line chart into a canvas state {ctx,w,h}: series=[{data:[[x,y]...], color, label}]. Pass nice:false to keep exact limits. */
  function chart(st, series, o) {
    o = Object.assign({ pad: [28, 14, 34, 50], grid: true, xlabel: '', ylabel: '', nice: true }, o || {});
    const { ctx, w, h } = st, [pt, pr, pb, pl] = o.pad;
    let xs = [], ys = []; series.forEach(s => s.data.forEach(p => { if (isFinite(p[0])) xs.push(p[0]); if (isFinite(p[1])) ys.push(p[1]); }));
    let xmin = o.xmin ?? Math.min(...xs), xmax = o.xmax ?? Math.max(...xs);
    let ymin = o.ymin ?? Math.min(...ys), ymax = o.ymax ?? Math.max(...ys); if (ymin === ymax) { ymin -= 1; ymax += 1; }
    let ystep = (ymax - ymin) / 4, xstep = (xmax - xmin) / 5;
    if (o.nice) {
      const ny = niceRange(ymin, ymax, 4); if (o.ymin === undefined) ymin = ny.lo; if (o.ymax === undefined) ymax = ny.hi; ystep = ny.step;
      const nx = niceRange(xmin, xmax, 5); xstep = nx.step;
    }
    const X = x => pl + (x - xmin) / (xmax - xmin || 1) * (w - pl - pr), Y = y => h - pb - (y - ymin) / (ymax - ymin) * (h - pt - pb);
    const dec = s => Math.max(0, Math.min(4, -Math.floor(Math.log10(s) + 1e-9) + (s / Math.pow(10, Math.floor(Math.log10(s))) === 2.5 ? 1 : 0)));
    ctx.clearRect(0, 0, w, h);
    ctx.font = '11px JetBrains Mono, monospace'; ctx.fillStyle = '#5f6d8a'; ctx.strokeStyle = 'rgba(255,255,255,.07)'; ctx.lineWidth = 1;
    const yd = dec(ystep), xd = dec(xstep);
    for (let yv = Math.ceil(ymin / ystep - 1e-9) * ystep; yv <= ymax + ystep * 1e-6; yv += ystep) { const y = Y(yv); ctx.beginPath(); ctx.moveTo(pl, y); ctx.lineTo(w - pr, y); ctx.stroke(); ctx.textAlign = 'right'; ctx.fillText(fmt(Math.abs(yv) < ystep * 1e-6 ? 0 : yv, yd), pl - 6, y + 4); }
    for (let xv = Math.ceil(xmin / xstep - 1e-9) * xstep; xv <= xmax + xstep * 1e-6; xv += xstep) { const x = X(xv); ctx.textAlign = 'center'; ctx.fillText(fmt(Math.abs(xv) < xstep * 1e-6 ? 0 : xv, xd), x, h - pb + 15); }
    if (o.xlabel) { ctx.textAlign = 'center'; ctx.fillText(o.xlabel, pl + (w - pl - pr) / 2, h - 3); }
    if (o.ylabel) { ctx.save(); ctx.translate(11, pt + (h - pt - pb) / 2); ctx.rotate(-Math.PI / 2); ctx.textAlign = 'center'; ctx.fillText(o.ylabel, 0, 0); ctx.restore(); }
    ctx.save(); ctx.beginPath(); ctx.rect(pl, pt - 2, w - pl - pr, h - pt - pb + 4); ctx.clip();
    series.forEach(s => { ctx.strokeStyle = s.color || '#22d3ee'; ctx.lineWidth = s.width || 2; ctx.setLineDash(s.dash || []); ctx.beginPath(); let pen = false; s.data.forEach(p => { if (!isFinite(p[0]) || !isFinite(p[1])) { pen = false; return; } pen ? ctx.lineTo(X(p[0]), Y(p[1])) : ctx.moveTo(X(p[0]), Y(p[1])); pen = true; }); ctx.stroke(); ctx.setLineDash([]); });
    ctx.restore();
    let lx = w - pr; ctx.textAlign = 'left'; series.filter(s => s.label).reverse().forEach(s => { lx -= ctx.measureText(s.label).width + 30; ctx.fillStyle = s.color; ctx.fillRect(lx, pt - 16, 10, 3); ctx.fillStyle = '#93a1bd'; ctx.fillText(s.label, lx + 14, pt - 12); });
    return { X, Y };
  }

  /** On desktop, keep the simulation in view while the student scrolls a long control column. */
  function stickyStages() {
    if (window.innerWidth < 981) return;
    document.querySelectorAll('.lab').forEach(lab => {
      const a = lab.children[0], b = lab.children[1]; if (!a || !b) return;
      const ha = a.getBoundingClientRect().height, hb = b.getBoundingClientRect().height;
      if (hb > ha + 120 && ha < window.innerHeight - 100) a.classList.add('sl-sticky');
    });
  }

  window.SL = { matches, saveOffline, tour, runTour, niceRange, DEPTS, MODULES, byId, deptById, icon, refreshIcons, bind, canvas, loop, fmt, toast, modal, quiz, audio, clamp, lerp, deg, rad, cssVar, ptr, arrow, chart, renderMath, tex, tabs };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
