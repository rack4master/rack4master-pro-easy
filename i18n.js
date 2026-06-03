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
    'preset.name.prompt': 'Nombre del preset:',
    'mod.hpf.desc':   'Elimina subsónico (<20 Hz)',
    'mod.eqSub.desc': 'EQ Sustractiva — resonancias',
    'mod.sat.desc':   'Tape warmth — armónicos cálidos',
    'mod.comp.desc':  'Glue compressor — ratio 2:1',
    'mod.eqAdd.desc': 'EQ Aditiva — color y brillo',
    'mod.width.desc': 'Imagen M/S — amplitud estéreo',
    'mod.lim.desc':   'Brick wall — techo -1.0 dBFS',
    'label.hpf.freq':      'Frecuencia de corte',
    'label.eq.click':      'Haz clic en un nodo para seleccionarlo',
    'label.eq.drag.full':  '↕ arrastrar = ganancia · ↔ arrastrar = frecuencia · 🖱 rueda = Q',
    'label.eq.drag.add':   '↕ arrastrar = ganancia · ↔ arrastrar = frecuencia (Lo-Mid / Mid / Hi-Mid) · shelves Sub/Low/High/Air = solo ganancia',
    'label.eq.qTitle':     'Q POR BANDA (anchura del filtro)',
    'label.eq.band':       'Banda',
    'label.sat.amount':    'Calidez (tape warmth)',
    'label.sat.hint':      '0 = digital limpio · 0.8 = saturación intensa',
    'tt.fileReset':    'Cargar otro archivo',
    'tt.specHelp':     '¿Cómo leer este gráfico?',
    'tt.chainOpen':    'Abrir',
    'tt.chainClose':   'Cerrar',
    'tt.chainHelp':    '¿Qué es la cadena?',
    'tt.modHelp':      'Ayuda',
    'tt.modReset':     'Reset al valor calculado',
    'tt.savePreset':   'Guardar preset',
    'tt.loadPreset':   'Cargar preset',
    'tt.realtimeHelp': 'Cómo usar el analizador',
    'tt.timelineHelp': 'Waveform, loop y output gain',
    'tt.abCompare':    'Comparación A/B',
    'tt.bitDepth':     'Profundidad de bits',
    'confirm.reset':   '¿Seguro que quieres cerrar esta sesión?\nSe perderán todos los ajustes actuales.',
    'confirm.abSlotB': '¿Cómo quieres inicializar el slot B?\n\n[Aceptar] → Copiar los ajustes actuales de A\n[Cancelar] → Empezar desde los ajustes originales del análisis',

    // Footer
    'footer.copy':    '© 2026 Rack4Master. Francesc Llorens',
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
    'preset.name.prompt': 'Preset name:',
    // Module descriptions
    'mod.hpf.desc':   'Removes sub-sonic content (<20 Hz)',
    'mod.eqSub.desc': 'Subtractive EQ — resonances and mud',
    'mod.sat.desc':   'Tape warmth — warm harmonics',
    'mod.comp.desc':  'Glue compressor — ratio 2:1',
    'mod.eqAdd.desc': 'Additive EQ — colour and brightness',
    'mod.width.desc': 'M/S image — stereo width',
    'mod.lim.desc':   'Brick wall — ceiling -1.0 dBFS',
    // buildModBody labels
    'label.hpf.freq':      'Cut frequency',
    'label.eq.click':      'Click a node to select it',
    'label.eq.drag.full':  '↕ drag = gain · ↔ drag = frequency · 🖱 wheel = Q',
    'label.eq.drag.add':   '↕ drag = gain · ↔ drag = frequency (Lo-Mid / Mid / Hi-Mid) · shelves Sub/Low/High/Air = gain only',
    'label.eq.qTitle':     'Q PER BAND (filter width)',
    'label.eq.band':       'Band',
    'label.sat.amount':    'Warmth (tape warmth)',
    'label.sat.hint':      '0 = clean digital · 0.8 = intense saturation',
    // Tooltips
    'tt.fileReset':    'Load another file',
    'tt.specHelp':     'How to read this chart?',
    'tt.chainOpen':    'Open',
    'tt.chainClose':   'Close',
    'tt.chainHelp':    'What is the chain?',
    'tt.modHelp':      'Help',
    'tt.modReset':     'Reset to calculated value',
    'tt.savePreset':   'Save preset',
    'tt.loadPreset':   'Load preset',
    'tt.realtimeHelp': 'How to use the analyser',
    'tt.timelineHelp': 'Waveform, loop and output gain',
    'tt.abCompare':    'A/B comparison',
    'tt.bitDepth':     'Bit depth',
    // Confirm dialogs
    'confirm.reset':   'Are you sure you want to close this session?\nAll current settings will be lost.',
    'confirm.abSlotB': 'How do you want to initialise slot B?\n\n[OK] → Copy current A settings\n[Cancel] → Start from the original analysis settings',

    'footer.copy':    '© 2026 Rack4Master. Francesc Llorens',
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
    'preset.name.prompt': 'Nom del preset:',
    'mod.hpf.desc':   'Elimina contingut sub-sònic (<20 Hz)',
    'mod.eqSub.desc': 'EQ Sustractiva — resonàncies',
    'mod.sat.desc':   'Tape warmth — harmònics càlids',
    'mod.comp.desc':  'Glue compressor — ratio 2:1',
    'mod.eqAdd.desc': 'EQ Aditiva — color i brillantor',
    'mod.width.desc': 'Imatge M/S — amplada estèreo',
    'mod.lim.desc':   'Brick wall — sostre -1.0 dBFS',
    'label.hpf.freq':      'Freqüència de tall',
    'label.eq.click':      'Fes clic en un node per seleccionar-lo',
    'label.eq.drag.full':  '↕ arrossegar = guany · ↔ arrossegar = freqüència · 🖱 roda = Q',
    'label.eq.drag.add':   '↕ arrossegar = guany · ↔ arrossegar = freqüència (Lo-Mid / Mid / Hi-Mid) · shelves Sub/Low/High/Air = només guany',
    'label.eq.qTitle':     'Q PER BANDA (amplada del filtre)',
    'label.eq.band':       'Banda',
    'label.sat.amount':    'Calidesa (tape warmth)',
    'label.sat.hint':      '0 = digital net · 0.8 = saturació intensa',
    'tt.fileReset':    'Carregar un altre fitxer',
    'tt.specHelp':     'Com llegir aquest gràfic?',
    'tt.chainOpen':    'Obrir',
    'tt.chainClose':   'Tancar',
    'tt.chainHelp':    'Què és la cadena?',
    'tt.modHelp':      'Ajuda',
    'tt.modReset':     'Reset al valor calculat',
    'tt.savePreset':   'Desar preset',
    'tt.loadPreset':   'Carregar preset',
    'tt.realtimeHelp': "Com utilitzar l'analitzador",
    'tt.timelineHelp': 'Forma d\'ona, loop i output gain',
    'tt.abCompare':    'Comparació A/B',
    'tt.bitDepth':     'Profunditat de bits',
    'confirm.reset':   'Segur que vols tancar aquesta sessió?\nEs perdran tots els ajustos actuals.',
    'confirm.abSlotB': 'Com vols inicialitzar el slot B?\n\n[D\'acord] → Copiar els ajustos actuals de A\n[Cancel·lar] → Començar des dels ajustos originals de l\'anàlisi',

    'footer.copy':    '© 2026 Rack4Master. Francesc Llorens',
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

