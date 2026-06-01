/* ══════════════════════════════════════════════════════════════════
   Rack4Master Pro Easy — Internacionalización (i18n)
   Idiomas: Español (es) · English (en) · Català (ca)
   ══════════════════════════════════════════════════════════════════ */

const TRANSLATIONS = {

  /* ── ESPAÑOL ─────────────────────────────────────────────────── */
  es:{
    // Header
    'header.eye':  'AI MASTERING ENGINE · TIEMPO REAL',
    'header.sub':  'HPF → EQ− → SAT → COMP → EQ+ → WIDTH → LIMIT · Controles en tiempo real',

    // Upload
    'upload.title':'Arrastra tu mezcla aquí',
    'upload.sub':  'o haz clic para seleccionar',
    'upload.types':'MP3 · WAV · FLAC · AAC · OGG · M4A',
    'upload.help': '? Ayuda',

    // Loading
    'loading.title':'Analizando y calculando settings…',

    // File bar
    'filebar.change':'Cambiar',
    'filebar.help':  '? Ayuda',
    'filebar.live':  'LIVE MASTER',
    'filebar.orig':  '▶ ORIGINAL',

    // Sections
    'section.analysis.before':'ANÁLISIS — comparación calculándose…',
    'section.analysis.after': 'ANÁLISIS — ANTES / DESPUÉS',
    'section.chain':  'CADENA DE MÓDULOS — controles en tiempo real',
    'section.realtime':'ANALIZADOR EN TIEMPO REAL',
    'section.timeline':'LÍNEA DE TIEMPO',
    'section.realtime.hint':'▶ Masterizado para ver en vivo',

    // Spectrum legend
    'spectrum.legend':'Línea azul <span style="color:#55aaff">- - -</span> = target pop-rock &nbsp;·&nbsp; número = diferencia al target',
    'spectrum.legend.ab':'<strong style="color:#e8eaf8">A</strong> barra color = original &nbsp;·&nbsp; <strong style="color:#e8eaf8">B</strong> barra blanca = masterizado &nbsp;·&nbsp;',

    // Metrics
    'metric.lufs':    'LUFS-I',
    'metric.tp':      'TRUE PEAK',
    'metric.dr':      'RANG. DIN.',
    'metric.corr':    'CORRELAC.',
    'metric.dur':     'DURACIÓN',
    'metric.tp.ok':   '✓ OK para streaming',
    'metric.tp.warn': '⚠ supera −1 dBTP',
    'metric.tp.calc': 'calculando…',

    // Buttons
    'btn.mastered.play': '⏸ Masterizado',
    'btn.mastered.stop': '▶ Masterizado',
    'btn.original.play': '⏸ Original',
    'btn.original.stop': '▶ Original',
    'btn.loop':    '⟳ Loop',
    'btn.export':  '⬇ WAV',
    'btn.export.working':'⏳ Exportando…',
    'btn.reset':   '↺ Reset',

    // Tip texts in actions bar
    'tip.rt':  '<strong>Tiempo real:</strong> arrastra los nodos de EQ o mueve sliders mientras escuchas.',
    'tip.ab':  '<strong>A/B:</strong> ajusta en A, pulsa B para crear variante y compara. &nbsp;·&nbsp; <strong>?</strong> = ayuda &nbsp;·&nbsp; <strong>↺</strong> = reset módulo',

    // getIssues
    'issue.levelLow':  'Nivel bajo ({lufs} LUFS) → el master añadirá ganancia hacia -14 LUFS',
    'issue.levelHigh': 'Nivel muy alto ({lufs} LUFS) → revisa clipping antes de masterizar',
    'issue.drLow':     'DR muy bajo ({dr} dB) → compresor desactivado automáticamente, saturación mínima',
    'issue.drMid':     'DR bajo ({dr} dB) → compresor suavizado a ratio {ratio}:1, saturación reducida',
    'issue.clipping':  'Clipping detectado en el original ({count} muestras) — masterizar no restaura señal recortada',
    'issue.tp':        'True Peak original alto ({tp} dBTP) → ceiling del limiter ajustado a {ceil} dBFS',
    'issue.monoWide':  'Audio casi mono → stereo width ampliará el campo lateral',
    'issue.phaseWarn': 'Correlación muy baja — posibles problemas de fase. Verifica en mono.',
    'issue.hpfRaised': 'Exceso de sub detectado → HPF subido a {freq} Hz automáticamente',

    // Errors
    'err.decode':  'No se pudo decodificar el audio. Prueba MP3, WAV o FLAC.',
    'err.export':  'Error al exportar: ',
    'err.preset':  'Error al cargar preset: ',

    // Live spectrum legend
    'live.legend.spectrum': 'Espectro',
    'live.legend.eqsub':    'EQ Correctiva',
    'live.legend.eqadd':    'EQ Tonal',
    'live.legend.drag':     '↕↔ nodos arrastrables',

    // Hamburger menu
    'menu.help': '📖 Ayuda',
    'menu.lang': 'Idioma',

    // Footer
    'footer.copy':    '© 2026 Rack4Master. Francesc Llorens.',
    'footer.local':   'Sin datos almacenados ni rastreados.',
    'footer.privacy': 'Privacidad',
    'footer.legal':   'Aviso legal',
    'footer.terms':   'Términos',
    'footer.contact': 'Contacto',

    // Modals
    'modal.privacy.title': 'Política de Privacidad',
    'modal.privacy.body':  `<p>Rack4Master Pro Easy se ejecuta <strong>completamente en tu navegador</strong>. Ningún archivo de audio, configuración ni dato personal se envía jamás a ningún servidor.</p>
<p>No se utilizan cookies de seguimiento. No existe ningún sistema de analítica, telemetría ni rastreo de terceros de ningún tipo.</p>
<p>Tu audio permanece en tu dispositivo en todo momento. Los presets que guardes se descargan como archivos locales en tu sistema.</p>
<p>Si tienes preguntas sobre privacidad, escríbenos a <a href="mailto:rack4master@proton.me" style="color:var(--blue)">rack4master@proton.me</a>.</p>`,

    'modal.legal.title': 'Aviso Legal',
    'modal.legal.body':  `<p>Rack4Master Pro Easy se proporciona <strong>"tal cual"</strong>, sin garantía de ningún tipo, expresa o implícita, incluyendo pero no limitándose a garantías de comerciabilidad, adecuación para un propósito particular o no infracción.</p>
<p>El autor, <strong>Francesc Llorens</strong>, no se hace responsable de daños directos, indirectos, incidentales, especiales o consecuentes derivados del uso o la imposibilidad de uso de esta aplicación.</p>
<p>Los resultados de la masterización dependen íntegramente de la calidad del material de entrada y de los ajustes aplicados. Esta herramienta está concebida como ayuda profesional al mastering, no como sustituto de servicios de masterización profesional.</p>
<p>Todas las marcas y marcas registradas son propiedad de sus respectivos titulares.</p>
<p style="margin-top:14px;color:var(--muted);font-size:13px">© 2026 Rack4Master. Francesc Llorens. &nbsp;·&nbsp; <a href="mailto:rack4master@proton.me" style="color:var(--blue)">rack4master@proton.me</a></p>`,

    'modal.terms.title': 'Términos de Uso',
    'modal.terms.body':  `<p>Al utilizar Rack4Master Pro Easy, aceptas los siguientes términos:</p>
<ol style="margin:10px 0 0 20px;line-height:2">
<li>La aplicación es de <strong>uso gratuito</strong> para proyectos de audio personales y comerciales.</li>
<li>El audio que procesas y los masters resultantes siguen siendo <strong>tu propiedad intelectual</strong>.</li>
<li>El autor se reserva el derecho de modificar, actualizar o descontinuar la aplicación en cualquier momento sin previo aviso.</li>
<li>Rack4Master Pro Easy no es responsable de ningún efecto no deseado sobre tus archivos de audio.</li>
<li>La redistribución de la aplicación requiere permiso explícito del autor.</li>
</ol>
<p style="margin-top:14px">Contacto: <a href="mailto:rack4master@proton.me" style="color:var(--blue)">rack4master@proton.me</a></p>`,
  },

  /* ── ENGLISH ──────────────────────────────────────────────────── */
  en:{
    'header.eye':  'AI MASTERING ENGINE · REAL-TIME',
    'header.sub':  'HPF → EQ− → SAT → COMP → EQ+ → WIDTH → LIMIT · Real-time controls',

    'upload.title':'Drop your mix here',
    'upload.sub':  'or click to select',
    'upload.types':'MP3 · WAV · FLAC · AAC · OGG · M4A',
    'upload.help': '? Help',

    'loading.title':'Analysing and calculating settings…',

    'filebar.change':'Change',
    'filebar.help':  '? Help',
    'filebar.live':  'LIVE MASTER',
    'filebar.orig':  '▶ ORIGINAL',

    'section.analysis.before':'ANALYSIS — comparison being calculated…',
    'section.analysis.after': 'ANALYSIS — BEFORE / AFTER',
    'section.chain':  'MODULE CHAIN — real-time controls',
    'section.realtime':'REAL-TIME ANALYZER',
    'section.timeline':'TIMELINE',
    'section.realtime.hint':'▶ Mastered to see live',

    'spectrum.legend':'Blue line <span style="color:#55aaff">- - -</span> = pop-rock target &nbsp;·&nbsp; number = difference to target',
    'spectrum.legend.ab':'<strong style="color:#e8eaf8">A</strong> coloured bar = original &nbsp;·&nbsp; <strong style="color:#e8eaf8">B</strong> white bar = mastered &nbsp;·&nbsp;',

    'metric.lufs':    'LUFS-I',
    'metric.tp':      'TRUE PEAK',
    'metric.dr':      'DYN. RANGE',
    'metric.corr':    'CORRELAT.',
    'metric.dur':     'DURATION',
    'metric.tp.ok':   '✓ OK for streaming',
    'metric.tp.warn': '⚠ exceeds −1 dBTP',
    'metric.tp.calc': 'calculating…',

    'btn.mastered.play': '⏸ Mastered',
    'btn.mastered.stop': '▶ Mastered',
    'btn.original.play': '⏸ Original',
    'btn.original.stop': '▶ Original',
    'btn.loop':    '⟳ Loop',
    'btn.export':  '⬇ WAV',
    'btn.export.working':'⏳ Exporting…',
    'btn.reset':   '↺ Reset',

    'tip.rt':  '<strong>Real-time:</strong> drag EQ nodes or move sliders while listening.',
    'tip.ab':  '<strong>A/B:</strong> adjust in A, press B to create a variant and compare. &nbsp;·&nbsp; <strong>?</strong> = help &nbsp;·&nbsp; <strong>↺</strong> = reset module',

    'issue.levelLow':  'Low level ({lufs} LUFS) → master will add gain toward -14 LUFS',
    'issue.levelHigh': 'Very high level ({lufs} LUFS) → check for clipping before mastering',
    'issue.drLow':     'Very low DR ({dr} dB) → compressor disabled automatically, minimal saturation',
    'issue.drMid':     'Low DR ({dr} dB) → compressor softened to ratio {ratio}:1, saturation reduced',
    'issue.clipping':  'Clipping detected in original ({count} samples) — mastering cannot restore clipped signal',
    'issue.tp':        'High original True Peak ({tp} dBTP) → limiter ceiling set to {ceil} dBFS',
    'issue.monoWide':  'Almost mono audio → stereo width will expand the stereo field',
    'issue.phaseWarn': 'Very low correlation — possible phase issues. Verify in mono.',
    'issue.hpfRaised': 'Excess sub detected → HPF raised to {freq} Hz automatically',

    'err.decode':  'Could not decode audio. Try MP3, WAV or FLAC.',
    'err.export':  'Export error: ',
    'err.preset':  'Error loading preset: ',

    'live.legend.spectrum': 'Spectrum',
    'live.legend.eqsub':    'Corrective EQ',
    'live.legend.eqadd':    'Tonal EQ',
    'live.legend.drag':     '↕↔ draggable nodes',

    'menu.help': '📖 Help',
    'menu.lang': 'Language',

    'footer.copy':    '© 2026 Rack4Master. Francesc Llorens.',
    'footer.local':   'Runs locally. No data stored or tracked.',
    'footer.privacy': 'Privacy',
    'footer.legal':   'Legal',
    'footer.terms':   'Terms',
    'footer.contact': 'Contact',

    'modal.privacy.title': 'Privacy Policy',
    'modal.privacy.body':  `<p>Rack4Master Pro Easy runs <strong>entirely in your browser</strong>. No audio files, settings, or personal data are ever sent to any server.</p>
<p>No tracking cookies are used. No analytics, telemetry, or third-party tracking of any kind is employed.</p>
<p>Your audio stays on your device at all times. Presets you save are downloaded as local files to your system.</p>
<p>If you have privacy questions, contact us at <a href="mailto:rack4master@proton.me" style="color:var(--blue)">rack4master@proton.me</a>.</p>`,

    'modal.legal.title': 'Legal Notice',
    'modal.legal.body':  `<p>Rack4Master Pro Easy is provided <strong>"as is"</strong>, without warranty of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>
<p>The author, <strong>Francesc Llorens</strong>, shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from the use or inability to use this application.</p>
<p>Mastering results depend entirely on the quality of the input material and the settings applied. This tool is intended as a professional mastering aid, not a substitute for professional mastering services.</p>
<p>All trademarks and registered trademarks are the property of their respective owners.</p>
<p style="margin-top:14px;color:var(--muted);font-size:13px">© 2026 Rack4Master. Francesc Llorens. &nbsp;·&nbsp; <a href="mailto:rack4master@proton.me" style="color:var(--blue)">rack4master@proton.me</a></p>`,

    'modal.terms.title': 'Terms of Use',
    'modal.terms.body':  `<p>By using Rack4Master Pro Easy, you agree to the following:</p>
<ol style="margin:10px 0 0 20px;line-height:2">
<li>The application is <strong>free to use</strong> for personal and commercial audio projects.</li>
<li>The audio you process and the resulting masters remain <strong>your intellectual property</strong>.</li>
<li>The author reserves the right to modify, update, or discontinue the application at any time without prior notice.</li>
<li>Rack4Master Pro Easy is not responsible for any unintended effects on your audio files.</li>
<li>Redistribution of the application requires explicit permission from the author.</li>
</ol>
<p style="margin-top:14px">Contact: <a href="mailto:rack4master@proton.me" style="color:var(--blue)">rack4master@proton.me</a></p>`,
  },

  /* ── CATALÀ ───────────────────────────────────────────────────── */
  ca:{
    'header.eye':  'AI MASTERING ENGINE · TEMPS REAL',
    'header.sub':  'HPF → EQ− → SAT → COMP → EQ+ → WIDTH → LIMIT · Controls en temps real',

    'upload.title':'Arrossega la teva mescla aquí',
    'upload.sub':  "o fes clic per seleccionar",
    'upload.types':'MP3 · WAV · FLAC · AAC · OGG · M4A',
    'upload.help': '? Ajuda',

    'loading.title':'Analitzant i calculant ajustos…',

    'filebar.change':'Canviar',
    'filebar.help':  '? Ajuda',
    'filebar.live':  'EN DIRECTE',
    'filebar.orig':  '▶ ORIGINAL',

    'section.analysis.before':'ANÀLISI — comparació en procés…',
    'section.analysis.after': 'ANÀLISI — ABANS / DESPRÉS',
    'section.chain':  'CADENA DE MÒDULS — controls en temps real',
    'section.realtime':'ANALITZADOR EN TEMPS REAL',
    'section.timeline':'LÍNIA DE TEMPS',
    'section.realtime.hint':'▶ Masteritzat per veure en directe',

    'spectrum.legend':'Línia blava <span style="color:#55aaff">- - -</span> = target pop-rock &nbsp;·&nbsp; número = diferència al target',
    'spectrum.legend.ab':'<strong style="color:#e8eaf8">A</strong> barra color = original &nbsp;·&nbsp; <strong style="color:#e8eaf8">B</strong> barra blanca = masteritzat &nbsp;·&nbsp;',

    'metric.lufs':    'LUFS-I',
    'metric.tp':      'TRUE PEAK',
    'metric.dr':      'RANG DIN.',
    'metric.corr':    'CORRELAC.',
    'metric.dur':     'DURADA',
    'metric.tp.ok':   '✓ OK per streaming',
    'metric.tp.warn': '⚠ supera −1 dBTP',
    'metric.tp.calc': 'calculant…',

    'btn.mastered.play': '⏸ Masteritzat',
    'btn.mastered.stop': '▶ Masteritzat',
    'btn.original.play': '⏸ Original',
    'btn.original.stop': '▶ Original',
    'btn.loop':    '⟳ Loop',
    'btn.export':  '⬇ WAV',
    'btn.export.working':'⏳ Exportant…',
    'btn.reset':   '↺ Reset',

    'tip.rt':  '<strong>Temps real:</strong> arrossega els nodes de EQ o mou els sliders mentre escoltres.',
    'tip.ab':  "<strong>A/B:</strong> ajusta a A, prem B per crear una variant i compara. &nbsp;·&nbsp; <strong>?</strong> = ajuda &nbsp;·&nbsp; <strong>↺</strong> = reset mòdul",

    'issue.levelLow':  'Nivell baix ({lufs} LUFS) → el master afegirà guany cap a -14 LUFS',
    'issue.levelHigh': 'Nivell molt alt ({lufs} LUFS) → comprova el clipping abans de masteritzar',
    'issue.drLow':     'DR molt baix ({dr} dB) → compressor desactivat automàticament, saturació mínima',
    'issue.drMid':     'DR baix ({dr} dB) → compressor suavitzat a ratio {ratio}:1, saturació reduïda',
    'issue.clipping':  "Clipping detectat a l'original ({count} mostres) — el mastering no restaura senyal retallada",
    'issue.tp':        'True Peak original alt ({tp} dBTP) → ceiling del limiter ajustat a {ceil} dBFS',
    'issue.monoWide':  "Àudio quasi mono → l'amplada estèreo ampliarà el camp lateral",
    'issue.phaseWarn': 'Correlació molt baixa — possibles problemes de fase. Verifica en mono.',
    'issue.hpfRaised': 'Excés de sub detectat → HPF pujat a {freq} Hz automàticament',

    'err.decode':  "No s'ha pogut descodificar l'àudio. Prova MP3, WAV o FLAC.",
    'err.export':  'Error en exportar: ',
    'err.preset':  'Error en carregar el preset: ',

    'live.legend.spectrum': 'Espectre',
    'live.legend.eqsub':    'EQ Correctiva',
    'live.legend.eqadd':    'EQ Tonal',
    'live.legend.drag':     '↕↔ nodes arrossegables',

    'menu.help': '📖 Ajuda',
    'menu.lang': 'Idioma',

    'footer.copy':    '© 2026 Rack4Master. Francesc Llorens.',
    'footer.local':   "Sense dades emmagatzemades ni rastreig.",
    'footer.privacy': 'Privadesa',
    'footer.legal':   'Avís legal',
    'footer.terms':   "Termes d'ús",
    'footer.contact': 'Contacte',

    'modal.privacy.title': 'Política de Privadesa',
    'modal.privacy.body':  `<p>Rack4Master Pro Easy s'executa <strong>completament al teu navegador</strong>. Cap fitxer d'àudio, configuració ni dada personal no s'envia mai a cap servidor.</p>
<p>No s'utilitzen galetes de seguiment. No s'empra cap sistema d'analítica, telemetria ni rastreig de tercers de cap mena.</p>
<p>El teu àudio roman al teu dispositiu en tot moment. Els presets que desis es descarreguen com a fitxers locals al teu sistema.</p>
<p>Si tens preguntes sobre privadesa, contacta'ns a <a href="mailto:rack4master@proton.me" style="color:var(--blue)">rack4master@proton.me</a>.</p>`,

    'modal.legal.title': 'Avís Legal',
    'modal.legal.body':  `<p>Rack4Master Pro Easy es proporciona <strong>"tal com és"</strong>, sense garantia de cap mena, expressa o implícita, incloent però no limitant-se a garanties de comerciabilitat, adequació per a un propòsit particular o no infracció.</p>
<p>L'autor, <strong>Francesc Llorens</strong>, no es fa responsable de cap dany directe, indirecte, incidental, especial o conseqüent derivat de l'ús o la impossibilitat d'ús d'aquesta aplicació.</p>
<p>Els resultats de la masterització depenen íntegrament de la qualitat del material d'entrada i dels ajustos aplicats. Aquesta eina s'ha concebut com a ajuda professional al mastering, no com a substitut de serveis professionals de masterització.</p>
<p>Totes les marques i marques registrades són propietat dels seus respectius titulars.</p>
<p style="margin-top:14px;color:var(--muted);font-size:13px">© 2026 Rack4Master. Francesc Llorens. &nbsp;·&nbsp; <a href="mailto:rack4master@proton.me" style="color:var(--blue)">rack4master@proton.me</a></p>`,

    'modal.terms.title': "Termes d'Ús",
    'modal.terms.body':  `<p>En utilitzar Rack4Master Pro Easy, acceptes els termes següents:</p>
<ol style="margin:10px 0 0 20px;line-height:2">
<li>L'aplicació és d'<strong>ús gratuït</strong> per a projectes d'àudio personals i comercials.</li>
<li>L'àudio que processa i els màsters resultants segueixen sent <strong>la teva propietat intel·lectual</strong>.</li>
<li>L'autor es reserva el dret de modificar, actualitzar o discontinuar l'aplicació en qualsevol moment sense avís previ.</li>
<li>Rack4Master Pro Easy no és responsable de cap efecte no desitjat sobre els teus fitxers d'àudio.</li>
<li>La redistribució de l'aplicació requereix permís explícit de l'autor.</li>
</ol>
<p style="margin-top:14px">Contacte: <a href="mailto:rack4master@proton.me" style="color:var(--blue)">rack4master@proton.me</a></p>`,
  },
};