let _lang = 'en';  // always starts in English — no persistence

function t(key, params){
  let str = TRANSLATIONS[_lang]?.[key] ?? TRANSLATIONS['es']?.[key] ?? key;
  if(params) Object.entries(params).forEach(([k,v])=>{ str = str.replace(`{${k}}`,v); });
  return str;
}

function setLang(lang){
  if(!TRANSLATIONS[lang]) return;
  _lang = lang;
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

/* ══════════════════════════════════════════════════════════════
   HELP_DATA — localised help modal content
   Exposed via getHelp(id) below.
   Colors stay in script.js (HELP_COLORS).
   ══════════════════════════════════════════════════════════════ */
const HELP_DATA = {

  en: {
    spectrum:{ title:'Spectral Analysis + Metrics',
      que:'The chart shows energy balance across 7 frequency bands (Sub to Air). The 5 metrics show: LUFS-I (Loudness Units per ITU-R BS.1770-4, the real standard used by Spotify/Apple), True Peak (inter-sample peak with 4× cubic interpolation, ITU standard to detect clips on MP3/AAC reencoding), Dynamic Range, Stereo Correlation and Duration.',
      sirve:'LUFS-I is the number that really matters for platform delivery. Spotify normalises to -14 LUFS: if your master is at -10 LUFS they will turn it down 4 LU; if it is at -18 LUFS they will turn it up. True Peak > -1 dBTP means the file will clip when reencoded to MP3/AAC, even if the WAV sounds clean.',
      uso:'Target LUFS-I: -16 to -9. True Peak: always ≤ -1 dBTP. After mastering a "→ after" column appears for each metric. True Peak is calculated on the original when loading and on the master in the background.',
      tip:'A master at -14 LUFS with True Peak -1.0 dBTP is the ideal format for Spotify, Apple Music and YouTube delivery.'},
    chain:{ title:'Mastering Chain',
      que:'Shows all 7 modules in their exact processing order. Click any node to open/close that module directly. Lit nodes = active module; slightly scaled = module open.',
      sirve:'The order is not arbitrary: HPF clears headroom → Corrective EQ removes resonances → SAT adds harmonics → COMP settles dynamics → Tonal EQ adds character → M/S expands the soundstage → LIM closes safely. After the limiter there is an Output Gain that gets baked into the exported WAV.',
      uso:'Click a node = opens the module and scrolls to it. Module toggle = real-time bypass. Changes are heard immediately while audio is playing.',
      tip:'If removing a module makes no difference, reduce its values or leave it bypassed. Less is more in mastering.'},
    realtime:{ title:'Real-Time Analyser',
      que:'Central canvas showing three simultaneous layers: live FFT spectrum (green, during mastered playback) or static analysis spectrum (dim blue, when paused), Corrective EQ response curve (orange) and Tonal EQ curve (blue), with draggable nodes for both EQs.',
      sirve:'Seeing your track\'s real spectrum with the EQ curve overlaid reveals exactly what the filters are doing on real material — not on an empty grid. A +3 dB boost at 8 kHz is clearly visible over the actual Hi-Mid spectrum.',
      uso:'Drag any node directly over the spectrum to change frequency (horizontal) and gain (vertical). The selected node is highlighted. Changes are real-time and sync with each module\'s controls.',
      tip:'The dashed horizontal line marks 0 dB EQ (no gain). Curves crossing that line upward = boost; downward = cut.'},
    timeline:{ title:'Timeline + Loop',
      que:'Navigable waveform of the loaded file, with real-time playback cursor. On the right: Output Gain slider (post-limiter trim, −12 to +6 dB) and L/R stereo VU meter with 2-second peak hold.',
      sirve:'Output Gain is the last control in the chain — it adjusts the final level of the exported WAV without affecting the limiter. The Loop button enables a continuous loop between two draggable handles.',
      uso:'Click on the waveform = jump to that position (works paused or playing). ⟳ Loop = enable loop. Drag the left handle (▶) for loop start; the right (◀) for the end. Loop works in both Original and Mastered mode.',
      tip:'Use loop for repeated A/B comparison of the same section: enable loop → play Original → press Mastered without losing position → hear the same fragment mastered.'},
    hpf:{ title:'High Pass Filter',
      que:'Cuts all frequencies below the set frequency.',
      sirve:'Sub-sonic content (<20 Hz) consumes limiter headroom and causes pumping in the compressor without contributing anything audible. Removing it frees real dynamic headroom.',
      uso:'20-30 Hz for full music. 40-60 Hz if there is excess bass. Never exceed 80 Hz or you will lose body in the low end.',
      tip:'Always active. No professional mix arrives at mastering without an HPF at 20-30 Hz.'},
    eqSub:{ title:'Corrective EQ (Subtractive)',
      que:'Four parametric peak filters aimed at cutting. Bands centred at 200 Hz (low body/kick), 300 Hz (classic mud), 500 Hz (nasality) and 1 kHz (harshness/metallic). Each band has draggable frequency, adjustable gain and Q.',
      sirve:'The compressor cannot distinguish between resonance and musical content: if there is a spike at 300 Hz, it will crush everything together. Cutting first makes the compressor work only on musical dynamics.',
      uso:'Gains always negative (−1 to −6 dB). High Q (4-8) for surgical cuts; low Q (1-2) to soften wide areas. Drag nodes directly in the analyser.',
      tip:'If you do not know what to cut, leave gains at 0 dB. Do not fix what is not broken.'},
    sat:{ title:'Saturation (Tape Warmth)',
      que:'Waveshaper with a tanh curve that introduces controlled harmonic distortion — the same type produced by analogue magnetic tape.',
      sirve:'Saturation adds spectral density without sounding like distortion. It is placed BEFORE the compressor on purpose: the compressor then settles the generated harmonics, just like a real analogue chain.',
      uso:'0.10-0.25 for subtle warmth. 0.30-0.50 for noticeable colouring. Above 0.60 it becomes an effect.',
      tip:'At low amounts you will not notice it alone, but you will when you remove it: the mix sounds less glued.'},
    comp:{ title:'Bus Compressor (Glue)',
      que:'Dynamic compressor on the full stereo bus. Reduces the level of signals that exceed the Threshold according to the configured Ratio.',
      sirve:'The glue of mastering. Ratio 2:1 with slow attack (30 ms) lets transients through but controls overall dynamics, creating cohesion between instruments.',
      uso:'Threshold -18 dB, Ratio 2:1, Attack 30 ms, Release 200 ms. Raise the threshold until you see 2-4 dB of GR. Makeup Gain recovers the lost volume.',
      tip:'2-4 dB of GR is enough. More than 6 dB sounds like a compressor, not glue.'},
    eqAdd:{ title:'Tonal EQ (Additive)',
      que:'Seven broad-spectrum filters covering the same map as the initial analysis: Sub shelf (40 Hz), Low shelf (120 Hz), Lo-Mid peak (350 Hz), Mid peak (1 kHz), Hi-Mid peak (3 kHz), High shelf (8 kHz) and Air shelf (16 kHz). Lo-Mid, Mid and Hi-Mid peaks are draggable in frequency.',
      sirve:'This EQ is placed after the compressor on purpose: we equalise the already-compressed signal. The 7 bands correspond exactly to the 7 zones of the spectral analysis, allowing direct band-by-band correction.',
      uso:'Small moves: ±1-3 dB. Air +1.5/+2 dB is almost universal in pop-rock. Lo-Mid −1/−2 dB cleans up mud. Drag nodes directly in the analyser.',
      tip:'Try Lo-Mid −1.5 dB at 350 Hz to clean up mud without touching low body. It is the adjustment that most differentiates amateur from professional sound.'},
    width:{ title:'Stereo Image M/S',
      que:'Mid/Side matrix that decomposes stereo into central signal (Mid) and lateral signal (Side), scales the laterals, and recomposes. Value >1 widens; <1 narrows.',
      sirve:'Widens the soundstage without weakening the centre: vocals and bass stay upfront while guitars and cymbals gain breadth.',
      uso:'Values 1.1-1.4 for subtle widening. Check mono: set to 0 and verify kick, bass and vocals are still present.',
      tip:'If bass disappears in mono, the problem is phase issues in the original mix, not this module.'},
    lim:{ title:'Final Limiter + Output Gain',
      que:'Brick wall at 20:1 ratio and 1 ms attack — absolute ceiling. Followed by Output Gain, a post-limiter output trim (−12 to +6 dB) that gets baked into the exported WAV.',
      sirve:'Guarantees the exported file never clips. Output Gain lets you adjust the final level without compromising the limiter ceiling. The L/R VU meter monitors the real output level.',
      uso:'Ceiling −1.0 dBFS for streaming. The limiter should only catch occasional peaks. Output Gain: adjust before exporting for the desired delivery level.',
      tip:'If the limiter works constantly, reduce the compressor Makeup Gain. If True Peak exceeds −1 dBTP, lower the Output Gain.'},
  },

  es: {
    spectrum:{ title:'Análisis Espectral + Métricas',
      que:'El gráfico muestra el balance de energía en 7 bandas de frecuencia (Sub a Air). Las 5 métricas muestran: LUFS-I (Loudness Units según ITU-R BS.1770-4, el estándar real de Spotify/Apple), True Peak (pico inter-muestral calculado con interpolación cúbica 4x, estándar ITU para detectar clips en recodificación MP3/AAC), Rango Dinámico, Correlación estéreo y Duración.',
      sirve:'LUFS-I es el número que realmente importa para entrega a plataformas. Spotify normaliza a -14 LUFS: si tu master está a -10 LUFS lo bajarán 4 LU; si está a -18 LUFS lo subirán. True Peak > -1 dBTP indica que el archivo clippeará al recodificarse a MP3/AAC, aunque el WAV suene limpio.',
      uso:'Zona verde LUFS-I: -16 a -9. True Peak: siempre ≤ -1 dBTP. Tras masterizar aparece la columna "→ después" en cada métrica. El True Peak se calcula sobre el original al cargar y sobre el master en segundo plano.',
      tip:'Un master a -14 LUFS con True Peak de -1.0 dBTP es el formato ideal para entrega a Spotify, Apple Music y YouTube.'},
    chain:{ title:'Cadena de Masterización',
      que:'Muestra los 7 módulos en su orden exacto de procesado. Haz clic en cualquier nodo para abrir/cerrar ese módulo directamente. Los nodos iluminados = módulo activo; escala ligeramente = módulo abierto.',
      sirve:'El orden no es arbitrario: HPF limpia headroom → EQ Correctiva elimina resonancias → SAT añade armónicos → COMP asienta la dinámica → EQ Tonal da carácter → M/S amplía el espacio → LIM cierra con seguridad. Después del limitador hay un Output Gain que se bake en el WAV exportado.',
      uso:'Clic en el nodo = abre el módulo y hace scroll hasta él. Toggle del módulo = bypass en tiempo real. Los cambios se escuchan inmediatamente si hay audio reproduciéndose.',
      tip:'Si quitar un módulo no se nota, reduce sus valores o déjalo en bypass. Menos es más en masterización.'},
    realtime:{ title:'Analizador en Tiempo Real',
      que:'Canvas central que muestra tres capas simultáneas: espectro FFT en vivo (verde, durante reproducción masterizada) o estático del análisis (azul tenue, en pausa), curva de respuesta EQ Correctiva (naranja) y curva EQ Tonal (azul), con los nodos de ambos EQs arrastrables directamente.',
      sirve:'Ver el espectro real de tu canción con la curva EQ superpuesta revela exactamente qué están haciendo los filtros sobre el material real. Un realce de +3 dB a 8 kHz se ve claramente sobre el espectro real del Hi-Mid.',
      uso:'Arrastra cualquier nodo directamente sobre el espectro para cambiar frecuencia (horizontal) y ganancia (vertical). El nodo seleccionado se resalta. Los cambios son en tiempo real y se sincronizan con los controles de cada módulo.',
      tip:'La línea punteada horizontal marca el 0 dB EQ (sin ganancia). Las curvas que cruzan esa línea hacia arriba = boost; hacia abajo = cut.'},
    timeline:{ title:'Línea de Tiempo + Loop',
      que:'Waveform navegable del archivo cargado, con cursor de reproducción en tiempo real. A la derecha: slider de Output Gain (trim post-limitador, −12 a +6 dB) y VU meter estéreo L/R con peak hold de 2 segundos.',
      sirve:'El Output Gain es el último control de la cadena — ajusta el nivel final del WAV exportado sin afectar al limitador. El botón Loop activa un bucle continuo entre dos manejadores arrastrables.',
      uso:'Clic en la waveform = saltar a esa posición (funciona tanto en pausa como reproduciendo). ⟳ Loop = activar bucle. Arrastra el manejador izquierdo (▶) para el inicio del loop; el derecho (◀) para el final. El loop funciona tanto en modo Original como Masterizado.',
      tip:'Usa el loop para comparar A/B en la misma sección repetidamente: activa loop → reproduce Original → pulsa Masterizado sin perder posición → escucha el mismo fragmento masterizado.'},
    hpf:{ title:'High Pass Filter',
      que:'Corta todas las frecuencias por debajo de la frecuencia configurada.',
      sirve:'El contenido sub-sónico (<20 Hz) consume headroom del limitador y hace bombear el compresor sin aportar nada audible. Eliminarlo libera espacio dinámico real.',
      uso:'20-30 Hz para música completa. 40-60 Hz si hay exceso de graves. Nunca superes 80 Hz o perderás cuerpo en el bajo.',
      tip:'Siempre activo. Ninguna mezcla profesional llega a masterización sin un HPF a 20-30 Hz.'},
    eqSub:{ title:'EQ Correctiva (Sustractiva)',
      que:'Cuatro filtros peak parametrizables orientados al corte. Bandas centradas en 200 Hz (cuerpo bajo/bombo), 300 Hz (mud clásico), 500 Hz (nasalidad) y 1 kHz (dureza/metalismo). Cada banda tiene frecuencia arrastrable, ganancia y Q ajustables.',
      sirve:'El compresor no distingue entre resonancia y contenido musical: si hay un pico a 300 Hz, lo aplastará todo junto. Recortar primero hace que el compresor trabaje solo sobre dinámica musical.',
      uso:'Ganancias siempre negativas (−1 a −6 dB). Q alto (4-8) para cortes quirúrgicos; Q bajo (1-2) para suavizar zonas amplias. Arrastra los nodos directamente en el analizador.',
      tip:'Si no sabes qué cortar, deja las ganancias a 0 dB. No corrijas lo que no está roto.'},
    sat:{ title:'Saturación (Tape Warmth)',
      que:'Waveshaper con curva tanh que introduce distorsión armónica controlada — el mismo tipo que produce la cinta magnética analógica.',
      sirve:'La saturación añade densidad espectral sin sonar a distorsión. Está ANTES del compresor a propósito: el compresor asienta los armónicos generados, como en una cadena analógica real.',
      uso:'0.10-0.25 para calidez sutil. 0.30-0.50 para coloración notable. Por encima de 0.60 ya es efecto.',
      tip:'A cantidades bajas no lo notarás solo, pero sí al quitarlo: el mix suena menos pegado.'},
    comp:{ title:'Bus Compressor (Glue)',
      que:'Compresor dinámico sobre el bus estéreo completo. Reduce el nivel de señales que superen el Threshold según el Ratio configurado.',
      sirve:'El pegamento de la masterización. Ratio 2:1 con ataque lento (30 ms) deja pasar los transientes pero controla la dinámica general, creando cohesión entre instrumentos.',
      uso:'Threshold -18 dB, Ratio 2:1, Attack 30 ms, Release 200 ms. Sube el threshold hasta ver 2-4 dB de GR. Makeup Gain recupera el volumen perdido.',
      tip:'2-4 dB de GR es suficiente. Más de 6 dB suena a compresor, no a pegamento.'},
    eqAdd:{ title:'EQ Tonal (Aditiva)',
      que:'Siete filtros de amplio espectro que cubren el mismo mapa que el análisis inicial: Sub shelf (40 Hz), Low shelf (120 Hz), Lo-Mid peak (350 Hz), Mid peak (1 kHz), Hi-Mid peak (3 kHz), High shelf (8 kHz) y Air shelf (16 kHz). Los peaks Lo-Mid, Mid y Hi-Mid son arrastrables en frecuencia.',
      sirve:'Esta EQ está después del compresor a propósito: ecualizamos la señal ya comprimida. Las 7 bandas corresponden exactamente a las 7 zonas del análisis espectral.',
      uso:'Movimientos pequeños: ±1-3 dB. Air +1.5/+2 dB es casi universal en pop-rock. Lo-Mid −1/−2 dB limpia el barro. Arrastra los nodos directamente en el analizador.',
      tip:'Prueba Lo-Mid −1.5 dB a 350 Hz para limpiar barro sin tocar el cuerpo grave. Es el ajuste que más diferencia el sonido amateur del profesional.'},
    width:{ title:'Imagen Estéreo M/S',
      que:'Matriz Mid/Side que descompone el estéreo en señal central (Mid) y lateral (Side), escala las laterales y recompone. Valor >1 amplía; <1 estrecha.',
      sirve:'Amplía el espacio sin debilitar el centro: la voz y el bajo siguen al frente mientras guitarras y platillos ganan anchura.',
      uso:'Valores 1.1-1.4 para ensanchamiento sutil. Verifica mono: pon a 0 y comprueba que kick, bajo y voz siguen presentes.',
      tip:'Si el bajo desaparece en mono, el problema es de fase en la mezcla original, no de este módulo.'},
    lim:{ title:'Limitador Final + Output Gain',
      que:'Brick wall con ratio 20:1 y ataque 1 ms — techo absoluto. Seguido del Output Gain, un trim de salida post-limitador (−12 a +6 dB) que se bake en el WAV exportado.',
      sirve:'Garantiza que el archivo exportado nunca clipee. El Output Gain permite ajustar el nivel final sin comprometer el techo del limitador. El VU meter L/R monitorea el nivel real de salida.',
      uso:'Ceiling −1.0 dBFS para streaming. El limitador solo debe atrapar picos ocasionales. Output Gain: ajusta antes de exportar para el nivel de entrega deseado.',
      tip:'Si el limitador trabaja constantemente, reduce el Makeup Gain del compresor. Si True Peak supera −1 dBTP, baja el Output Gain.'},
  },

  ca: {
    spectrum:{ title:'Anàlisi Espectral + Mètriques',
      que:"El gràfic mostra el balanç d'energia en 7 bandes de freqüència (Sub a Air). Les 5 mètriques mostren: LUFS-I (Loudness Units segons ITU-R BS.1770-4, l'estàndard real de Spotify/Apple), True Peak (pic inter-mostral calculat amb interpolació cúbica 4×, estàndard ITU per detectar clips en recodificació MP3/AAC), Rang Dinàmic, Correlació estèreo i Durada.",
      sirve:"LUFS-I és el número que realment importa per a l'entrega a plataformes. Spotify normalitza a -14 LUFS: si el teu màster és a -10 LUFS el baixaran 4 LU; si és a -18 LUFS el pujaran. True Peak > -1 dBTP indica que el fitxer clippejarà en recodificar-se a MP3/AAC, tot i que el WAV soni net.",
      uso:"Zona verda LUFS-I: -16 a -9. True Peak: sempre ≤ -1 dBTP. Després de masteritzar apareix la columna '→ després' a cada mètrica. El True Peak es calcula sobre l'original en carregar i sobre el màster en segon pla.",
      tip:"Un màster a -14 LUFS amb True Peak de -1.0 dBTP és el format ideal per a l'entrega a Spotify, Apple Music i YouTube."},
    chain:{ title:'Cadena de Masterització',
      que:"Mostra els 7 mòduls en el seu ordre exacte de processat. Fes clic a qualsevol node per obrir/tancar aquell mòdul directament. Nodes il·luminats = mòdul actiu; escala lleugerament = mòdul obert.",
      sirve:"L'ordre no és arbitrari: HPF allibera headroom → EQ Correctiva elimina resonàncies → SAT afegeix harmònics → COMP assenta la dinàmica → EQ Tonal dóna caràcter → M/S amplia l'espai → LIM tanca amb seguretat. Després del limitador hi ha un Output Gain que es bake al WAV exportat.",
      uso:"Clic al node = obre el mòdul i fa scroll fins a ell. Toggle del mòdul = bypass en temps real. Els canvis s'escolen immediatament si hi ha àudio reproduint-se.",
      tip:"Si treure un mòdul no es nota, redueix els seus valors o deixa'l en bypass. Menys és més en masterització."},
    realtime:{ title:'Analitzador en Temps Real',
      que:"Canvas central que mostra tres capes simultànies: espectre FFT en viu (verd, durant reproducció masteritzada) o estàtic de l'anàlisi (blau tènue, en pausa), corba de resposta EQ Correctiva (taronja) i corba EQ Tonal (blau), amb nodes arrastrables de tots dos EQs.",
      sirve:"Veure l'espectre real de la teva cançó amb la corba EQ superposada revela exactament el que fan els filtres sobre el material real. Un realç de +3 dB a 8 kHz es veu clarament sobre l'espectre real del Hi-Mid.",
      uso:"Arrossega qualsevol node directament sobre l'espectre per canviar freqüència (horitzontal) i guany (vertical). El node seleccionat es ressalta. Els canvis són en temps real i es sincronitzen amb els controls de cada mòdul.",
      tip:"La línia de punts horitzontal marca el 0 dB EQ (sense guany). Les corbes que creuen aquesta línia cap amunt = boost; cap avall = cut."},
    timeline:{ title:'Línia de Temps + Loop',
      que:"Forma d'ona navegable del fitxer carregat, amb cursor de reproducció en temps real. A la dreta: slider d'Output Gain (trim post-limitador, −12 a +6 dB) i VU meter estèreo L/R amb peak hold de 2 segons.",
      sirve:"L'Output Gain és l'últim control de la cadena — ajusta el nivell final del WAV exportat sense afectar el limitador. El botó Loop activa un bucle continu entre dos manejadors arrossegables.",
      uso:"Clic a la forma d'ona = saltar a aquella posició (funciona tant en pausa com reproduint). ⟳ Loop = activar bucle. Arrossega el manejador esquerre (▶) per a l'inici del loop; el dret (◀) per al final.",
      tip:"Utilitza el loop per comparar A/B a la mateixa secció repetidament: activa loop → reprodueix Original → prem Masteritzat sense perdre posició → escolta el mateix fragment masteritzat."},
    hpf:{ title:'High Pass Filter',
      que:"Talla totes les freqüències per sota de la freqüència configurada.",
      sirve:"El contingut sub-sònic (<20 Hz) consumeix headroom del limitador i fa bombear el compressor sense aportar res d'audible. Eliminar-lo allibera espai dinàmic real.",
      uso:"20-30 Hz per a música completa. 40-60 Hz si hi ha excés de greus. Mai superis 80 Hz o perdràs cos en el baix.",
      tip:"Sempre actiu. Cap mescla professional arriba a masterització sense un HPF a 20-30 Hz."},
    eqSub:{ title:'EQ Correctiva (Sustractiva)',
      que:"Quatre filtres peak parametritzables orientats al tall. Bandes centrades a 200 Hz (cos baix/bombo), 300 Hz (mud clàssic), 500 Hz (nasalitat) i 1 kHz (duresa/metàl·lic). Cada banda té freqüència arrossegable, guany i Q ajustables.",
      sirve:"El compressor no distingeix entre ressonància i contingut musical: si hi ha un pic a 300 Hz, ho aixafarà tot junt. Retallar primer fa que el compressor treballi només sobre dinàmica musical.",
      uso:"Guanys sempre negatius (−1 a −6 dB). Q alt (4-8) per a talls quirúrgics; Q baix (1-2) per suavitzar zones àmplies. Arrossega els nodes directament a l'analitzador.",
      tip:"Si no saps què tallar, deixa els guanys a 0 dB. No corregeixis el que no està trencat."},
    sat:{ title:'Saturació (Tape Warmth)',
      que:"Waveshaper amb corba tanh que introdueix distorsió harmònica controlada — el mateix tipus que produeix la cinta magnètica analògica.",
      sirve:"La saturació afegeix densitat espectral sense sonar a distorsió. Està ABANS del compressor expressament: el compressor assenta els harmònics generats, com en una cadena analògica real.",
      uso:"0.10-0.25 per a calidesa subtil. 0.30-0.50 per a coloració notable. Per damunt de 0.60 ja és efecte.",
      tip:"A quantitats baixes no ho notaràs sol, però sí en treure-ho: la mescla sona menys enganxada."},
    comp:{ title:'Bus Compressor (Glue)',
      que:"Compressor dinàmic sobre el bus estèreo complet. Redueix el nivell de senyals que superin el Threshold segons el Ratio configurat.",
      sirve:"L'enganxament de la masterització. Ratio 2:1 amb atac lent (30 ms) deixa passar els transients però controla la dinàmica general, creant cohesió entre instruments.",
      uso:"Threshold -18 dB, Ratio 2:1, Attack 30 ms, Release 200 ms. Puja el threshold fins a veure 2-4 dB de GR. Makeup Gain recupera el volum perdut.",
      tip:"2-4 dB de GR és suficient. Més de 6 dB sona a compressor, no a enganxament."},
    eqAdd:{ title:'EQ Tonal (Aditiva)',
      que:"Set filtres d'ample espectre que cobreixen el mateix mapa que l'anàlisi inicial: Sub shelf (40 Hz), Low shelf (120 Hz), Lo-Mid peak (350 Hz), Mid peak (1 kHz), Hi-Mid peak (3 kHz), High shelf (8 kHz) i Air shelf (16 kHz). Els peaks Lo-Mid, Mid i Hi-Mid són arrossegables en freqüència.",
      sirve:"Aquest EQ està després del compressor expressament: equalitzem el senyal ja comprimit. Les 7 bandes corresponen exactament a les 7 zones de l'anàlisi espectral.",
      uso:"Moviments petits: ±1-3 dB. Air +1.5/+2 dB és gairebé universal en pop-rock. Lo-Mid −1/−2 dB neteja el fang. Arrossega els nodes directament a l'analitzador.",
      tip:"Prova Lo-Mid −1.5 dB a 350 Hz per netejar fang sense tocar el cos greu. És l'ajust que més diferencia el so amateur del professional."},
    width:{ title:'Imatge Estèreo M/S',
      que:"Matriu Mid/Side que descompon l'estèreo en senyal central (Mid) i lateral (Side), escala les laterals i recomposa. Valor >1 eixampla; <1 estreny.",
      sirve:"Eixampla l'espai sense debilitar el centre: la veu i el baix segueixen al davant mentre les guitarres i els platerets guanyen amplada.",
      uso:"Valors 1.1-1.4 per a eixamplament subtil. Verifica mono: posa a 0 i comprova que el kick, el baix i la veu segueixen presents.",
      tip:"Si el baix desapareix en mono, el problema és de fase a la mescla original, no d'aquest mòdul."},
    lim:{ title:'Limitador Final + Output Gain',
      que:"Brick wall amb ratio 20:1 i atac 1 ms — sostre absolut. Seguit de l'Output Gain, un trim de sortida post-limitador (−12 a +6 dB) que es bake al WAV exportat.",
      sirve:"Garanteix que el fitxer exportat mai clipi. L'Output Gain permet ajustar el nivell final sense comprometre el sostre del limitador. El VU meter L/R monitoritza el nivell real de sortida.",
      uso:"Ceiling −1.0 dBFS per a streaming. El limitador només ha d'atrapar pics ocasionals. Output Gain: ajusta abans d'exportar per al nivell d'entrega desitjat.",
      tip:"Si el limitador treballa constantment, redueix el Makeup Gain del compressor. Si True Peak supera −1 dBTP, baixa l'Output Gain."},
  },
};

function getHelp(id){
  const lang=_lang;
  return (HELP_DATA[lang]&&HELP_DATA[lang][id]) || HELP_DATA['en'][id] || null;
}
window.getHelp = getHelp;