/* ── Core i18n functions ─────────────────────────────────────── */

let _lang = localStorage.getItem('r4m_lang') || 'es';

function t(key, params){
  let str = TRANSLATIONS[_lang]?.[key] ?? TRANSLATIONS['es']?.[key] ?? key;
  if(params) Object.entries(params).forEach(([k,v])=>{ str = str.replace(`{${k}}`,v); });
  return str;
}

function setLang(lang){
  if(!TRANSLATIONS[lang]) return;
  _lang = lang;
  localStorage.setItem('r4m_lang', lang);
  document.documentElement.lang = lang;
  applyI18n();
  if(typeof render === 'function') render();
}

function applyI18n(){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const v = t(el.dataset.i18n);
    if(v) el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el=>{
    const v = t(el.dataset.i18nHtml);
    if(v) el.innerHTML = v;
  });
  document.querySelectorAll('.lang-btn').forEach(btn=>{
    btn.classList.toggle('active', btn.dataset.lang === _lang);
  });
}

/* ── Footer modal ────────────────────────────────────────────── */

function showFooterModal(type){
  const overlay = document.getElementById('footerModal');
  const title   = document.getElementById('footerModalTitle');
  const body    = document.getElementById('footerModalBody');
  if(!overlay||!title||!body) return;
  title.textContent = t(`modal.${type}.title`);
  body.innerHTML    = t(`modal.${type}.body`);
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function hideFooterModal(){
  const overlay = document.getElementById('footerModal');
  if(overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── DOM Ready ───────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', ()=>{
  document.documentElement.lang = _lang;
  applyI18n();

  // Hamburger
  const hBtn  = document.getElementById('hamburgerBtn');
  const hMenu = document.getElementById('hamburgerMenu');
  if(hBtn && hMenu){
    hBtn.addEventListener('click', e=>{
      e.stopPropagation();
      const open = hMenu.classList.toggle('open');
      hBtn.setAttribute('aria-expanded', open);
    });
    document.addEventListener('click', ()=>{
      hMenu.classList.remove('open');
      hBtn.setAttribute('aria-expanded', 'false');
    });
    hMenu.addEventListener('click', e=>e.stopPropagation());
  }

  // Language buttons
  document.querySelectorAll('.lang-btn').forEach(btn=>{
    btn.addEventListener('click', ()=> setLang(btn.dataset.lang));
  });

  // Footer modal links
  document.querySelectorAll('[data-modal]').forEach(link=>{
    link.addEventListener('click', e=>{ e.preventDefault(); showFooterModal(link.dataset.modal); });
  });

  // Close footer modal
  document.getElementById('footerModalClose')?.addEventListener('click', hideFooterModal);
  document.getElementById('footerModal')?.addEventListener('click', e=>{
    if(e.target === e.currentTarget) hideFooterModal();
  });
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') hideFooterModal(); });
});

// Expose globally so script.js can call t()
window.t = t;
window.setLang = setLang;
