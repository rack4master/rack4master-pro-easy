'use strict';

/* ══════════════════════════════════════
   HELP CONTENT
══════════════════════════════════════ */
const HELP = {
  spectrum:{title:'Análisis Espectral + Métricas',color:'#4dabf7',que:'El gráfico muestra el balance de energía en 7 bandas de frecuencia (Sub a Air). Las 5 métricas muestran: LUFS-I (Loudness Units según ITU-R BS.1770-4, el estándar real de Spotify/Apple), True Peak (pico inter-muestral calculado con interpolación cúbica 4x, estándar ITU para detectar clips en recodificación MP3/AAC), Rango Dinámico, Correlación estéreo y Duración.',sirve:'LUFS-I es el número que realmente importa para entrega a plataformas. Spotify normaliza a -14 LUFS: si tu master está a -10 LUFS lo bajarán 4 LU; si está a -18 LUFS lo subirán. True Peak > -1 dBTP indica que el archivo clippeará al recodificarse a MP3/AAC, aunque el WAV suene limpio.',uso:'Zona verde LUFS-I: -16 a -9. True Peak: siempre ≤ -1 dBTP. Tras masterizar aparece la columna "→ después" en cada métrica. El True Peak solo se calcula sobre el master (no el original).',tip:'Un master a -14 LUFS con True Peak de -1.0 dBTP es el formato ideal para entrega a Spotify, Apple Music y YouTube simultáneamente.'},
  chain:{title:'Cadena de Masterización',color:'#cc5de8',que:'Muestra los 7 módulos en su orden exacto de procesado. Haz clic en cualquier nodo para abrir/cerrar ese módulo directamente. Los nodos iluminados = módulo activo; escala ligeramente = módulo abierto.',sirve:'El orden no es arbitrario: HPF limpia headroom → EQ Correctiva elimina resonancias → SAT añade armónicos → COMP asienta la dinámica → EQ Tonal da carácter → M/S amplía el espacio → LIM cierra con seguridad. Después del limitador hay un Output Gain (trim de salida) que se bake en el WAV exportado.',uso:'Clic en el nodo = abre el módulo y hace scroll hasta él. Toggle del módulo = bypass en tiempo real. Los cambios se escuchan inmediatamente si hay audio reproduciéndose.',tip:'Si quitar un módulo no se nota, reduce sus valores o déjalo en bypass. Menos es más en masterización.'},
  realtime:{title:'Analizador en Tiempo Real',color:'#69db7c',que:'Canvas central que muestra tres capas simultáneas: espectro FFT en vivo (verde, durante reproducción masterizada) o estático del análisis (azul tenue, en pausa), curva de respuesta EQ Correctiva (naranja) y curva EQ Tonal (azul), con los nodos de ambos EQs arrastrables directamente.',sirve:'Ver el espectro real de tu canción con la curva EQ superpuesta revela exactamente qué están haciendo los filtros sobre el material real — no sobre una cuadrícula vacía. Un realce de +3dB a 8kHz se ve claramente sobre el espectro real del Hi-Mid.',uso:'Arrastra cualquier nodo directamente sobre el espectro para cambiar frecuencia (horizontal) y ganancia (vertical). El nodo seleccionado se resalta. Los cambios son en tiempo real y se sincronizan con los controles de cada módulo.',tip:'La línea punteada horizontal marca el 0 dB EQ (sin ganancia). Las curvas que cruzan esa línea hacia arriba = boost; hacia abajo = cut.'},
  timeline:{title:'Línea de Tiempo + Loop',color:'#ffa94d',que:'Waveform navegable del archivo cargado, con cursor de reproducción en tiempo real. A la derecha: slider de Output Gain (trim post-limitador, −12 a +6 dB) y VU meter estéreo L/R con peak hold de 2 segundos.',sirve:'El Output Gain es el último control de la cadena — ajusta el nivel final del WAV exportado sin afectar al limitador. El VU meter L/R muestra el nivel real de salida con barras de RMS y un tick de peak hold que dura 2 segundos. El botón Loop activa un bucle continuo entre dos manejadores arrastrables.',uso:'Clic en la waveform = saltar a esa posición (funciona tanto en pausa como reproduciendo). Botón ⟳ Loop = activar bucle. Arrastra el manejador izquierdo (▶) para definir el inicio del loop; el derecho (◀) para el final. El loop funciona tanto en modo Original como Masterizado.',tip:'Usa el loop para comparar A/B en la misma sección repetidamente: activa loop → reproduce Original → pulsa Masterizado sin perder posición → escucha el mismo fragmento masterizado.'},
  hpf:{title:'High Pass Filter',color:'#ff6b6b',que:'Corta todas las frecuencias por debajo de la frecuencia configurada.',sirve:'El contenido sub-sónico (<20 Hz) consume headroom del limitador y hace bombear el compresor sin aportar nada audible. Eliminarlo libera espacio dinámico real.',uso:'20-30 Hz para música completa. 40-60 Hz si hay exceso de graves. Nunca superes 80 Hz o perderás cuerpo en el bajo.',tip:'Siempre activo. Ninguna mezcla profesional llega a masterización sin un HPF a 20-30 Hz.'},
  eqSub:{title:'EQ Correctiva (Sustractiva)',color:'#ffa94d',que:'Tres filtros peak parametrizables orientados al corte. La auto-configuración asigna cada banda a su región espectral: 200 Hz → zona Low (80-250 Hz), 400 Hz → Lo-Mid (250-500 Hz), 800 Hz → Mid (500-2kHz).',sirve:'El compresor no distingue entre resonancia y contenido musical: si hay un pico a 300 Hz, lo aplastará todo junto. Recortar primero hace que el compresor trabaje solo sobre dinámica musical.',uso:'Ganancias siempre negativas (−1 a −6 dB). Q alto (4-8) para cortes quirúrgicos; Q bajo (1-2) para suavizar zonas amplias. Arrastra los nodos directamente en el analizador.',tip:'Si no sabes qué cortar, deja las ganancias a 0 dB. No corrijas lo que no está roto.'},
  sat:{title:'Saturación (Tape Warmth)',color:'#ffd43b',que:'Waveshaper con curva tanh que introduce distorsión armónica controlada — el mismo tipo que produce la cinta magnética analógica.',sirve:'La saturación añade densidad espectral sin sonar a distorsión. Está ANTES del compresor a propósito: el compresor asienta los armónicos generados, como en una cadena analógica real.',uso:'0.10-0.25 para calidez sutil. 0.30-0.50 para coloración notable. Por encima de 0.60 ya es efecto.',tip:'A cantidades bajas no lo notarás solo, pero sí al quitarlo: el mix suena menos "pegado".'},
  comp:{title:'Bus Compressor (Glue)',color:'#69db7c',que:'Compresor dinámico sobre el bus estéreo completo. Reduce el nivel de señales que superen el Threshold según el Ratio configurado.',sirve:'El "pegamento" de la masterización. Ratio 2:1 con ataque lento (30ms) deja pasar los transientes pero controla la dinámica general, creando cohesión entre instrumentos.',uso:'Threshold -18dB, Ratio 2:1, Attack 30ms, Release 200ms. Sube el threshold hasta ver 2-4 dB de GR. Makeup Gain recupera el volumen perdido.',tip:'2-4 dB de GR es suficiente. Más de 6 dB suena a compresor, no a pegamento.'},
  eqAdd:{title:'EQ Tonal (Aditiva)',color:'#4dabf7',que:'Cuatro filtros de amplio espectro: Low shelf (120 Hz), Mid peak (1 kHz), High peak (8 kHz) y Air shelf (16 kHz). Las frecuencias centrales de Mid y High son arrastrables.',sirve:'Esta EQ está después del compresor a propósito: ecualizamos la señal ya comprimida. La banda Air (16 kHz) es el secreto del sonido profesional moderno.',uso:'Movimientos pequeños: ±1-3 dB. Air +1.5/+2 dB es casi universal en pop-rock. Arrastra los nodos directamente en el analizador.',tip:'Prueba Air +2 dB a 16 kHz con ojos cerrados. Es el cambio más revelador de toda la cadena.'},
  width:{title:'Imagen Estéreo M/S',color:'#cc5de8',que:'Matriz Mid/Side que descompone el estéreo en señal central (Mid) y lateral (Side), escala las laterales y recompone. Valor >1 amplía; <1 estrecha.',sirve:'Amplía el espacio sin debilitar el centro: la voz y el bajo siguen al frente mientras guitarras y platillos ganan anchura.',uso:'Valores 1.1-1.4 para ensanchamiento sutil. Verifica mono: pon a 0 y comprueba que kick, bajo y voz siguen presentes.',tip:'Si el bajo desaparece en mono, el problema es de fase en la mezcla original, no de este módulo.'},
  lim:{title:'Limitador Final + Output Gain',color:'#f783ac',que:'Brick wall con ratio 20:1 y ataque 1ms — techo absoluto. Seguido del Output Gain, un trim de salida post-limitador (−12 a +6 dB) que se bake en el WAV exportado.',sirve:'Garantiza que el archivo exportado nunca clipee. El Output Gain permite ajustar el nivel final sin comprometer el techo del limitador. El VU meter L/R monitorea el nivel real de salida.',uso:'Ceiling −1.0 dBFS para streaming. El limitador solo debe atrapar picos ocasionales. Output Gain: ajusta antes de exportar para el nivel de entrega deseado.',tip:'Si el limitador trabaja constantemente, reduce el Makeup Gain del compresor. Si True Peak supera −1 dBTP, baja el Output Gain.'},
};

/* ══════════════════════════════════════
   CONSTANTS
══════════════════════════════════════ */
const FREQ_BANDS = [
  {id:'sub',   name:'Sub',    min:20,    max:80,    target:-24, color:'#ff6060'},
  {id:'low',   name:'Low',    min:80,    max:250,   target:-18, color:'#ff9940'},
  {id:'loMid', name:'Lo-Mid', min:250,   max:500,   target:-22, color:'#ffd030'},
  {id:'mid',   name:'Mid',    min:500,   max:2000,  target:-20, color:'#50e060'},
  {id:'hiMid', name:'Hi-Mid', min:2000,  max:8000,  target:-18, color:'#40b8ff'},
  {id:'high',  name:'High',   min:8000,  max:16000, target:-22, color:'#c060e8'},
  {id:'air',   name:'Air',    min:16000, max:22000, target:-28, color:'#f060a8'},
];

const MODULES_META = [
  {id:'hpf',   name:'HPF',        color:'#ff6b6b', desc:'Elimina subsónico (<20 Hz)'},
  {id:'eqSub', name:'EQ CORRECTIVA',    color:'#ffa94d', desc:'EQ Sustractiva — resonancias'},
  {id:'sat',   name:'SATURACIÓN', color:'#ffd43b', desc:'Tape warmth — armónicos cálidos'},
  {id:'comp',  name:'COMPRESOR (GLUE)',   color:'#69db7c', desc:'Glue compressor — ratio 2:1'},
  {id:'eqAdd', name:'EQ TONAL',   color:'#4dabf7', desc:'EQ Aditiva — color y brillo'},
  {id:'width', name:'STEREO',     color:'#cc5de8', desc:'Imagen M/S — amplitud estéreo'},
  {id:'lim',   name:'LIMITER',    color:'#f783ac', desc:'Brick wall — techo -1.0 dBFS'},
];

const ICON_SAVE = `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>`;
const ICON_LOAD = `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><line x1="12" y1="11" x2="12" y2="17"/><polyline points="9 14 12 17 15 14"/></svg>`;

/* ══════════════════════════════════════
   DSP UTILITIES
══════════════════════════════════════ */
function makeSatCurve(amount){
  const n=512,curve=new Float32Array(n);
  for(let i=0;i<n;i++){
    const x=(i*2)/n-1;
    if(amount<0.001){curve[i]=x;continue;}
    // Pre-drive normalizado: pendiente=1 en x=0 (unity gain señales pequeñas),
    // pero audible a niveles de masterización típicos (-12 a -6 dBFS)
    // drive=1: tanh≈lineal → amount=0.33, drive=2: THD ~3% a -6dBFS
    const drive=1+amount*3;  // 1.003 a 3.8 para amount 0.001→0.95
    curve[i]=(1-amount)*x+amount*Math.tanh(x*drive)/drive;
  }
  return curve;
}
function calcRMS(buf){const L=buf.getChannelData(0),R=buf.numberOfChannels>1?buf.getChannelData(1):L;let sq=0;for(let i=0;i<L.length;i++)sq+=(L[i]*L[i]+R[i]*R[i])*.5;const rms=Math.sqrt(sq/L.length);return rms>1e-9?20*Math.log10(rms):-100;}

// ── LUFS Integrado — ITU-R BS.1770-4 ──────────────────────────────────────────
function kWeightingCoeffs(SR){
  // Pre-filter: high-shelf +4dB @ 1682 Hz (bilinear transform para cualquier SR)
  const f0a=1681.974450955533,Q0a=Math.SQRT1_2,G0a=3.999843853973347;
  const Ka=Math.tan(Math.PI*f0a/SR);
  const Vh=Math.pow(10,G0a/20), Vb=Math.pow(10,G0a/40);
  const da=1+Ka/Q0a+Ka*Ka;
  const pre={b0:(Vh+Vb/Q0a*Ka+Ka*Ka)/da, b1:2*(Ka*Ka-Vh)/da, b2:(Vh-Vb/Q0a*Ka+Ka*Ka)/da, a1:2*(Ka*Ka-1)/da, a2:(1-Ka/Q0a+Ka*Ka)/da};
  // RLB-weighting: high-pass @ 38.1 Hz
  const f0b=38.13547087602444,Q0b=0.5003270373238773;
  const Kb=Math.tan(Math.PI*f0b/SR);
  const db=1+Kb/Q0b+Kb*Kb;
  const rlb={b0:1/db, b1:-2/db, b2:1/db, a1:2*(Kb*Kb-1)/db, a2:(1-Kb/Q0b+Kb*Kb)/db};
  return{pre,rlb};
}
function calcLUFS(buf){
  const SR=buf.sampleRate,nc=Math.min(buf.numberOfChannels,2);
  const{pre,rlb}=kWeightingCoeffs(SR);
  const blockSize=Math.round(SR*.4), hopSize=Math.round(SR*.1);
  const N=buf.length, numBlocks=Math.max(0,Math.floor((N-blockSize)/hopSize)+1);
  if(numBlocks===0)return calcRMS(buf); // audio demasiado corto: fallback a RMS
  const blockPow=new Float64Array(numBlocks);
  for(let ch=0;ch<nc;ch++){
    const raw=buf.getChannelData(ch);
    // Pre-filter → en tmp; luego RLB → sobreescribe tmp
    const tmp=new Float32Array(N);
    {let{b0,b1,b2,a1,a2}=pre,x1=0,x2=0,y1=0,y2=0;for(let i=0;i<N;i++){const x0=raw[i],y0=b0*x0+b1*x1+b2*x2-a1*y1-a2*y2;tmp[i]=y0;x2=x1;x1=x0;y2=y1;y1=y0;}}
    {let{b0,b1,b2,a1,a2}=rlb,x1=0,x2=0,y1=0,y2=0;for(let i=0;i<N;i++){const x0=tmp[i],y0=b0*x0+b1*x1+b2*x2-a1*y1-a2*y2;tmp[i]=y0;x2=x1;x1=x0;y2=y1;y1=y0;}}
    // Acumular potencia por bloque
    for(let b=0;b<numBlocks;b++){const s=b*hopSize;let sum=0;for(let i=s;i<s+blockSize;i++)sum+=tmp[i]*tmp[i];blockPow[b]+=sum/blockSize;}
  }
  // Gating absoluto (-70 LUFS)
  const lk=b=>blockPow[b]>1e-10?-0.691+10*Math.log10(blockPow[b]):-Infinity;
  const absGated=[];for(let b=0;b<numBlocks;b++){const l=lk(b);if(isFinite(l)&&l>=-70)absGated.push(l);}
  if(!absGated.length)return calcRMS(buf);
  // Umbral relativo (-10 LU del promedio sin gate)
  const meanPow=absGated.reduce((s,l)=>s+Math.pow(10,(l+0.691)/10),0)/absGated.length;
  const gammaR=-0.691+10*Math.log10(meanPow)-10;
  const relGated=absGated.filter(l=>l>=gammaR);
  if(!relGated.length)return calcRMS(buf);
  const finalPow=relGated.reduce((s,l)=>s+Math.pow(10,(l+0.691)/10),0)/relGated.length;
  return Math.round((-0.691+10*Math.log10(finalPow))*10)/10;
}

// ── True Peak — interpolación cúbica 4x (ITU-R BS.1770-4 §4) ─────────────────
function calcTruePeak(buf){
  let peak=0;
  for(let ch=0;ch<Math.min(buf.numberOfChannels,2);ch++){
    const d=buf.getChannelData(ch),n=d.length;
    for(let i=1;i<n-2;i++){
      const x1=d[i]; const a1=x1<0?-x1:x1; if(a1>peak)peak=a1;
      const x0=d[i-1],x2=d[i+1],x3=d[i+2];
      const ca=-0.5*x0+1.5*x1-1.5*x2+0.5*x3;
      const cb=x0-2.5*x1+2*x2-0.5*x3;
      const cc=-0.5*x0+0.5*x2;
      // t = 0.25, 0.5, 0.75 (3 puntos entre muestras = 4x oversampling efectivo)
      let v,av;
      v=((ca*.25+cb)*.25+cc)*.25+x1; av=v<0?-v:v; if(av>peak)peak=av;
      v=((ca*.5+cb)*.5+cc)*.5+x1;   av=v<0?-v:v; if(av>peak)peak=av;
      v=((ca*.75+cb)*.75+cc)*.75+x1;av=v<0?-v:v; if(av>peak)peak=av;
    }
  }
  return peak>1e-9?Math.round(20*Math.log10(peak)*10)/10:-100;
}
function calcDR(buf){const bs=Math.round(buf.sampleRate*.1),L=buf.getChannelData(0),R=buf.numberOfChannels>1?buf.getChannelData(1):L,blocks=[];for(let i=0;i<L.length;i+=bs){let sq=0,n=0;for(let j=i;j<Math.min(i+bs,L.length);j++,n++)sq+=(L[j]*L[j]+R[j]*R[j])*.5;if(n>0)blocks.push(Math.sqrt(sq/n));}blocks.sort((a,b)=>b-a);const topN=Math.max(1,Math.round(blocks.length*.2)),overall=Math.sqrt(blocks.reduce((s,v)=>s+v*v,0)/blocks.length),loud=Math.sqrt(blocks.slice(0,topN).reduce((s,v)=>s+v*v,0)/topN);return overall>1e-9?20*Math.log10(loud/overall):0;}
function calcCorr(buf){if(buf.numberOfChannels<2)return 1;const L=buf.getChannelData(0),R=buf.getChannelData(1);let lr=0,l2=0,r2=0;const step=Math.max(1,Math.floor(L.length/80000));for(let i=0;i<L.length;i+=step){lr+=L[i]*R[i];l2+=L[i]*L[i];r2+=R[i]*R[i];}return(l2>0&&r2>0)?Math.max(-1,Math.min(1,lr/Math.sqrt(l2*r2))):0;}
function getBandPower(freqData,minF,maxF,fftSize,sr){const lo=Math.max(0,Math.round(minF*fftSize/sr)),hi=Math.min(freqData.length-1,Math.round(maxF*fftSize/sr));let sum=0,n=0;for(let i=lo;i<=hi;i++){if(freqData[i]>-150){sum+=Math.pow(10,freqData[i]/10);n++;}}return n>0?10*Math.log10(sum/n):-80;}
async function analyzeSpectrum(buf){
  const sr=buf.sampleRate,fftSize=8192;
  // Para audio muy corto, analizar todo; si no, hasta 12s al 35%
  const analyzeS=Math.max(fftSize/sr+0.1, Math.min(buf.duration*.35,12));
  const frameCount=Math.ceil(analyzeS*sr)+fftSize;
  const nc=Math.min(buf.numberOfChannels,2);
  const ctx=new OfflineAudioContext(nc,frameCount,sr);
  const trim=ctx.createBuffer(nc,frameCount,sr);
  for(let ch=0;ch<nc;ch++)trim.copyToChannel(buf.getChannelData(ch).slice(0,frameCount),ch);
  const src=ctx.createBufferSource();src.buffer=trim;
  const analyser=ctx.createAnalyser();analyser.fftSize=fftSize;analyser.smoothingTimeConstant=0;
  src.connect(analyser);analyser.connect(ctx.destination);src.start(0);
  const freqData=new Float32Array(fftSize/2);
  // Suspender justo antes del final para capturar datos del analizador
  const suspendAt=Math.max(fftSize/sr*2, analyzeS-fftSize/sr);
  ctx.suspend(suspendAt).then(()=>{analyser.getFloatFrequencyData(freqData);ctx.resume();});
  await ctx.startRendering();
  return freqData;
}

/* ══════════════════════════════════════
   SETTINGS
══════════════════════════════════════ */
function defaultSettings(){
  return{
    hpf:{enabled:true,freq:22},
    eqSub:{enabled:true,bands:[{freq:200,gain:0,q:2.5},{freq:400,gain:0,q:2.5},{freq:800,gain:0,q:2.0}]},
    sat:{enabled:true,amount:.20},
    comp:{enabled:true,threshold:-18,ratio:2,attack:30,release:200,makeup:2},
    eqAdd:{enabled:true,low:0,lowFreq:120,mid:0,midFreq:1000,high:0,highFreq:8000,air:1.5,airFreq:16000},
    width:{enabled:true,amount:1.10},
    lim:{enabled:true,ceiling:-1.0},
    outGain:{gain:0}, // trim de salida post-limitador, en dB
    loop:{enabled:false,start:0.1,end:0.9} // región de loop (fracciones 0-1)
  };
}
function autoSettings(analysis){
  const s=defaultSettings(),{lufs,dr,correlation,bands}=analysis;
  // LUFS-I tiende a leer 1-3 LU por debajo del RMS simple → coeficiente ajustado a 0.35
  s.comp.makeup=Math.max(0,Math.min(8,(-14-lufs)*.35));
  const drEx=Math.max(0,dr-8);
  s.comp.ratio=Math.min(4,2+drEx*.12);
  s.comp.threshold=Math.max(-28,-16-drEx*.5);
  s.eqSub.bands[0].gain=Math.max(-5,Math.min(0,-bands[1].diff*.40)); // Low (80-250Hz) → 200Hz
  s.eqSub.bands[1].gain=Math.max(-5,Math.min(0,-bands[2].diff*.35)); // Lo-Mid (250-500Hz) → 400Hz
  s.eqSub.bands[2].gain=Math.max(-5,Math.min(0,-bands[3].diff*.25)); // Mid (500-2kHz) → 800Hz
  s.eqAdd.low=Math.max(-4,Math.min(4,-bands[1].diff*.35));
  s.eqAdd.mid=Math.max(-4,Math.min(4,-bands[3].diff*.30));
  s.eqAdd.high=Math.max(-4,Math.min(4,-bands[5].diff*.45));
  s.eqAdd.air=Math.max(-4,Math.min(6,1.5-bands[6].diff*.30));
  s.width.amount=correlation>.93?1.55:correlation>.85?1.35:correlation>.75?1.15:1.05;
  return s;
}

/* ══════════════════════════════════════
   LIVE CHAIN
══════════════════════════════════════ */
let liveChain=null,rawSrc=null,rawGain=null,rawStart=0,rawOffset=0;
let specAnimId=null,liveFreqData=null,liveSpecDrag=null,waveAnimId=null;
const FADE_S=0.055;
let vuPeakL=-Infinity,vuPeakR=-Infinity,vuPeakLt=0,vuPeakRt=0;
const VU_PEAK_HOLD=2000;
let loopDrag=null; // {handle:'start'|'end'}
let _vuBufL=null,_vuBufR=null; // hoisted para evitar alloc a 60fps

function applyLoopToSources(){
  const lp=state.settings.loop, dur=state.origBuf?.duration||1;
  if(liveChain?.src){
    liveChain.src.loop=lp.enabled;
    if(lp.enabled){liveChain.src.loopStart=lp.start*dur;liveChain.src.loopEnd=lp.end*dur;}
  }
  if(rawSrc){
    rawSrc.loop=lp.enabled;
    if(lp.enabled){rawSrc.loopStart=lp.start*dur;rawSrc.loopEnd=lp.end*dur;}
  }
}

function handleLoopDrag(clientX){
  if(!loopDrag)return;
  const canvas=document.getElementById('waveform-canvas'); if(!canvas)return;
  const r=canvas.getBoundingClientRect();
  const f=Math.max(0,Math.min(1,(clientX-r.left)/r.width));
  const lp=state.settings.loop;
  if(loopDrag.handle==='start') lp.start=Math.min(f,lp.end-.02);
  else lp.end=Math.max(f,lp.start+.02);
  applyLoopToSources();
  if(!waveAnimId)drawWaveform();
}
function getAudioCtx(){if(!state.audioCtx)state.audioCtx=new AudioContext();return state.audioCtx;}
function resumeCtx(){const ctx=getAudioCtx();if(ctx.state==='suspended')ctx.resume();return ctx;}
function getCurrentPos(){
  // Calcula la posición correcta teniendo en cuenta el offset de inicio y la región de loop
  function loopPos(elapsed,off,dur,lp){
    if(!lp?.enabled)return Math.min(dur,off+elapsed);
    const ls=lp.start*dur,le=lp.end*dur,ll=le-ls;
    if(ll<0.01)return Math.min(dur,off+elapsed);
    if(off>=le)            return ls+elapsed%ll;           // empezó más allá del loop → Chrome va a loopStart
    if(off>=ls){           // empezó DENTRO del loop
      const T1=le-off;     // tiempo hasta el primer rebobinado
      if(elapsed<T1)return off+elapsed;
      return ls+(elapsed-T1)%ll;
    }
    // empezó ANTES del loop
    const preLoop=ls-off;
    if(elapsed<preLoop)return off+elapsed;
    return ls+(elapsed-preLoop)%ll;
  }
  if(liveChain&&state.playMode==='proc'){
    const elapsed=Math.max(0,getAudioCtx().currentTime-liveChain.startedAt);
    return loopPos(elapsed,liveChain.startOffset||0,liveChain.duration,state.settings.loop);
  }
  if(rawSrc&&state.playMode==='orig'){
    const elapsed=Math.max(0,getAudioCtx().currentTime-rawStart);
    return loopPos(elapsed,rawOffset,state.origBuf?.duration||1,state.settings.loop);
  }
  return state.playbackOffset||0;
}

function buildLiveChain(audioBuffer,settings,offset=0){
  destroyLiveChain();
  const ctx=resumeCtx(),ch={},s=settings;
  const srcBuf=ctx.createBuffer(2,audioBuffer.length,audioBuffer.sampleRate);
  srcBuf.copyToChannel(audioBuffer.getChannelData(0),0);
  srcBuf.copyToChannel(audioBuffer.numberOfChannels>1?audioBuffer.getChannelData(1):audioBuffer.getChannelData(0),1);
  ch.src=ctx.createBufferSource();ch.src.buffer=srcBuf;
  let cur=ch.src;const pipe=node=>{cur.connect(node);cur=node;};
  ch.hpf=ctx.createBiquadFilter();ch.hpf.type='highpass';ch.hpf.frequency.value=s.hpf.enabled?s.hpf.freq:5;ch.hpf.Q.value=.707;pipe(ch.hpf);
  ch.eqSub=[];
  for(const b of s.eqSub.bands){const f=ctx.createBiquadFilter();f.type='peaking';f.frequency.value=b.freq;f.Q.value=b.q;f.gain.value=s.eqSub.enabled?b.gain:0;pipe(f);ch.eqSub.push(f);}
  ch.sat=ctx.createWaveShaper();ch.sat.curve=makeSatCurve(s.sat.enabled?s.sat.amount:0);ch.sat.oversample='4x';pipe(ch.sat);
  ch.comp=ctx.createDynamicsCompressor();ch.comp.threshold.value=s.comp.enabled?s.comp.threshold:0;ch.comp.ratio.value=s.comp.enabled?s.comp.ratio:1;ch.comp.attack.value=s.comp.attack/1000;ch.comp.release.value=s.comp.release/1000;ch.comp.knee.value=6;pipe(ch.comp);
  ch.makeup=ctx.createGain();ch.makeup.gain.value=s.comp.enabled?Math.pow(10,s.comp.makeup/20):1;pipe(ch.makeup);
  ch.eqAdd=[];
  const eqDefs=[
    {type:'lowshelf', freq:s.eqAdd.lowFreq||120,  key:'low'},
    {type:'peaking',  freq:s.eqAdd.midFreq||1000, key:'mid',  q:.7},
    {type:'peaking',  freq:s.eqAdd.highFreq||8000,key:'high', q:.8},
    {type:'highshelf',freq:s.eqAdd.airFreq||16000,key:'air'},
  ];
  for(const def of eqDefs){const f=ctx.createBiquadFilter();f.type=def.type;f.frequency.value=def.freq;f.gain.value=s.eqAdd.enabled?s.eqAdd[def.key]:0;if(def.q)f.Q.value=def.q;pipe(f);ch.eqAdd.push(f);}
  const w=s.width.enabled?s.width.amount:1;
  ch.spl=ctx.createChannelSplitter(2);ch.mer=ctx.createChannelMerger(2);
  ch.ll=ctx.createGain();ch.ll.gain.value=(1+w)/2;ch.rl=ctx.createGain();ch.rl.gain.value=(1-w)/2;
  ch.lr=ctx.createGain();ch.lr.gain.value=(1-w)/2;ch.rr=ctx.createGain();ch.rr.gain.value=(1+w)/2;
  cur.connect(ch.spl);ch.spl.connect(ch.ll,0);ch.spl.connect(ch.rl,1);ch.spl.connect(ch.lr,0);ch.spl.connect(ch.rr,1);
  ch.ll.connect(ch.mer,0,0);ch.rl.connect(ch.mer,0,0);ch.lr.connect(ch.mer,0,1);ch.rr.connect(ch.mer,0,1);cur=ch.mer;
  ch.lim=ctx.createDynamicsCompressor();ch.lim.threshold.value=s.lim.enabled?s.lim.ceiling:0;ch.lim.ratio.value=s.lim.enabled?20:1;ch.lim.attack.value=.001;ch.lim.release.value=.05;ch.lim.knee.value=0;
  cur.connect(ch.lim);
  // Output trim gain: post-limiter, se bake en el export
  ch.outGain=ctx.createGain();ch.outGain.gain.value=Math.pow(10,(s.outGain?.gain||0)/20);
  ch.lim.connect(ch.outGain);
  // masterGain: fade-in/out para A/B limpio
  ch.masterGain=ctx.createGain();ch.masterGain.gain.setValueAtTime(0,ctx.currentTime);ch.masterGain.gain.linearRampToValueAtTime(1,ctx.currentTime+FADE_S);
  ch.outGain.connect(ch.masterGain);ch.masterGain.connect(ctx.destination);
  // Espectro: tap desde outGain (refleja nivel real post-trim)
  ch.analyser=ctx.createAnalyser();ch.analyser.fftSize=4096;ch.analyser.smoothingTimeConstant=0.85;
  ch.outGain.connect(ch.analyser);
  // VU meter L/R: ChannelSplitter + dos analysers independientes
  ch.meterSplit=ctx.createChannelSplitter(2);
  ch.analyserL=ctx.createAnalyser();ch.analyserL.fftSize=2048;ch.analyserL.smoothingTimeConstant=0;
  ch.analyserR=ctx.createAnalyser();ch.analyserR.fftSize=2048;ch.analyserR.smoothingTimeConstant=0;
  ch.outGain.connect(ch.meterSplit);
  ch.meterSplit.connect(ch.analyserL,0);ch.meterSplit.connect(ch.analyserR,1);
  const safeOff=Math.max(0,Math.min(offset,audioBuffer.duration-.1));
  const lp=s.loop;
  if(lp?.enabled){
    ch.src.loop=true;
    ch.src.loopStart=lp.start*audioBuffer.duration;
    ch.src.loopEnd=lp.end*audioBuffer.duration;
  }
  ch.src.start(0,safeOff);
  ch.startedAt=ctx.currentTime;ch.startOffset=safeOff;ch.duration=audioBuffer.duration;
  ch.src.onended=()=>{if(liveChain===ch){liveChain=null;state.isPlaying=false;state.playMode=null;state.playbackOffset=0;render();}};
  liveChain=ch;
}

function destroyLiveChain(){
  if(!liveChain)return;
  stopSpectrumAnim();
  state.playbackOffset=getCurrentPos();
  liveChain.src.onended=null;
  const ch=liveChain; liveChain=null;
  const t=getAudioCtx().currentTime;
  ch.masterGain.gain.cancelScheduledValues(t);
  ch.masterGain.gain.setValueAtTime(ch.masterGain.gain.value,t);
  ch.masterGain.gain.linearRampToValueAtTime(0,t+FADE_S);
  setTimeout(()=>{try{ch.src.stop();}catch(e){}},FADE_S*1000+20);
}
function destroyRawSrc(){
  if(!rawSrc)return;
  rawOffset=getCurrentPos();
  rawSrc.onended=null;
  const src=rawSrc,gain=rawGain; rawSrc=null; rawGain=null;
  const t=getAudioCtx().currentTime;
  if(gain){gain.gain.cancelScheduledValues(t);gain.gain.setValueAtTime(gain.gain.value,t);gain.gain.linearRampToValueAtTime(0,t+FADE_S);}
  setTimeout(()=>{try{src.stop();}catch(e){}},FADE_S*1000+20);
}
function stopAll(){destroyLiveChain();destroyRawSrc();stopWaveformAnim();state.isPlaying=false;state.playMode=null;}

function liveUpdate(key){
  if(!liveChain)return;
  const s=state.settings,t=getAudioCtx().currentTime;
  const ramp=(p,v,tc=.012)=>p.setTargetAtTime(v,t,tc);
  if(key==='hpf.freq'||key==='hpf.enabled') ramp(liveChain.hpf.frequency,s.hpf.enabled?s.hpf.freq:5);
  else if(key==='eqSub.enabled') liveChain.eqSub.forEach((f,i)=>ramp(f.gain,s.eqSub.enabled?s.eqSub.bands[i].gain:0));
  else if(key.startsWith('eqSub.bands.')){const p=key.split('.'),i=+p[2],par=p[3],f=liveChain.eqSub[i];if(par==='gain')ramp(f.gain,s.eqSub.enabled?s.eqSub.bands[i].gain:0);else if(par==='freq')ramp(f.frequency,s.eqSub.bands[i].freq);else if(par==='q')ramp(f.Q,s.eqSub.bands[i].q);}
  else if(key==='sat.amount'||key==='sat.enabled') liveChain.sat.curve=makeSatCurve(s.sat.enabled?s.sat.amount:0);
  else if(key==='comp.enabled'){ramp(liveChain.comp.threshold,s.comp.enabled?s.comp.threshold:0);ramp(liveChain.comp.ratio,s.comp.enabled?s.comp.ratio:1);ramp(liveChain.makeup.gain,s.comp.enabled?Math.pow(10,s.comp.makeup/20):1);}
  else if(key==='comp.threshold') ramp(liveChain.comp.threshold,s.comp.enabled?s.comp.threshold:0);
  else if(key==='comp.ratio')     ramp(liveChain.comp.ratio,s.comp.enabled?s.comp.ratio:1);
  else if(key==='comp.attack')    ramp(liveChain.comp.attack,s.comp.attack/1000);
  else if(key==='comp.release')   ramp(liveChain.comp.release,s.comp.release/1000);
  else if(key==='comp.makeup')    ramp(liveChain.makeup.gain,s.comp.enabled?Math.pow(10,s.comp.makeup/20):1);
  else if(key==='eqAdd.enabled'){const ks=['low','mid','high','air'];liveChain.eqAdd.forEach((f,i)=>ramp(f.gain,s.eqAdd.enabled?s.eqAdd[ks[i]]:0));}
  else if(key.startsWith('eqAdd.')){
    const k=key.split('.')[1];
    const gKeys=['low','mid','high','air'],fKeys=['lowFreq','midFreq','highFreq','airFreq'];
    const gi=gKeys.indexOf(k),fi=fKeys.indexOf(k);
    if(gi>=0) ramp(liveChain.eqAdd[gi].gain,s.eqAdd.enabled?s.eqAdd[k]:0);
    else if(fi>=0) ramp(liveChain.eqAdd[fi].frequency,s.eqAdd[k]||[120,1000,8000,16000][fi]);
  }
  else if(key==='width.amount'||key==='width.enabled'){const w=s.width.enabled?s.width.amount:1;ramp(liveChain.ll.gain,(1+w)/2,.04);ramp(liveChain.rl.gain,(1-w)/2,.04);ramp(liveChain.lr.gain,(1-w)/2,.04);ramp(liveChain.rr.gain,(1+w)/2,.04);}
  else if(key==='lim.ceiling'||key==='lim.enabled'){ramp(liveChain.lim.threshold,s.lim.enabled?s.lim.ceiling:0);ramp(liveChain.lim.ratio,s.lim.enabled?20:1);}
  else if(key==='outGain.gain') ramp(liveChain.outGain.gain,Math.pow(10,s.outGain.gain/20),.020);
}

function applyAllLiveUpdates(){
  if(!liveChain)return;
  ['hpf.enabled','eqSub.enabled','sat.enabled','comp.enabled','eqAdd.enabled','width.enabled','lim.enabled',
   'hpf.freq','sat.amount','comp.threshold','comp.ratio','comp.attack','comp.release','comp.makeup',
   'eqAdd.low','eqAdd.mid','eqAdd.high','eqAdd.air',
   'eqAdd.lowFreq','eqAdd.midFreq','eqAdd.highFreq','eqAdd.airFreq',
   'width.amount','lim.ceiling','outGain.gain'].forEach(k=>liveUpdate(k));
  for(let i=0;i<3;i++)['gain','freq','q'].forEach(p=>liveUpdate(`eqSub.bands.${i}.${p}`));
}

/* ══════════════════════════════════════
   OFFLINE RENDER
══════════════════════════════════════ */
async function processAudio(buf,s){
  const ctx=new OfflineAudioContext(2,buf.length,buf.sampleRate);
  const srcBuf=ctx.createBuffer(2,buf.length,buf.sampleRate);
  srcBuf.copyToChannel(buf.getChannelData(0),0);
  srcBuf.copyToChannel(buf.numberOfChannels>1?buf.getChannelData(1):buf.getChannelData(0),1);
  const src=ctx.createBufferSource();src.buffer=srcBuf;
  let cur=src;const pipe=node=>{cur.connect(node);cur=node;};
  if(s.hpf.enabled){const f=ctx.createBiquadFilter();f.type='highpass';f.frequency.value=s.hpf.freq;f.Q.value=.707;pipe(f);}
  if(s.eqSub.enabled){for(const b of s.eqSub.bands){const f=ctx.createBiquadFilter();f.type='peaking';f.frequency.value=b.freq;f.Q.value=b.q;f.gain.value=b.gain;pipe(f);}}
  if(s.sat.enabled){const ws=ctx.createWaveShaper();ws.curve=makeSatCurve(s.sat.amount);ws.oversample='4x';pipe(ws);}
  if(s.comp.enabled){const c=ctx.createDynamicsCompressor();c.threshold.value=s.comp.threshold;c.ratio.value=s.comp.ratio;c.attack.value=s.comp.attack/1000;c.release.value=s.comp.release/1000;c.knee.value=6;pipe(c);const mk=ctx.createGain();mk.gain.value=Math.pow(10,s.comp.makeup/20);pipe(mk);}
  if(s.eqAdd.enabled){
    const defs=[
      {type:'lowshelf', freq:s.eqAdd.lowFreq||120,  gain:s.eqAdd.low},
      {type:'peaking',  freq:s.eqAdd.midFreq||1000, gain:s.eqAdd.mid,  q:.7},
      {type:'peaking',  freq:s.eqAdd.highFreq||8000,gain:s.eqAdd.high, q:.8},
      {type:'highshelf',freq:s.eqAdd.airFreq||16000,gain:s.eqAdd.air},
    ];
    for(const d of defs){const f=ctx.createBiquadFilter();f.type=d.type;f.frequency.value=d.freq;f.gain.value=d.gain;if(d.q)f.Q.value=d.q;pipe(f);}
  }
  if(s.width.enabled){const w=s.width.amount,spl=ctx.createChannelSplitter(2),mer=ctx.createChannelMerger(2),ll=ctx.createGain(),rl=ctx.createGain(),lr=ctx.createGain(),rr=ctx.createGain();ll.gain.value=(1+w)/2;rl.gain.value=(1-w)/2;lr.gain.value=(1-w)/2;rr.gain.value=(1+w)/2;cur.connect(spl);spl.connect(ll,0);spl.connect(rl,1);spl.connect(lr,0);spl.connect(rr,1);ll.connect(mer,0,0);rl.connect(mer,0,0);lr.connect(mer,0,1);rr.connect(mer,0,1);cur=mer;}
  if(s.lim.enabled){const lim=ctx.createDynamicsCompressor();lim.threshold.value=s.lim.ceiling;lim.ratio.value=20;lim.attack.value=.001;lim.release.value=.05;lim.knee.value=0;pipe(lim);}
  // Output trim: siempre aplicado (0dB = pass-through; se bake en el WAV exportado)
  {const g=ctx.createGain();g.gain.value=Math.pow(10,(s.outGain?.gain||0)/20);pipe(g);}
  cur.connect(ctx.destination);src.start(0);
  return ctx.startRendering();
}

function toWav(buf, bitDepth=24){
  const nc=buf.numberOfChannels, sr=buf.sampleRate, len=buf.length;
  const bps=bitDepth===24?3:2;          // bytes por muestra
  const ab=new ArrayBuffer(44+len*nc*bps), v=new DataView(ab);
  const ws=(o,s)=>{for(let i=0;i<s.length;i++)v.setUint8(o+i,s.charCodeAt(i));};
  // Cabecera WAV estándar
  ws(0,'RIFF'); v.setUint32(4,36+len*nc*bps,true); ws(8,'WAVE'); ws(12,'fmt ');
  v.setUint32(16,16,true);              // chunk size
  v.setUint16(20,1,true);              // PCM
  v.setUint16(22,nc,true);             // canales
  v.setUint32(24,sr,true);             // sample rate
  v.setUint32(28,sr*nc*bps,true);      // byte rate
  v.setUint16(32,nc*bps,true);         // block align
  v.setUint16(34,bitDepth,true);       // bits per sample
  ws(36,'data'); v.setUint32(40,len*nc*bps,true);
  const chs=Array.from({length:nc},(_,ch)=>buf.getChannelData(ch));
  let off=44;
  if(bitDepth===24){
    // 24-bit: rango ±8388607 — NO se aplica dithering (headroom suficiente en 24-bit)
    for(let i=0;i<len;i++){
      for(let ch=0;ch<nc;ch++){
        const s=Math.max(-1,Math.min(1,chs[ch][i]));
        const smp=Math.round(s*8388607); // 2^23 − 1
        // Little-endian 3 bytes (two's complement)
        v.setUint8(off,smp&0xFF);
        v.setUint8(off+1,(smp>>8)&0xFF);
        v.setUint8(off+2,(smp>>16)&0xFF);
        off+=3;
      }
    }
  } else {
    // 16-bit: TPDF dithering triangular ±1 LSB para eliminar distorsión de cuantización
    for(let i=0;i<len;i++){
      for(let ch=0;ch<nc;ch++){
        const dither=(Math.random()-Math.random())/32768; // ±1 LSB triangular
        const s=Math.max(-1,Math.min(1,chs[ch][i]+dither));
        v.setInt16(off,Math.round(s*32767),true); off+=2;
      }
    }
  }
  return ab;
}

/* ══════════════════════════════════════
   STATE
══════════════════════════════════════ */
const state={phase:'upload',fileName:'',origBuf:null,analysis:null,procAnalysis:null,initialSettings:null,settings:defaultSettings(),isPlaying:false,playMode:null,audioCtx:null,openMods:new Set(),playbackOffset:0,selectedEQBand:null,waveformData:null};

/* ══════════════════════════════════════
   RENDER
══════════════════════════════════════ */
function render(){
  document.getElementById('root').innerHTML=buildUI();
  bindEvents();
  requestAnimationFrame(()=>{
    if(state.analysis)drawSpectrum();
    ['eqSub','eqAdd'].forEach(id=>{
      if(state.openMods.has(id)){initEQCanvas(id);drawEQCanvas(id);}
    });
    if(state.origBuf){
      initLiveSpectrumCanvas();
      if(!specAnimId)drawLiveSpectrum();
      initWaveformCanvas();
      if(!waveAnimId){drawWaveform();drawVUMeter();}
    }
  });
}

function buildUI(){if(state.phase==='upload')return buildUpload();if(state.phase==='analyzing')return buildLoading();return buildMain();}

function buildUpload(){return`<div class="card"><div style="display:flex;justify-content:flex-end;margin-bottom:10px"><button class="btn-help" onclick="window.open('help.html','_blank')">? Ayuda</button></div><div class="dropzone" id="dz"><div class="dz-icon">🎵</div><div class="dz-title">Arrastra tu mezcla aquí</div><div class="dz-sub">o haz clic para seleccionar</div><div class="dz-types">MP3 · WAV · FLAC · AAC · OGG · M4A</div></div></div><input type="file" id="fileInput" accept="audio/*" style="display:none">`;}

function buildLoading(){return`<div class="card loading"><div class="loading-icon anim-pulse">🔬</div><div class="loading-title">Analizando y calculando settings…</div><div class="loading-sub">${esc(state.fileName)}</div><div class="pbar"><div class="pfill"></div></div></div>`;}

function buildMain(){return`${buildFileBar()}${buildAnalysisCard()}${buildChainViz()}<div class="card"><div class="section-title"><span class="section-title-text">CADENA DE MÓDULOS — controles en tiempo real</span></div>${MODULES_META.map(m=>buildModule(m)).join('')}</div>${buildLiveSpectrumCard()}${buildWaveformCard()}${buildActions()}`;}

function buildFileBar(){const badge=state.isPlaying&&state.playMode==='proc'?`<span class="live-badge"><span class="live-dot"></span>LIVE MASTER</span>`:state.isPlaying&&state.playMode==='orig'?`<span class="orig-badge">▶ ORIGINAL</span>`:'';return`<div class="file-bar"><span class="file-name">✓ ${esc(state.fileName)}</span><div style="display:flex;align-items:center;gap:10px">${badge}<button class="btn-help" onclick="window.open('help.html','_blank')" title="Abrir ayuda">? Ayuda</button><button class="file-close" id="btnReset" title="Cargar otro">✕</button></div></div>`;}

function buildAnalysisCard(){const{analysis:a,procAnalysis:pa}=state;if(!a)return'';
  const col=(v,lo,hi)=>v>=lo&&v<=hi?'var(--green)':'var(--orange)';
  const fmt=(v,d=1)=>v.toFixed(d);
  const lufsCol=v=>v>=-16&&v<=-9?'var(--green)':v>=-20&&v<=-7?'var(--orange)':'var(--red)';
  const tpCol=v=>v<=-1?'var(--green)':v<=0?'var(--orange)':'var(--red)';
  const issues=getIssues();
return`<div class="card">
  <div class="section-title">
    <span class="section-title-text">ANÁLISIS${pa?' — ANTES / DESPUÉS':' — comparación calculándose…'}</span>
    <button class="section-help-btn" onclick="showHelp('spectrum')" title="¿Cómo leer este gráfico?">?</button>
  </div>
  <canvas id="spectrum"></canvas>
  <div class="spec-legend">${pa?'<strong style="color:#e8eaf8">A</strong> barra color = original &nbsp;·&nbsp; <strong style="color:#e8eaf8">B</strong> barra blanca = masterizado &nbsp;·&nbsp;':''}Línea azul <span style="color:#55aaff">- - -</span> = target pop-rock &nbsp;·&nbsp; número = diferencia al target</div>
  <div class="metrics" style="grid-template-columns:repeat(5,1fr)">
    <div class="metric">
      <div class="metric-val" style="color:${lufsCol(a.lufs)}">${fmt(a.lufs,1)}<span style="font-size:10px"> LUFS</span></div>
      ${pa?`<div class="metric-sub" style="color:${lufsCol(pa.lufs)}">→ ${fmt(pa.lufs,1)} LUFS</div>`:''}
      <div class="metric-label">LUFS-I</div>
    </div>
    <div class="metric">
      <div class="metric-val" style="color:${pa?.truePeak!=null?tpCol(pa.truePeak):'var(--dim)'}">${pa?.truePeak!=null?fmt(pa.truePeak,1):'—'}<span style="font-size:10px">${pa?.truePeak!=null?' dBTP':''}</span></div>
      <div class="metric-sub" style="color:${pa?.truePeak!=null?(pa.truePeak<=-1?'var(--green)':'var(--red)'):'var(--dim)'}">${pa?.truePeak!=null?(pa.truePeak<=-1?'✓ OK para streaming':'⚠ supera −1 dBTP'):pa?'calculando…':''}</div>
      <div class="metric-label">TRUE PEAK</div>
    </div>
    <div class="metric">
      <div class="metric-val" style="color:${col(a.dr,5,14)}">${fmt(a.dr)}<span style="font-size:11px"> dB</span></div>
      ${pa?`<div class="metric-sub">→ ${fmt(pa.dr)} dB</div>`:''}
      <div class="metric-label">RANG. DIN.</div>
    </div>
    <div class="metric">
      <div class="metric-val" style="color:${col(a.correlation,.3,.93)}">${fmt(a.correlation,2)}</div>
      ${pa?`<div class="metric-sub">→ ${fmt(pa.correlation,2)}</div>`:''}
      <div class="metric-label">CORRELAC.</div>
    </div>
    <div class="metric">
      <div class="metric-val" style="color:var(--blue)">${fmt(state.origBuf.duration/60,1)}<span style="font-size:11px"> min</span></div>
      <div class="metric-sub">${fmt(state.origBuf.sampleRate/1000)} kHz</div>
      <div class="metric-label">DURACIÓN</div>
    </div>
  </div>
  ${issues.length?`<div class="issues">${issues.map(i=>`<div class="issue ${i.t}">${i.t==='warn'?'⚠':'→'} ${i.m}</div>`).join('')}</div>`:''}
</div>`;}

function buildChainViz(){
  const nodes=[{label:'HPF',id:'hpf',color:'#ff6b6b'},{label:'EQ−',id:'eqSub',color:'#ffa94d'},{label:'SAT',id:'sat',color:'#ffd43b'},{label:'COMP',id:'comp',color:'#69db7c'},{label:'EQ+',id:'eqAdd',color:'#4dabf7'},{label:'WIDTH',id:'width',color:'#cc5de8'},{label:'LIM',id:'lim',color:'#f783ac'}];
  return`<div class="chain-viz" style="justify-content:center;position:relative;flex-wrap:wrap;gap:4px">
  <span class="chain-label">IN</span>
  <span class="chain-arrow">→</span>
  ${nodes.map(n=>{
    const on=state.settings[n.id].enabled;
    const open=state.openMods.has(n.id);
    return`<button class="chain-node ${on?'on':''}" data-modid="${n.id}" title="${open?'Cerrar':'Abrir'} ${n.label}" style="cursor:pointer;background:${open?`rgba(${hexToRgb(n.color)},.15)`:'transparent'};color:${on?n.color:'#505070'};border-color:${on?(open?n.color:'#606080'):'#404060'};transform:${open?'scale(1.08)':'none'}">${n.label}</button>
    <span class="chain-arrow">→</span>`;
  }).join('')}
  <span class="chain-label">OUT</span>
  <button class="section-help-btn" onclick="showHelp('chain')" title="¿Qué es la cadena?" style="position:absolute;right:4px;top:50%;transform:translateY(-50%)">?</button>
</div>`;}
function hexToRgb(hex){const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);return`${r},${g},${b}`;}

function buildModule(meta){const{id,name,color,desc}=meta,s=state.settings[id],open=state.openMods.has(id);
return`<div class="module ${s.enabled?'on':''}" style="--mc:${color}">
  <div class="mod-header" data-mid="${id}">
    <div class="mod-dot"></div>
    <div class="mod-name" style="color:${s.enabled?color:'#606080'}">${name}</div>
    <div class="mod-summary">${modSummary(id)}</div>
    <button class="mod-icon-btn mod-help-btn" title="Ayuda" onclick="event.stopPropagation();showHelp('${id}')">?</button>
    <button class="mod-icon-btn mod-reset-btn" data-resetmod="${id}" title="Reset al valor calculado" onclick="event.stopPropagation()">↺</button>
    <label class="toggle" onclick="event.stopPropagation()"><input type="checkbox" ${s.enabled?'checked':''} data-toggle="${id}"><span class="toggle-track"></span></label>
    <div class="mod-arrow ${open?'open':''}">▼</div>
  </div>
  <div class="mod-body ${open?'open':''}">
    <div class="mod-desc">${desc}</div>
    ${buildModBody(id)}
  </div>
</div>`;}

function modSummary(id){const s=state.settings[id];if(!s.enabled)return'<span style="color:#404060">bypass</span>';const f1=v=>(v>0?'+':'')+v.toFixed(1);switch(id){case'hpf':return`${s.freq} Hz`;case'eqSub':return s.bands.map(b=>f1(b.gain)+'dB').join(' ');case'sat':return`${(s.amount*100).toFixed(0)}%`;case'comp':return`${s.ratio.toFixed(1)}:1 @ ${s.threshold}dB`;case'eqAdd':return`L${f1(s.low)} M${f1(s.mid)} Air${f1(s.air)}`;case'width':return`×${s.amount.toFixed(2)}`;case'lim':return`${s.ceiling} dBFS`;default:return'';}}

function buildModBody(id){
  const s=state.settings[id];
  switch(id){
    case'hpf':
      return sl('hpf.freq','Frecuencia de corte',s.freq,15,80,1,'Hz');
    case'eqSub':
      return `
        <div class="eq-wrap">
          <canvas id="eq-canvas-eqSub" class="eq-canvas"></canvas>
          <div id="eq-readout-eqSub" class="eq-readout">
            <span style="color:var(--dim);font-size:11px">Haz clic en un nodo para seleccionarlo</span>
          </div>
          <div class="eq-hint">↕ arrastrar = ganancia &nbsp;·&nbsp; ↔ arrastrar = frecuencia &nbsp;·&nbsp; 🖱 rueda = Q</div>
        </div>
        <div class="eq-q-section">
          <div class="eq-q-title">Q POR BANDA (anchura del filtro)</div>
          ${s.bands.map((b,i)=>`
            <div class="slider-row">
              <div class="slider-top">
                <span class="slider-label" style="color:var(--orange)">Banda ${i+1}</span>
                <span class="slider-val" id="eq-qval-${i}">${b.q.toFixed(1)}</span>
              </div>
              <input type="range" id="eq-q-${i}" min=".5" max="10" step=".1" value="${b.q}" data-band="${i}" class="eq-q-slider">
            </div>`).join('')}
        </div>`;
    case'sat':
      return `${sl('sat.amount','Calidez (tape warmth)',s.amount,0,.8,.01,'')}<div style="font-size:12px;color:var(--muted);margin-top:5px">0 = digital limpio · 0.8 = saturación intensa</div>`;
    case'comp':
      return `${sl('comp.threshold','Threshold',s.threshold,-40,0,1,'dB')}${sl('comp.ratio','Ratio',s.ratio,1.5,8,.5,':1')}${sl('comp.attack','Attack',s.attack,5,300,5,'ms')}${sl('comp.release','Release',s.release,50,600,10,'ms')}${sl('comp.makeup','Makeup Gain',s.makeup,0,12,.5,'dB')}`;
    case'eqAdd':
      return `
        <div class="eq-wrap">
          <canvas id="eq-canvas-eqAdd" class="eq-canvas"></canvas>
          <div id="eq-readout-eqAdd" class="eq-readout">
            <span style="color:var(--dim);font-size:11px">Haz clic en un nodo para seleccionarlo</span>
          </div>
          <div class="eq-hint">↕ arrastrar = ganancia &nbsp;·&nbsp; ↔ arrastrar = frecuencia (peaks Mid/High) &nbsp;·&nbsp; Low/Air shelf = solo ganancia</div>
        </div>`;
    case'width':
      return `${sl('width.amount','Amplitud M/S',s.amount,.5,2,.05,'')}<div style="font-size:12px;color:var(--muted);margin-top:5px">1.0 = original · &lt;1.0 mono · &gt;1.0 más ancho</div>`;
    case'lim':
      return `${sl('lim.ceiling','Ceiling (techo)',s.ceiling,-6,-.1,.1,'dBFS')}<div style="font-size:12px;color:var(--muted);margin-top:5px">-1.0 dBFS recomendado para Spotify / Apple Music</div>`;
    default:
      return '';
  }
}

function sl(key,label,val,min,max,step,unit){const id='v-'+key.replace(/[.\[\]]/g,'-');return`<div class="slider-row"><div class="slider-top"><span class="slider-label">${label}</span><span class="slider-val" id="${id}">${fmtVal(val,unit)}</span></div><input type="range" min="${min}" max="${max}" step="${step}" value="${val}" data-key="${key}" data-unit="${unit}" class="pslider"></div>`;}
function fmtVal(v,unit){const n=typeof v==='number'?v:parseFloat(v),plus=(unit==='dB'||unit==='dBFS')&&n>0?'+':'',dec=(unit==='ms'||unit==='Hz')?0:(unit===''||unit===':1')?2:1;return`${plus}${n.toFixed(dec)}${unit}`;}

function buildActions(){const{isPlaying,playMode}=state;
const loopOn=state.settings.loop?.enabled;
return`<div class="card">
  <div class="actions">
    <button class="btn btn-proc ${isPlaying&&playMode==='proc'?'active':''}" id="btnPlayProc">${isPlaying&&playMode==='proc'?'⏸ Masterizado':'▶ Masterizado'}</button>
    <button class="btn btn-orig ${isPlaying&&playMode==='orig'?'active':''}" id="btnPlayOrig">${isPlaying&&playMode==='orig'?'⏸ Original':'▶ Original'}</button>
    <button class="btn btn-stop" id="btnStop" title="Stop">⏹</button>
    <button class="btn ${loopOn?'active':''}" id="btnLoop" title="Activar/desactivar loop region" style="color:var(--purple);border-color:${loopOn?'var(--purple)':'var(--dim)'};background:${loopOn?'rgba(204,93,232,.18)':'transparent'}">⟳ Loop</button>
    <div style="display:flex;gap:0;border:1px solid var(--yellow);border-radius:8px;overflow:hidden;flex-shrink:0">
      <button class="btn btn-export" id="btnExport" style="border:none;border-radius:0;border-right:1px solid var(--yellow)">⬇ WAV</button>
      <select id="bitDepth" title="Profundidad de bits" style="background:#0a0a1a;color:var(--yellow);border:none;font-size:12px;font-weight:bold;padding:0 10px;cursor:pointer;outline:none;letter-spacing:.5px">
        <option value="24" selected>24-bit</option>
        <option value="16">16-bit</option>
      </select>
    </div>
    <button class="btn btn-secondary" id="btnResetS">↺ Reset</button>
    <button class="btn-icon-action" id="btnSavePreset" title="Guardar preset">${ICON_SAVE}</button>
    <button class="btn-icon-action" id="btnLoadPreset" title="Cargar preset">${ICON_LOAD}</button>
    <input type="file" id="presetInput" accept=".mpreset,.json" style="display:none">
  </div>
  <div class="tip">
    <strong>Tiempo real:</strong> arrastra los nodos de EQ o mueve sliders mientras escuchas.<br>
    <strong>A/B:</strong> alterna Masterizado / Original sin perder posición. &nbsp;·&nbsp; <strong>?</strong> = ayuda &nbsp;·&nbsp; <strong>↺</strong> = reset módulo
  </div>
</div>`;}

/* ══════════════════════════════════════
   SPECTRUM CANVAS
══════════════════════════════════════ */
function drawSpectrum(){
  const canvas=document.getElementById('spectrum');if(!canvas||!state.analysis)return;
  const dpr=Math.min(window.devicePixelRatio||1,2);
  const W=canvas.offsetWidth,H=canvas.offsetHeight||200;
  canvas.width=W*dpr;canvas.height=H*dpr;
  const ctx=canvas.getContext('2d');ctx.scale(dpr,dpr);
  const PAD_L=34,PAD_B=22,PAD_T=18;
  const chartW=W-PAD_L,chartH=H-PAD_B-PAD_T;
  const dbMin=-65,dbMax=0;
  const toY=db=>PAD_T+chartH*(1-(Math.max(dbMin,Math.min(dbMax,db))-dbMin)/(dbMax-dbMin));
  ctx.fillStyle='#060614';ctx.fillRect(0,0,W,H);
  [-20,-40,-60].forEach(db=>{const y=toY(db);ctx.strokeStyle='#1e1e40';ctx.lineWidth=1;ctx.setLineDash([4,4]);ctx.beginPath();ctx.moveTo(PAD_L,y);ctx.lineTo(W,y);ctx.stroke();ctx.setLineDash([]);ctx.fillStyle='#6060a0';ctx.font='bold 10px monospace';ctx.textAlign='right';ctx.fillText(db+'dB',PAD_L-4,y+4);});
  ctx.strokeStyle='#2a2a5a';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(PAD_L,toY(0));ctx.lineTo(W,toY(0));ctx.stroke();ctx.fillStyle='#7070b0';ctx.font='bold 10px monospace';ctx.textAlign='right';ctx.fillText('0dB',PAD_L-4,toY(0)+4);
  const bands=state.analysis.bands,pBands=state.procAnalysis?.bands;
  const hasProc=!!pBands,bw=chartW/bands.length,GAP=4;
  const origW=hasProc?bw*.42-GAP:bw*.68,procW=hasProc?bw*.42-GAP:0;
  bands.forEach((b,i)=>{
    const x=PAD_L+i*bw,origX=x+GAP,procX=x+bw*.50;
    ctx.strokeStyle='#181830';ctx.lineWidth=1;ctx.setLineDash([]);ctx.beginPath();ctx.moveTo(x,PAD_T);ctx.lineTo(x,H-PAD_B);ctx.stroke();
    const ty=toY(b.target);ctx.strokeStyle='#55aaff';ctx.lineWidth=2.5;ctx.setLineDash([7,4]);ctx.beginPath();ctx.moveTo(x+2,ty);ctx.lineTo(x+bw-2,ty);ctx.stroke();ctx.setLineDash([]);
    const origTop=toY(b.value),origH=Math.max(3,H-PAD_B-origTop);
    const gOrig=ctx.createLinearGradient(0,origTop,0,H-PAD_B);gOrig.addColorStop(0,b.color);gOrig.addColorStop(1,b.color+'33');
    ctx.globalAlpha=1;ctx.fillStyle=gOrig;
    if(ctx.roundRect){ctx.beginPath();ctx.roundRect(origX,origTop,origW,origH,[3,3,0,0]);ctx.fill();}else ctx.fillRect(origX,origTop,origW,origH);
    if(origH>18){ctx.fillStyle='rgba(0,0,0,0.65)';ctx.font='bold 9px sans-serif';ctx.textAlign='center';ctx.fillText('A',origX+origW/2,origTop+12);}
    if(hasProc&&pBands){
      const pb=pBands[i],procTop=toY(pb.value),procH=Math.max(3,H-PAD_B-procTop);
      const gProc=ctx.createLinearGradient(0,procTop,0,H-PAD_B);gProc.addColorStop(0,'rgba(255,255,255,0.90)');gProc.addColorStop(1,'rgba(255,255,255,0.25)');
      ctx.globalAlpha=1;ctx.fillStyle=gProc;
      if(ctx.roundRect){ctx.beginPath();ctx.roundRect(procX,procTop,procW,procH,[3,3,0,0]);ctx.fill();}else ctx.fillRect(procX,procTop,procW,procH);
      ctx.fillStyle=b.color;ctx.fillRect(procX,procTop,procW,3);
      if(procH>18){ctx.fillStyle='rgba(0,0,0,0.65)';ctx.font='bold 9px sans-serif';ctx.textAlign='center';ctx.fillText('B',procX+procW/2,procTop+13);}
      const pdiff=pb.value-b.target,pc=Math.abs(pdiff)<3?'#50f060':Math.abs(pdiff)<6?'#ffb030':'#ff7070';
      ctx.globalAlpha=1;ctx.fillStyle=pc;ctx.font=`bold ${Math.max(9,Math.min(11,bw*.22))}px monospace`;ctx.textAlign='center';ctx.fillText((pdiff>0?'+':'')+pdiff.toFixed(0),procX+procW/2,Math.max(PAD_T+11,procTop-5));
    }
    ctx.globalAlpha=1;
    const diff=b.value-b.target,dc=Math.abs(diff)<3?'#60e870':Math.abs(diff)<6?'#ffb030':'#ff5050';
    ctx.fillStyle=dc;ctx.font=`bold ${Math.max(10,Math.min(12,bw*.28))}px monospace`;ctx.textAlign='center';ctx.fillText((diff>0?'+':'')+diff.toFixed(0),origX+origW/2,Math.max(PAD_T+12,origTop-5));
    ctx.fillStyle='#c0c0e8';ctx.font=`bold ${Math.max(10,Math.min(13,bw*.28))}px sans-serif`;ctx.textAlign='center';ctx.fillText(b.name,x+bw/2,H-5);
  });
}

function getIssues(){const{analysis:a}=state;if(!a)return[];const r=[];if(a.lufs<-22)r.push({t:'info',m:`Nivel bajo (${a.lufs.toFixed(1)} dB) → el master lo subirá hacia -14 LUFS`});if(a.lufs>-6)r.push({t:'warn',m:`Nivel muy alto (${a.lufs.toFixed(1)} dB) → revisa clipping`});if(a.dr>14)r.push({t:'info',m:`DR alto (${a.dr.toFixed(1)} dB) → el compresor aplicará glue`});if(a.dr<4)r.push({t:'warn',m:`DR bajo (${a.dr.toFixed(1)} dB) → ya muy comprimido`});if(a.correlation>.93)r.push({t:'info',m:'Audio casi mono → se ampliará el campo estéreo (M/S)'});if(a.correlation<.25)r.push({t:'warn',m:'Correlación muy baja → posibles problemas de fase'});a.bands.filter(b=>b.diff>5).forEach(b=>r.push({t:'info',m:`${b.name}: ${b.diff.toFixed(1)}dB sobre target → EQ auto-calculada`}));return r;}

/* ══════════════════════════════════════
   EQ CANVAS — Gráfico de EQ interactivo
══════════════════════════════════════ */

// Respuesta en magnitud de un filtro biquad — matemática pura, sin AudioContext
function biquadMag(type, freq, gainDB, Q, testFreq, SR) {
  if(freq<=0||testFreq<=0||SR<=0)return 1;
  const w0=2*Math.PI*Math.min(freq,SR/2-1)/SR, cw0=Math.cos(w0), sw0=Math.sin(w0);
  const A=Math.pow(10,gainDB/40), sqA=Math.sqrt(A);
  const alpha=sw0/(2*Math.max(0.1,Q));
  let b0,b1,b2,a0,a1,a2;
  switch(type){
    case'peaking':
      b0=1+alpha*A; b1=-2*cw0; b2=1-alpha*A;
      a0=1+alpha/A; a1=-2*cw0; a2=1-alpha/A; break;
    case'lowshelf':
      b0=A*((A+1)-(A-1)*cw0+2*sqA*alpha); b1=2*A*((A-1)-(A+1)*cw0); b2=A*((A+1)-(A-1)*cw0-2*sqA*alpha);
      a0=(A+1)+(A-1)*cw0+2*sqA*alpha;     a1=-2*((A-1)+(A+1)*cw0); a2=(A+1)+(A-1)*cw0-2*sqA*alpha; break;
    case'highshelf':
      b0=A*((A+1)+(A-1)*cw0+2*sqA*alpha); b1=-2*A*((A-1)+(A+1)*cw0); b2=A*((A+1)+(A-1)*cw0-2*sqA*alpha);
      a0=(A+1)-(A-1)*cw0+2*sqA*alpha;     a1=2*((A-1)-(A+1)*cw0);   a2=(A+1)-(A-1)*cw0-2*sqA*alpha; break;
    default: return 1;
  }
  const B0=b0/a0,B1=b1/a0,B2=b2/a0,A1=a1/a0,A2=a2/a0;
  const w=2*Math.PI*testFreq/SR;
  const cw=Math.cos(w),sw=Math.sin(w),c2w=Math.cos(2*w),s2w=Math.sin(2*w);
  const nr=B0+B1*cw+B2*c2w, ni=-(B1*sw+B2*s2w);
  const dr=1+A1*cw+A2*c2w, di=-(A1*sw+A2*s2w);
  const den=dr*dr+di*di;
  return den<1e-20?1:Math.sqrt((nr*nr+ni*ni)/den);
}

// Datos de bandas para cada módulo EQ
function getEQBands(moduleId){
  const s=state.settings;
  if(moduleId==='eqSub'){
    return{
      bands: s.eqSub.bands.map(b=>({freq:b.freq,gain:b.gain,q:b.q})),
      types: ['peaking','peaking','peaking'],
      colors:['#ff8030','#ffb020','#ffd828'],
      color: '#ffa94d',
      gainMin:-14, gainMax:6,
      freqMin:50,  freqMax:6000,
      fixedFreq:[false,false,false],
      hasQ:true,
    };
  } else {
    return{
      bands:[
        {freq:s.eqAdd.lowFreq??120,  gain:s.eqAdd.low,  q:1.0},
        {freq:s.eqAdd.midFreq??1000, gain:s.eqAdd.mid,  q:0.7},
        {freq:s.eqAdd.highFreq??8000,gain:s.eqAdd.high, q:0.8},
        {freq:s.eqAdd.airFreq??16000,gain:s.eqAdd.air,  q:1.0},
      ],
      types: ['lowshelf','peaking','peaking','highshelf'],
      colors:['#3090ff','#40c0ff','#40e0ff','#80f0ff'],
      color: '#4dabf7',
      gainMin:-10, gainMax:10,
      freqMin:20,  freqMax:22000,
      fixedFreq:[true,false,false,true],
      hasQ:false,
    };
  }
}

// Coordenadas EQ
const EQ_P={L:30,R:6,T:14,B:18};
const EQ_FMIN=20, EQ_FMAX=22000;
function eqFx(f,W){return EQ_P.L+(W-EQ_P.L-EQ_P.R)*Math.log(f/EQ_FMIN)/Math.log(EQ_FMAX/EQ_FMIN);}
function eqGy(g,H,lo,hi){return EQ_P.T+(H-EQ_P.T-EQ_P.B)*(1-(g-lo)/(hi-lo));}
function eqYg(y,H,lo,hi){return lo+(hi-lo)*(1-(y-EQ_P.T)/(H-EQ_P.T-EQ_P.B));}

function drawEQCanvas(moduleId){
  const canvas=document.getElementById('eq-canvas-'+moduleId);
  if(!canvas)return;
  const dpr=Math.min(window.devicePixelRatio||1,2);
  const W=canvas.offsetWidth, H=canvas.offsetHeight||170;
  if(W<10)return;
  canvas.width=W*dpr; canvas.height=H*dpr;
  const ctx=canvas.getContext('2d'); ctx.scale(dpr,dpr);
  const SR=state.origBuf?.sampleRate||44100;
  const{bands,types,colors,color,gainMin,gainMax}=getEQBands(moduleId);
  const N=256;

  // Fondo
  ctx.fillStyle='#060614'; ctx.fillRect(0,0,W,H);

  // Grid de frecuencias
  [32,63,125,250,500,1000,2000,4000,8000,16000].forEach(f=>{
    const x=eqFx(f,W);
    if(x<EQ_P.L||x>W-EQ_P.R)return;
    ctx.strokeStyle='#181836'; ctx.lineWidth=1; ctx.setLineDash([2,3]);
    ctx.beginPath(); ctx.moveTo(x,EQ_P.T); ctx.lineTo(x,H-EQ_P.B); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle='#383870'; ctx.font='9px monospace'; ctx.textAlign='center';
    ctx.fillText(f>=1000?(f/1000)+'k':String(f), x, H-3);
  });

  // Grid de dB
  for(let d=Math.ceil(gainMin/3)*3; d<=gainMax; d+=3){
    const y=eqGy(d,H,gainMin,gainMax);
    if(y<EQ_P.T-2||y>H-EQ_P.B+2)continue;
    ctx.strokeStyle=d===0?'#303068':'#181836';
    ctx.lineWidth=d===0?1.5:1; ctx.setLineDash(d===0?[]:[2,3]);
    ctx.beginPath(); ctx.moveTo(EQ_P.L,y); ctx.lineTo(W-EQ_P.R,y); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle=d===0?'#6060b0':'#303060'; ctx.font='bold 9px monospace'; ctx.textAlign='right';
    ctx.fillText((d>0?'+':'')+d, EQ_P.L-3, y+3);
  }

  // Curvas individuales (tenues)
  bands.forEach((band,idx)=>{
    ctx.globalAlpha=.22; ctx.strokeStyle=colors[idx]; ctx.lineWidth=1.2; ctx.setLineDash([2,3]);
    ctx.beginPath();
    for(let i=0;i<N;i++){
      const f=EQ_FMIN*Math.pow(EQ_FMAX/EQ_FMIN,i/(N-1));
      const db=20*Math.log10(Math.max(1e-10,biquadMag(types[idx],band.freq,band.gain,band.q||0.707,f,SR)));
      const x=eqFx(f,W), y=eqGy(db,H,gainMin,gainMax);
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    }
    ctx.stroke(); ctx.setLineDash([]);
  });

  // Curva combinada — puntos
  const pts=[];
  for(let i=0;i<N;i++){
    const f=EQ_FMIN*Math.pow(EQ_FMAX/EQ_FMIN,i/(N-1));
    let mag=1; bands.forEach((b,idx)=>mag*=biquadMag(types[idx],b.freq,b.gain,b.q||0.707,f,SR));
    pts.push({x:eqFx(f,W), y:eqGy(20*Math.log10(Math.max(1e-10,mag)),H,gainMin,gainMax)});
  }
  const y0=eqGy(0,H,gainMin,gainMax);

  // Relleno bajo la curva
  ctx.beginPath(); ctx.moveTo(pts[0].x,y0);
  pts.forEach(p=>ctx.lineTo(p.x,p.y));
  ctx.lineTo(pts[N-1].x,y0); ctx.closePath();
  const grad=ctx.createLinearGradient(0,EQ_P.T,0,H-EQ_P.B);
  grad.addColorStop(0,color+'44'); grad.addColorStop(1,color+'06');
  ctx.fillStyle=grad; ctx.globalAlpha=.6; ctx.fill();

  // Línea de curva
  ctx.globalAlpha=1; ctx.strokeStyle=color; ctx.lineWidth=2.5; ctx.setLineDash([]);
  ctx.beginPath(); pts.forEach((p,i)=>i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y)); ctx.stroke();

  // Nodos
  const sel=state.selectedEQBand;
  bands.forEach((band,idx)=>{
    const x=eqFx(band.freq,W), y=eqGy(band.gain,H,gainMin,gainMax);
    const isSel=sel?.moduleId===moduleId&&sel?.bandIndex===idx;
    if(isSel){
      ctx.globalAlpha=.3; ctx.strokeStyle=colors[idx]; ctx.lineWidth=8;
      ctx.beginPath(); ctx.arc(x,y,13,0,Math.PI*2); ctx.stroke();
    }
    ctx.globalAlpha=1; ctx.fillStyle=colors[idx];
    ctx.beginPath(); ctx.arc(x,y,8,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle=isSel?'#fff':colors[idx]; ctx.lineWidth=isSel?2:1.5;
    ctx.beginPath(); ctx.arc(x,y,8,0,Math.PI*2); ctx.stroke();
    ctx.fillStyle='#000'; ctx.font='bold 10px sans-serif'; ctx.textAlign='center';
    ctx.fillText(String(idx+1),x,y+3.5);
    ctx.globalAlpha=1;
  });
}

function updateEQReadout(moduleId){
  const el=document.getElementById('eq-readout-'+moduleId); if(!el)return;
  const sel=state.selectedEQBand;
  if(!sel||sel.moduleId!==moduleId){
    el.innerHTML='<span style="color:var(--dim);font-size:11px">Haz clic en un nodo para seleccionarlo</span>';
    return;
  }
  const{bands,hasQ}=getEQBands(moduleId);
  const b=bands[sel.bandIndex];
  const fStr=b.freq>=1000?(b.freq/1000).toFixed(1)+'k':Math.round(b.freq)+'';
  const gStr=(b.gain>=0?'+':'')+b.gain.toFixed(1);
  el.innerHTML=`
    <span><span class="lbl">Banda </span><span class="val">${sel.bandIndex+1}</span></span>
    <span><span class="lbl">Freq </span><span class="val">${fStr} Hz</span></span>
    <span><span class="lbl">Gain </span><span class="val">${gStr} dB</span></span>
    ${hasQ?`<span><span class="lbl">Q </span><span class="val">${b.q?.toFixed(1)||'–'}</span></span><span style="flex:1"></span><span style="font-size:10px;color:var(--dim)">🖱 rueda = Q</span>`:''}
  `;
}

// Drag state global
let eqDrag=null;

function startEQDrag(moduleId,cx,cy,e){
  const canvas=document.getElementById('eq-canvas-'+moduleId); if(!canvas)return;
  const W=canvas.offsetWidth, H=canvas.offsetHeight;
  const{bands,gainMin,gainMax,freqMin,freqMax,fixedFreq}=getEQBands(moduleId);
  let hit=-1;
  for(let i=bands.length-1;i>=0;i--){
    const bx=eqFx(bands[i].freq,W), by=eqGy(bands[i].gain,H,gainMin,gainMax);
    if(Math.sqrt((cx-bx)**2+(cy-by)**2)<=14){hit=i;break;}
  }
  if(hit<0){state.selectedEQBand=null;updateEQReadout(moduleId);drawEQCanvas(moduleId);return;}
  state.selectedEQBand={moduleId,bandIndex:hit};
  eqDrag={moduleId,bandIndex:hit,startCx:cx,startCy:cy,
    startFreq:bands[hit].freq,startGain:bands[hit].gain,
    gainMin,gainMax,freqMin,freqMax,fixedFreq,H};
  updateEQReadout(moduleId); drawEQCanvas(moduleId);
  if(e)e.preventDefault();
}

function handleEQMove(clientX,clientY){
  if(!eqDrag)return;
  const canvas=document.getElementById('eq-canvas-'+eqDrag.moduleId); if(!canvas)return;
  const r=canvas.getBoundingClientRect();
  const cx=clientX-r.left, cy=clientY-r.top;
  const{moduleId,bandIndex,startCx,startCy,startFreq,startGain,gainMin,gainMax,freqMin,freqMax,fixedFreq,H}=eqDrag;
  const newGain=Math.max(gainMin,Math.min(gainMax,startGain-(cy-startCy)*(gainMax-gainMin)/H*2));
  let newFreq=startFreq;
  if(!fixedFreq[bandIndex]){
    const logR=(cx-startCx)/canvas.offsetWidth*2.5;
    newFreq=Math.max(freqMin,Math.min(freqMax,Math.round(startFreq*Math.pow(freqMax/freqMin,logR))));
    // Prevent crossing neighbors — clamp between adjacent band frequencies
    const allBands=getEQBands(moduleId).bands;
    const loLim=bandIndex>0?Math.round(allBands[bandIndex-1].freq)+1:freqMin;
    const hiLim=bandIndex<allBands.length-1?Math.round(allBands[bandIndex+1].freq)-1:freqMax;
    newFreq=Math.max(loLim,Math.min(hiLim,newFreq));
  }
  applyEQChange(moduleId,bandIndex,newFreq,newGain,null);
}

function applyEQChange(moduleId,bandIndex,newFreq,newGain,newQ){
  if(moduleId==='eqSub'){
    const b=state.settings.eqSub.bands[bandIndex];
    if(newFreq!==null)b.freq=newFreq;
    if(newGain!==null)b.gain=parseFloat(newGain.toFixed(2));
    if(newQ!==null)b.q=parseFloat(newQ.toFixed(2));
    if(newFreq!==null)liveUpdate(`eqSub.bands.${bandIndex}.freq`);
    if(newGain!==null)liveUpdate(`eqSub.bands.${bandIndex}.gain`);
    if(newQ!==null){
      liveUpdate(`eqSub.bands.${bandIndex}.q`);
      const sl=document.getElementById('eq-q-'+bandIndex);
      const vl=document.getElementById('eq-qval-'+bandIndex);
      if(sl)sl.value=b.q; if(vl)vl.textContent=b.q.toFixed(1);
    }
  } else {
    const gMap=['low','mid','high','air'], fMap=['lowFreq','midFreq','highFreq','airFreq'];
    const s=state.settings.eqAdd;
    if(newFreq!==null){s[fMap[bandIndex]]=newFreq; liveUpdate('eqAdd.'+fMap[bandIndex]);}
    if(newGain!==null){s[gMap[bandIndex]]=parseFloat(newGain.toFixed(2)); liveUpdate('eqAdd.'+gMap[bandIndex]);}
  }
  drawEQCanvas(moduleId);
  updateEQReadout(moduleId);
  const sum=document.querySelector(`[data-mid="${moduleId}"] .mod-summary`);
  if(sum)sum.textContent=modSummary(moduleId);
  if(!specAnimId)drawLiveSpectrum(); // redibuja EQ curve cuando no hay animación activa
}

function initEQCanvas(moduleId){
  const canvas=document.getElementById('eq-canvas-'+moduleId); if(!canvas)return;
  // Evitar doble-inicialización
  if(canvas._eqInit)return; canvas._eqInit=true;

  canvas.addEventListener('mousedown',e=>{
    const r=canvas.getBoundingClientRect();
    startEQDrag(moduleId,e.clientX-r.left,e.clientY-r.top,e);
  });
  canvas.addEventListener('touchstart',e=>{
    const r=canvas.getBoundingClientRect();
    startEQDrag(moduleId,e.touches[0].clientX-r.left,e.touches[0].clientY-r.top,e);
  },{passive:false});
  canvas.addEventListener('wheel',e=>{
    if(moduleId!=='eqSub')return;
    const sel=state.selectedEQBand;
    if(!sel||sel.moduleId!=='eqSub')return;
    e.preventDefault();
    const b=state.settings.eqSub.bands[sel.bandIndex];
    const newQ=Math.max(0.5,Math.min(10,b.q+(e.deltaY>0?.2:-.2)));
    applyEQChange('eqSub',sel.bandIndex,null,null,newQ);
  },{passive:false});
}

// Handlers globales de drag (se registran una sola vez)
document.addEventListener('mousemove',e=>{
  if(eqDrag)handleEQMove(e.clientX,e.clientY);
  if(liveSpecDrag)handleLiveSpecMove(e.clientX,e.clientY);
  if(loopDrag)handleLoopDrag(e.clientX);
});
document.addEventListener('touchmove',e=>{
  if(eqDrag){handleEQMove(e.touches[0].clientX,e.touches[0].clientY);if(e.cancelable)e.preventDefault();}
  if(liveSpecDrag){handleLiveSpecMove(e.touches[0].clientX,e.touches[0].clientY);if(e.cancelable)e.preventDefault();}
  if(loopDrag){handleLoopDrag(e.touches[0].clientX);if(e.cancelable)e.preventDefault();}
},{passive:false});
document.addEventListener('mouseup',()=>{eqDrag=null;liveSpecDrag=null;loopDrag=null;});
document.addEventListener('touchend',()=>{eqDrag=null;liveSpecDrag=null;loopDrag=null;});

/* ══════════════════════════════════════
   LIVE SPECTRUM ANALYZER
══════════════════════════════════════ */

// Constantes de coordenadas — compartidas entre draw y drag
const LS_PAD={L:40,R:10,T:18,B:26};
const LS_FMIN=20, LS_FMAX=22000;
const LS_DB_MIN=-90, LS_DB_MAX=0;
const LS_EQ_CENTER=0.32;   // 0dB EQ line at 32% from chart top
const LS_EQ_SCALE=0.28;    // ±12dB span = 28% of chart height
const LS_EQ_GAIN_RANGE=12; // dB per visual scale unit

function lsToX(f,chartW){return LS_PAD.L+chartW*Math.log(Math.max(f,LS_FMIN)/LS_FMIN)/Math.log(LS_FMAX/LS_FMIN);}
function lsSpecY(db,chartH){return LS_PAD.T+chartH*(1-(Math.max(LS_DB_MIN,Math.min(LS_DB_MAX,db))-LS_DB_MIN)/(LS_DB_MAX-LS_DB_MIN));}
function lsEqY(gainDB,chartH){return LS_PAD.T+chartH*LS_EQ_CENTER-gainDB*chartH*LS_EQ_SCALE/LS_EQ_GAIN_RANGE;}
function lsEqGainPerPx(chartH){return LS_EQ_GAIN_RANGE/(chartH*LS_EQ_SCALE);}

function startSpectrumAnim(){
  stopSpectrumAnim();
  function tick(){drawLiveSpectrum();specAnimId=requestAnimationFrame(tick);}
  tick();
}
function stopSpectrumAnim(){if(specAnimId){cancelAnimationFrame(specAnimId);specAnimId=null;}}

function getAllEQNodes(){
  const nodes=[];
  const{bands:sb,types:st,colors:sc,gainMin:sgMin,gainMax:sgMax,freqMin:sfMin,freqMax:sfMax,fixedFreq:sf}=getEQBands('eqSub');
  sb.forEach((b,i)=>nodes.push({moduleId:'eqSub',bandIndex:i,freq:b.freq,gain:b.gain,q:b.q,type:st[i],color:sc[i],gainMin:sgMin,gainMax:sgMax,freqMin:sfMin,freqMax:sfMax,fixedFreq:sf[i],enabled:state.settings.eqSub.enabled}));
  const{bands:ab,types:at,colors:ac,gainMin:agMin,gainMax:agMax,freqMin:afMin,freqMax:afMax,fixedFreq:af}=getEQBands('eqAdd');
  ab.forEach((b,i)=>nodes.push({moduleId:'eqAdd',bandIndex:i,freq:b.freq,gain:b.gain,q:b.q,type:at[i],color:ac[i],gainMin:agMin,gainMax:agMax,freqMin:afMin,freqMax:afMax,fixedFreq:af[i],enabled:state.settings.eqAdd.enabled}));
  return nodes;
}

function buildLiveSpectrumCard(){
  if(state.phase!=='ready')return'';
  const isLive=state.isPlaying&&state.playMode==='proc';
  return`<div class="card">
  <div class="section-title">
    <span class="section-title-text">ANALIZADOR EN TIEMPO REAL</span>
    ${isLive
      ?`<span class="live-badge"><span class="live-dot"></span>LIVE</span>`
      :`<span style="font-size:11px;color:var(--muted)">▶ Masterizado para ver en vivo</span>`}
    <button class="section-help-btn" onclick="showHelp('realtime')" title="Cómo usar el analizador" style="margin-left:4px">?</button>
  </div>
  <canvas id="live-spectrum" style="width:100%;height:230px;display:block;border-radius:8px;border:1px solid var(--border);cursor:crosshair;touch-action:none;-webkit-user-select:none;user-select:none"></canvas>
  <div style="display:flex;align-items:center;justify-content:center;gap:16px;margin-top:7px;font-size:11px;color:var(--dim)">
    <span>Espectro <span style="color:#69db7c;opacity:.7">━━</span></span>
    <span>EQ Correctiva <span style="color:#ffa94d">━━</span></span>
    <span>EQ Tonal <span style="color:#4dabf7">━━</span></span>
    <span style="opacity:.6">↕↔ nodos arrastrables</span>
  </div>
</div>`;
}

function drawLiveSpectrum(){
  const canvas=document.getElementById('live-spectrum'); if(!canvas)return;
  const dpr=Math.min(window.devicePixelRatio||1,2);
  const W=canvas.offsetWidth, H=canvas.offsetHeight||230;
  if(W<10)return;
  canvas.width=W*dpr; canvas.height=H*dpr;
  const ctx=canvas.getContext('2d'); ctx.scale(dpr,dpr);
  const chartW=W-LS_PAD.L-LS_PAD.R, chartH=H-LS_PAD.T-LS_PAD.B;
  const SR=state.origBuf?.sampleRate||44100;
  const toX=f=>lsToX(f,chartW);
  const specY=db=>lsSpecY(db,chartH);
  const eqY=g=>lsEqY(g,chartH);
  const yFloor=specY(LS_DB_MIN);

  // ── Fondo
  ctx.fillStyle='#060614'; ctx.fillRect(0,0,W,H);

  // ── Grid frecuencias
  [20,50,100,200,500,1000,2000,5000,10000,20000].forEach(f=>{
    const x=toX(f); if(x<LS_PAD.L||x>W-LS_PAD.R)return;
    ctx.strokeStyle='#14142e'; ctx.lineWidth=1; ctx.setLineDash([2,4]);
    ctx.beginPath(); ctx.moveTo(x,LS_PAD.T); ctx.lineTo(x,H-LS_PAD.B); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle='#6070b8'; ctx.font='bold 11px monospace'; ctx.textAlign='center';
    ctx.fillText(f>=1000?(f/1000)+'k':String(f),x,H-7);
  });

  // ── Grid dBFS (espectro)
  [-18,-36,-54,-72].forEach(db=>{
    const y=specY(db);
    ctx.strokeStyle='#14142e'; ctx.lineWidth=1; ctx.setLineDash([2,4]);
    ctx.beginPath(); ctx.moveTo(LS_PAD.L,y); ctx.lineTo(W-LS_PAD.R,y); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle='#5868a8'; ctx.font='bold 10px monospace'; ctx.textAlign='right';
    ctx.fillText(db+'dBFS',LS_PAD.L-3,y+3);
  });

  // ── Espectro (relleno + línea)
  const analyser=liveChain?.analyser;
  let specPts=null;

  if(analyser){
    // Tiempo real: datos vivos del analizador
    const binCount=analyser.frequencyBinCount;
    if(!liveFreqData||liveFreqData.length!==binCount)liveFreqData=new Float32Array(binCount);
    analyser.getFloatFrequencyData(liveFreqData);
    specPts=[];
    const N=400;
    for(let i=0;i<N;i++){
      const f=LS_FMIN*Math.pow(LS_FMAX/LS_FMIN,i/(N-1));
      const bin=Math.min(Math.round(f*binCount*2/SR),binCount-1);
      const db=liveFreqData[bin];
      specPts.push({x:toX(f),y:specY(isFinite(db)?db:LS_DB_MIN)});
    }
  } else if(state.analysis){
    // Estático: interpolación suave de las bandas del análisis
    const bands=state.analysis.bands;
    const centers=[
      {f:LS_FMIN,db:bands[0].value},
      ...bands.map(b=>({f:Math.sqrt(b.min*b.max),db:b.value})),
      {f:LS_FMAX,db:bands[bands.length-1].value},
    ];
    specPts=[];
    const N=300;
    for(let i=0;i<N;i++){
      const f=LS_FMIN*Math.pow(LS_FMAX/LS_FMIN,i/(N-1));
      let db=centers[0].db;
      for(let j=0;j<centers.length-1;j++){
        if(f>=centers[j].f&&f<=centers[j+1].f){
          const t=Math.log(f/centers[j].f)/Math.log(centers[j+1].f/centers[j].f);
          db=centers[j].db+(centers[j+1].db-centers[j].db)*Math.max(0,Math.min(1,t));
          break;
        }
      }
      specPts.push({x:toX(f),y:specY(db)});
    }
  }

  if(specPts){
    const live=!!analyser;
    // Fill
    ctx.beginPath(); ctx.moveTo(specPts[0].x,yFloor);
    specPts.forEach(p=>ctx.lineTo(p.x,p.y));
    ctx.lineTo(specPts[specPts.length-1].x,yFloor); ctx.closePath();
    const grad=ctx.createLinearGradient(0,LS_PAD.T,0,H-LS_PAD.B);
    grad.addColorStop(0,live?'rgba(105,219,124,0.28)':'rgba(77,171,247,0.10)');
    grad.addColorStop(0.6,live?'rgba(105,219,124,0.08)':'rgba(77,171,247,0.03)');
    grad.addColorStop(1,'rgba(77,171,247,0.01)');
    ctx.fillStyle=grad; ctx.fill();
    // Línea
    ctx.strokeStyle=live?'rgba(105,219,124,0.85)':'rgba(77,171,247,0.30)';
    ctx.lineWidth=live?1.5:1; ctx.setLineDash([]);
    ctx.beginPath(); specPts.forEach((p,i)=>i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y)); ctx.stroke();
  }

  // ── Línea de referencia 0dB EQ (guía visual)
  const eq0=eqY(0);
  ctx.strokeStyle='rgba(255,255,255,0.10)'; ctx.lineWidth=1; ctx.setLineDash([5,5]);
  ctx.beginPath(); ctx.moveTo(LS_PAD.L,eq0); ctx.lineTo(W-LS_PAD.R,eq0); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle='rgba(255,255,255,0.40)'; ctx.font='bold 10px monospace'; ctx.textAlign='right';
  ctx.fillText('0dB EQ',LS_PAD.L-3,eq0+3);

  // ── Curvas EQ
  const N_eq=300;
  [{id:'eqSub',color:'#ffa94d',enabled:state.settings.eqSub.enabled},
   {id:'eqAdd',color:'#4dabf7',enabled:state.settings.eqAdd.enabled}].forEach(mod=>{
    const{bands,types}=getEQBands(mod.id);
    const pts=[];
    for(let i=0;i<N_eq;i++){
      const f=LS_FMIN*Math.pow(LS_FMAX/LS_FMIN,i/(N_eq-1));
      let mag=1; bands.forEach((b,idx)=>mag*=biquadMag(types[idx],b.freq,b.gain,b.q||0.707,f,SR));
      const gainDB=20*Math.log10(Math.max(1e-10,mag));
      pts.push({x:toX(f),y:eqY(gainDB)});
    }
    ctx.globalAlpha=mod.enabled?0.90:0.30;
    ctx.strokeStyle=mod.color; ctx.lineWidth=2; ctx.setLineDash([]);
    ctx.beginPath(); pts.forEach((p,i)=>i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y)); ctx.stroke();
    ctx.globalAlpha=1;
  });

  // ── Nodos EQ (arrastrables)
  const nodes=getAllEQNodes(), sel=state.selectedEQBand;
  nodes.forEach(node=>{
    const nx=toX(node.freq), ny=eqY(node.gain);
    const isSel=sel?.moduleId===node.moduleId&&sel?.bandIndex===node.bandIndex;
    ctx.globalAlpha=node.enabled?1:0.30;
    if(isSel){
      ctx.strokeStyle=node.color; ctx.lineWidth=8;
      ctx.globalAlpha=(node.enabled?1:0.30)*0.30;
      ctx.beginPath(); ctx.arc(nx,ny,13,0,Math.PI*2); ctx.stroke();
      ctx.globalAlpha=node.enabled?1:0.30;
    }
    ctx.fillStyle=node.color;
    ctx.beginPath(); ctx.arc(nx,ny,7,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle=isSel?'#ffffff':node.color; ctx.lineWidth=isSel?2:1.5;
    ctx.beginPath(); ctx.arc(nx,ny,7,0,Math.PI*2); ctx.stroke();
    ctx.fillStyle='#000000'; ctx.font='bold 9px sans-serif'; ctx.textAlign='center';
    ctx.fillText(String(node.bandIndex+1),nx,ny+3.5);
    ctx.globalAlpha=1;
  });
}

function initLiveSpectrumCanvas(){
  const canvas=document.getElementById('live-spectrum'); if(!canvas||canvas._lsInit)return;
  canvas._lsInit=true;
  canvas.addEventListener('mousedown',e=>{
    const r=canvas.getBoundingClientRect();
    startLiveSpecDrag(e.clientX-r.left,e.clientY-r.top,e);
  });
  canvas.addEventListener('touchstart',e=>{
    const r=canvas.getBoundingClientRect();
    startLiveSpecDrag(e.touches[0].clientX-r.left,e.touches[0].clientY-r.top,e);
  },{passive:false});
}

function startLiveSpecDrag(cx,cy,e){
  const canvas=document.getElementById('live-spectrum'); if(!canvas)return;
  const H=canvas.offsetHeight, chartW=canvas.offsetWidth-LS_PAD.L-LS_PAD.R, chartH=H-LS_PAD.T-LS_PAD.B;
  const nodes=getAllEQNodes();
  let hit=null, minDist=16;
  nodes.forEach(node=>{
    const nx=lsToX(node.freq,chartW), ny=lsEqY(node.gain,chartH);
    const d=Math.sqrt((cx-nx)**2+(cy-ny)**2);
    if(d<minDist){minDist=d;hit=node;}
  });
  if(!hit){state.selectedEQBand=null;drawLiveSpectrum();return;}
  state.selectedEQBand={moduleId:hit.moduleId,bandIndex:hit.bandIndex};
  liveSpecDrag={
    moduleId:hit.moduleId, bandIndex:hit.bandIndex,
    startCx:cx, startCy:cy,
    startFreq:hit.freq, startGain:hit.gain,
    gainMin:hit.gainMin, gainMax:hit.gainMax,
    freqMin:hit.freqMin, freqMax:hit.freqMax,
    fixedFreq:hit.fixedFreq, chartH,
  };
  drawLiveSpectrum();
  if(e)e.preventDefault();
}

function handleLiveSpecMove(clientX,clientY){
  if(!liveSpecDrag)return;
  const canvas=document.getElementById('live-spectrum'); if(!canvas)return;
  const r=canvas.getBoundingClientRect();
  const cx=clientX-r.left, cy=clientY-r.top;
  const{moduleId,bandIndex,startCx,startCy,startFreq,startGain,gainMin,gainMax,freqMin,freqMax,fixedFreq,chartH}=liveSpecDrag;
  // Ganancia: drag vertical con escala visual consistente
  const gainPerPx=lsEqGainPerPx(chartH);
  const newGain=Math.max(gainMin,Math.min(gainMax,startGain-(cy-startCy)*gainPerPx));
  // Frecuencia: drag horizontal logarítmico
  let newFreq=startFreq;
  if(!fixedFreq){
    const logR=(cx-startCx)/canvas.offsetWidth*2.5;
    newFreq=Math.max(freqMin,Math.min(freqMax,Math.round(startFreq*Math.pow(freqMax/freqMin,logR))));
    // Evitar cruce de vecinos
    const allBands=getEQBands(moduleId).bands;
    const loLim=bandIndex>0?Math.round(allBands[bandIndex-1].freq)+1:freqMin;
    const hiLim=bandIndex<allBands.length-1?Math.round(allBands[bandIndex+1].freq)-1:freqMax;
    newFreq=Math.max(loLim,Math.min(hiLim,newFreq));
  }
  applyEQChange(moduleId,bandIndex,newFreq,newGain,null);
  if(!specAnimId)drawLiveSpectrum();
}
/* ══════════════════════════════════════
   WAVEFORM + TIMELINE
══════════════════════════════════════ */

function computeWaveform(buf,nPoints){
  const L=buf.getChannelData(0);
  const R=buf.numberOfChannels>1?buf.getChannelData(1):L;
  const blockSize=Math.max(1,Math.floor(buf.length/nPoints));
  const pos=new Float32Array(nPoints), neg=new Float32Array(nPoints);
  for(let i=0;i<nPoints;i++){
    let maxP=0,maxN=0;
    for(let j=0;j<blockSize;j++){
      const s=(L[i*blockSize+j]+R[i*blockSize+j])*0.5;
      if(s>maxP)maxP=s; else if(-s>maxN)maxN=-s;
    }
    pos[i]=maxP; neg[i]=maxN;
  }
  return{pos,neg};
}

function buildWaveformCard(){
  if(state.phase!=='ready')return'';
  const fmt=s=>{const m=Math.floor(s/60),sec=Math.floor(s%60);return`${m}:${String(sec).padStart(2,'0')}`;};
  const dur=state.origBuf?.duration||0;
  const gain=state.settings.outGain?.gain||0;
  const gainStr=(gain>=0?'+':'')+gain.toFixed(1)+' dB';
  return`<div class="card" style="padding-bottom:12px">
  <div style="display:grid;grid-template-columns:1fr 88px;gap:12px;align-items:start">

    <!-- Columna izquierda: waveform -->
    <div>
      <div class="section-title" style="margin-bottom:8px">
        <span class="section-title-text">LÍNEA DE TIEMPO</span>
        <span style="font-size:11px;color:var(--muted);margin-left:auto">${fmt(dur)} &nbsp;·&nbsp; clic para navegar</span>
        <button class="section-help-btn" onclick="showHelp('timeline')" title="Waveform, loop y output gain" style="margin-left:6px">?</button>
      </div>
      <canvas id="waveform-canvas" style="width:100%;height:72px;display:block;border-radius:8px;border:1px solid var(--border);cursor:pointer;touch-action:none"></canvas>
    </div>

    <!-- Columna derecha: output gain + VU meter -->
    <div style="display:flex;flex-direction:column;gap:5px;padding-top:2px">
      <div style="font-size:9px;font-weight:bold;letter-spacing:2px;color:var(--muted);text-align:center">OUTPUT</div>
      <div id="outGainVal" style="font-size:11px;font-family:monospace;font-weight:bold;color:var(--yellow);text-align:center;letter-spacing:.5px">${gainStr}</div>
      <input type="range" id="outGainSlider" min="-12" max="6" step="0.1" value="${gain}"
        style="width:100%;height:4px;accent-color:var(--yellow);cursor:pointer;margin:2px 0">
      <canvas id="vu-meter" style="width:100%;height:62px;display:block;border-radius:6px;border:1px solid var(--border)"></canvas>
    </div>

  </div>
</div>`;
}

function startWaveformAnim(){
  stopWaveformAnim();
  function tick(){drawWaveform();drawVUMeter();waveAnimId=requestAnimationFrame(tick);}
  tick();
}
function stopWaveformAnim(){
  if(waveAnimId){cancelAnimationFrame(waveAnimId);waveAnimId=null;}
  vuPeakL=vuPeakR=-Infinity;vuPeakLt=vuPeakRt=0; // resetear peak-hold al parar
  drawVUMeter();
}

function seekTo(fraction){
  if(!state.origBuf)return;
  const wasProc=state.isPlaying&&state.playMode==='proc';
  const wasOrig=state.isPlaying&&state.playMode==='orig';
  stopAll();
  state.playbackOffset=Math.max(0,Math.min(state.origBuf.duration-0.1,fraction*state.origBuf.duration));
  if(wasProc)doPlayMastered();
  else if(wasOrig)doPlayOriginal();
  else{drawWaveform();} // solo mover el cursor sin reproducir
}

function drawWaveform(){
  const canvas=document.getElementById('waveform-canvas'); if(!canvas||!state.waveformData)return;
  const dpr=Math.min(window.devicePixelRatio||1,2);
  const W=canvas.offsetWidth, H=canvas.offsetHeight||72;
  if(W<10)return;
  canvas.width=W*dpr; canvas.height=H*dpr;
  const ctx=canvas.getContext('2d'); ctx.scale(dpr,dpr);
  const{pos,neg}=state.waveformData;
  const nPoints=pos.length;
  const PAD={L:4,R:4,T:6,B:6};
  const chartW=W-PAD.L-PAD.R, chartH=H-PAD.T-PAD.B;
  const midY=PAD.T+chartH/2;
  const dur=state.origBuf?.duration||1;
  const curPos=getCurrentPos();
  const fraction=Math.max(0,Math.min(1,curPos/dur));
  const curX=PAD.L+fraction*chartW;

  // ── Fondo
  ctx.fillStyle='#060614'; ctx.fillRect(0,0,W,H);

  // ── Región ya reproducida (más brillante)
  if(fraction>0){
    ctx.fillStyle='rgba(255,255,255,0.04)';
    ctx.fillRect(PAD.L,PAD.T,fraction*chartW,chartH);
  }

  // ── Waveform (pos + neg simétricas)
  const modeColor=state.playMode==='proc'?'#69db7c':state.playMode==='orig'?'#ffa94d':'#5560a0';
  const modeColorDim=state.playMode==='proc'?'rgba(105,219,124,0.25)':state.playMode==='orig'?'rgba(255,169,77,0.25)':'rgba(85,96,160,0.20)';

  // Forma positiva
  ctx.beginPath();
  for(let i=0;i<nPoints;i++){
    const x=PAD.L+(i/nPoints)*chartW;
    const y=midY-pos[i]*(chartH/2);
    i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
  }
  // Cierre por el negativo (al revés)
  for(let i=nPoints-1;i>=0;i--){
    const x=PAD.L+(i/nPoints)*chartW;
    const y=midY+neg[i]*(chartH/2);
    ctx.lineTo(x,y);
  }
  ctx.closePath();
  ctx.fillStyle=modeColorDim; ctx.fill();

  // Contorno superior
  ctx.strokeStyle=modeColor+'80'; ctx.lineWidth=1; ctx.setLineDash([]);
  ctx.beginPath();
  for(let i=0;i<nPoints;i++){
    const x=PAD.L+(i/nPoints)*chartW, y=midY-pos[i]*(chartH/2);
    i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
  }
  ctx.stroke();
  // Contorno inferior
  ctx.beginPath();
  for(let i=0;i<nPoints;i++){
    const x=PAD.L+(i/nPoints)*chartW, y=midY+neg[i]*(chartH/2);
    i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
  }
  ctx.stroke();

  // ── Loop region overlay + handles
  const lp=state.settings.loop;
  if(lp?.enabled){
    const lx1=PAD.L+lp.start*chartW, lx2=PAD.L+lp.end*chartW;
    // Oscurecer fuera del loop
    ctx.fillStyle='rgba(0,0,0,0.50)';
    ctx.fillRect(PAD.L,PAD.T,lx1-PAD.L,chartH);
    ctx.fillRect(lx2,PAD.T,W-PAD.R-lx2,chartH);
    // Tinte loop region
    ctx.fillStyle='rgba(204,93,232,0.13)';
    ctx.fillRect(lx1,PAD.T,lx2-lx1,chartH);
    // Banda superior de color
    ctx.fillStyle='rgba(204,93,232,0.7)';
    ctx.fillRect(lx1,PAD.T,lx2-lx1,2);

    const HC='#cc5de8'; // handle color
    [[lx1,'start',1],[lx2,'end',-1]].forEach(([x,_,dir])=>{
      // Línea vertical del handle
      ctx.strokeStyle=HC; ctx.lineWidth=2; ctx.setLineDash([]);
      ctx.beginPath(); ctx.moveTo(x,PAD.T); ctx.lineTo(x,H-PAD.B); ctx.stroke();
      // Bandera triangular (apunta hacia el interior del loop)
      ctx.fillStyle=HC;
      ctx.beginPath();
      ctx.moveTo(x,PAD.T);
      ctx.lineTo(x+dir*11,PAD.T);
      ctx.lineTo(x+dir*11,PAD.T+11);
      ctx.closePath(); ctx.fill();
      // Zona de agarre visual
      ctx.strokeStyle='rgba(204,93,232,0.25)'; ctx.lineWidth=8;
      ctx.beginPath(); ctx.moveTo(x,PAD.T+12); ctx.lineTo(x,H-PAD.B); ctx.stroke();
    });
  }

  // ── Marcadores de tiempo (25%, 50%, 75%)
  [0.25,0.5,0.75].forEach(f=>{
    const x=PAD.L+f*chartW;
    ctx.strokeStyle='rgba(255,255,255,0.08)'; ctx.lineWidth=1; ctx.setLineDash([2,3]);
    ctx.beginPath(); ctx.moveTo(x,PAD.T); ctx.lineTo(x,H-PAD.B); ctx.stroke(); ctx.setLineDash([]);
    const t=f*dur, m=Math.floor(t/60), s=Math.floor(t%60);
    ctx.fillStyle='rgba(255,255,255,0.28)'; ctx.font='bold 10px monospace'; ctx.textAlign='center';
    ctx.fillText(`${m}:${String(s).padStart(2,'0')}`,x,H-PAD.B+11);
  });

  // ── Cursor de reproducción
  if(state.isPlaying||curPos>0){
    // Sombra
    ctx.strokeStyle='rgba(0,0,0,0.5)'; ctx.lineWidth=3;
    ctx.beginPath(); ctx.moveTo(curX+1,PAD.T); ctx.lineTo(curX+1,H-PAD.B); ctx.stroke();
    // Línea
    ctx.strokeStyle=modeColor; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(curX,PAD.T); ctx.lineTo(curX,H-PAD.B); ctx.stroke();
    // Triángulo en la parte superior
    ctx.fillStyle=modeColor;
    ctx.beginPath(); ctx.moveTo(curX-5,PAD.T); ctx.lineTo(curX+5,PAD.T); ctx.lineTo(curX,PAD.T+8); ctx.closePath(); ctx.fill();
  }

  // ── Tiempo actual
  const fmt=s=>{const m=Math.floor(s/60),sec=Math.floor(s%60),ms=Math.floor((s%1)*10);return`${m}:${String(sec).padStart(2,'0')}.${ms}`;};
  ctx.fillStyle=modeColor; ctx.font='bold 11px monospace'; ctx.textAlign='left';
  ctx.fillText(fmt(curPos),PAD.L+4,PAD.T+13);
}

function drawVUMeter(){
  const canvas=document.getElementById('vu-meter'); if(!canvas)return;
  const dpr=Math.min(window.devicePixelRatio||1,2);
  const W=canvas.offsetWidth||88, H=canvas.offsetHeight||62;
  canvas.width=W*dpr; canvas.height=H*dpr;
  const ctx=canvas.getContext('2d'); ctx.scale(dpr,dpr);
  ctx.fillStyle='#060614'; ctx.fillRect(0,0,W,H);

  const DB_MIN=-36, DB_MAX=0;
  const PAD={T:4,B:4,L:4,R:4};
  const chartH=H-PAD.T-PAD.B;
  const toY=db=>PAD.T+chartH*(1-(Math.max(DB_MIN,Math.min(DB_MAX,db))-DB_MIN)/(DB_MAX-DB_MIN));

  // Datos L/R desde analysers
  const aL=liveChain?.analyserL, aR=liveChain?.analyserR;
  let rmsL=-Infinity, rmsR=-Infinity, peakSampleL=-Infinity, peakSampleR=-Infinity;
  if(aL&&aR){
    if(!_vuBufL||_vuBufL.length!==aL.fftSize)_vuBufL=new Float32Array(aL.fftSize);
    if(!_vuBufR||_vuBufR.length!==aR.fftSize)_vuBufR=new Float32Array(aR.fftSize);
    const tdL=_vuBufL, tdR=_vuBufR;
    aL.getFloatTimeDomainData(tdL); aR.getFloatTimeDomainData(tdR);
    let sL=0,sR=0;
    for(let i=0;i<tdL.length;i++){
      sL+=tdL[i]*tdL[i]; sR+=tdR[i]*tdR[i];
      const abl=Math.abs(tdL[i]), abr=Math.abs(tdR[i]);
      if(abl>peakSampleL)peakSampleL=abl;
      if(abr>peakSampleR)peakSampleR=abr;
    }
    const rl=Math.sqrt(sL/tdL.length), rr=Math.sqrt(sR/tdR.length);
    rmsL=rl>1e-9?20*Math.log10(rl):-90;
    rmsR=rr>1e-9?20*Math.log10(rr):-90;
    peakSampleL=peakSampleL>1e-9?20*Math.log10(peakSampleL):-90;
    peakSampleR=peakSampleR>1e-9?20*Math.log10(peakSampleR):-90;
  }

  // Peak hold con 2s de retención
  const now=Date.now();
  if(peakSampleL>vuPeakL||now-vuPeakLt>VU_PEAK_HOLD){vuPeakL=peakSampleL;vuPeakLt=now;}
  if(peakSampleR>vuPeakR||now-vuPeakRt>VU_PEAK_HOLD){vuPeakR=peakSampleR;vuPeakRt=now;}

  // Dos barras: L y R
  const innerW=W-PAD.L-PAD.R;
  const barW=Math.floor((innerW-8)/2);
  const xL=PAD.L, xR=PAD.L+barW+8;

  // Gradiente de color (mismo para ambas barras, de arriba→rojo a abajo→verde)
  const grad=ctx.createLinearGradient(0,PAD.T,0,H-PAD.B);
  grad.addColorStop(0,'#ff4444');          // 0 dBFS
  grad.addColorStop(3/36,'#ffa94d');       // -3 dBFS
  grad.addColorStop(6/36,'#ffd43b');       // -6 dBFS
  grad.addColorStop(14/36,'#69db7c');      // -14 dBFS (target Spotify)
  grad.addColorStop(1,'#1e5c30');          // -36 dBFS

  [[rmsL,vuPeakL,xL],[rmsR,vuPeakR,xR]].forEach(([rms,peak,x])=>{
    // Fondo de pista
    ctx.fillStyle='#0c0c20'; ctx.fillRect(x,PAD.T,barW,chartH);
    // Barra de nivel RMS
    if(rms>DB_MIN){
      const barTop=toY(rms), barH=H-PAD.B-barTop;
      ctx.fillStyle=grad; ctx.fillRect(x,barTop,barW,barH);
    }
    // Línea de peak hold (tick blanco)
    if(peak>DB_MIN&&peak>rms){
      const py=toY(peak);
      const peakColor=peak>-3?'#ff4444':peak>-6?'#ffd43b':'#69db7c';
      ctx.fillStyle=peakColor; ctx.fillRect(x,py-1,barW,2);
    }
  });

  // Marcas de referencia: -6, -12, -18, -36 dBFS
  [-6,-12,-18,-36].forEach(db=>{
    const y=toY(db);
    ctx.strokeStyle='rgba(255,255,255,0.12)'; ctx.lineWidth=1; ctx.setLineDash([1,2]);
    ctx.beginPath(); ctx.moveTo(PAD.L,y); ctx.lineTo(W-PAD.R,y); ctx.stroke();
    ctx.setLineDash([]);
  });
  // Línea roja de 0 dBFS
  const y0=toY(0);
  ctx.strokeStyle='rgba(255,68,68,0.35)'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(PAD.L,y0); ctx.lineTo(W-PAD.R,y0); ctx.stroke();
}

function initWaveformCanvas(){
  const canvas=document.getElementById('waveform-canvas'); if(!canvas||canvas._waveInit)return;
  canvas._waveInit=true;

  function startWaveDrag(clientX,e){
    const r=canvas.getBoundingClientRect();
    const cx=clientX-r.left;
    const chartW=canvas.offsetWidth-8; // PAD.L+PAD.R=8
    const f=Math.max(0,Math.min(1,(cx-4)/chartW));
    const lp=state.settings.loop;
    if(lp?.enabled){
      const lx1=4+lp.start*chartW, lx2=4+lp.end*chartW;
      if(Math.abs(cx-lx1)<12){loopDrag={handle:'start'};if(e)e.preventDefault();return;}
      if(Math.abs(cx-lx2)<12){loopDrag={handle:'end'};if(e)e.preventDefault();return;}
    }
    seekTo(f);
  }

  canvas.addEventListener('mousedown',e=>startWaveDrag(e.clientX,e));
  canvas.addEventListener('touchstart',e=>{startWaveDrag(e.touches[0].clientX,e);},{passive:false});
  canvas.addEventListener('touchend',e=>{
    if(!loopDrag){e.preventDefault();const r=canvas.getBoundingClientRect();seekTo(Math.max(0,Math.min(1,(e.changedTouches[0].clientX-r.left)/r.width)));}
    loopDrag=null;
  },{passive:false});
  canvas.addEventListener('mousemove',e=>{
    if(loopDrag){handleLoopDrag(e.clientX);return;}
    const r=canvas.getBoundingClientRect();
    const f=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width));
    const lp=state.settings.loop;
    const chartW=canvas.offsetWidth-8;
    const cx=e.clientX-r.left;
    if(lp?.enabled&&(Math.abs(cx-4-lp.start*chartW)<12||Math.abs(cx-4-lp.end*chartW)<12))
      canvas.style.cursor='ew-resize';
    else canvas.style.cursor='pointer';
    canvas.title=`${Math.floor(f*state.origBuf.duration/60)}:${String(Math.floor(f*state.origBuf.duration%60)).padStart(2,'0')}`;
  });
}

/* ══════════════════════════════════════
   MODAL
══════════════════════════════════════ */
function closeModal(){document.getElementById('modalRoot').innerHTML='';}
function showHelp(id){const h=HELP[id];if(!h)return;
document.getElementById('modalRoot').innerHTML=`<div class="modal-overlay" id="modalOverlay"><div class="modal" style="--mc:${h.color}"><div class="modal-header"><div class="modal-color-bar"></div><div class="modal-title">${h.title}</div><button class="modal-close" id="modalClose">✕</button></div><div class="modal-body"><div class="modal-section"><div class="modal-section-title">¿Qué hace?</div><div class="modal-section-text">${h.que}</div></div><div class="modal-section"><div class="modal-section-title">¿Para qué sirve en la mezcla?</div><div class="modal-section-text">${h.sirve}</div></div><div class="modal-section"><div class="modal-section-title">¿Cómo se usa?</div><div class="modal-section-text">${h.uso}</div></div><div class="modal-tip">💡 ${h.tip}</div></div></div></div>`;
document.getElementById('modalClose').onclick=closeModal;
document.getElementById('modalOverlay').onclick=e=>{if(e.target.id==='modalOverlay')closeModal();};}

/* ══════════════════════════════════════
   EVENTS
══════════════════════════════════════ */
function bindEvents(){
  const dz=document.getElementById('dz'),fi=document.getElementById('fileInput');
  if(dz){dz.onclick=()=>fi.click();dz.ondragover=e=>{e.preventDefault();dz.classList.add('drag');};dz.ondragleave=()=>dz.classList.remove('drag');dz.ondrop=e=>{e.preventDefault();dz.classList.remove('drag');doLoad(e.dataTransfer.files[0]);};}
  if(fi)fi.onchange=e=>doLoad(e.target.files[0]);

  document.getElementById('btnReset')?.addEventListener('click',()=>{
    if(!confirm('¿Seguro que quieres cerrar esta sesión?\nSe perderán todos los ajustes actuales.'))return;
    stopAll();
    // Cerrar AudioContext para liberar recursos del sistema
    if(state.audioCtx){state.audioCtx.close().catch(()=>{});state.audioCtx=null;}
    Object.assign(state,{phase:'upload',fileName:'',origBuf:null,analysis:null,procAnalysis:null,initialSettings:null,settings:defaultSettings(),playbackOffset:0,isPlaying:false,playMode:null,selectedEQBand:null});
    render();
  });

  document.getElementById('btnResetS')?.addEventListener('click',()=>{
    if(!state.initialSettings)return;
    const pos=getCurrentPos(),was=state.isPlaying;
    state.settings=deepClone(state.initialSettings);
    render();
    if(state.origBuf&&was){buildLiveChain(state.origBuf,state.settings,pos);state.isPlaying=true;state.playMode='proc';render();}
  });

  document.querySelectorAll('[data-resetmod]').forEach(btn=>btn.addEventListener('click',()=>resetModule(btn.dataset.resetmod)));

  document.getElementById('btnPlayProc')?.addEventListener('click',()=>{if(state.isPlaying&&state.playMode==='proc'){destroyLiveChain();state.isPlaying=false;state.playMode=null;render();}else doPlayMastered();});
  document.getElementById('btnPlayOrig')?.addEventListener('click',()=>{if(state.isPlaying&&state.playMode==='orig'){destroyRawSrc();state.isPlaying=false;state.playMode=null;render();}else doPlayOriginal();});
  // Nodos de la cadena: abrir/cerrar módulo correspondiente
  document.querySelectorAll('[data-modid]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const id=btn.dataset.modid;
      if(state.openMods.has(id))state.openMods.delete(id);
      else state.openMods.add(id);
      render();
      setTimeout(()=>document.querySelector(`[data-mid="${id}"]`)?.scrollIntoView({behavior:'smooth',block:'nearest'}),60);
    });
  });
  document.getElementById('btnStop')?.addEventListener('click',()=>{stopAll();state.playbackOffset=0;render();});
  document.getElementById('btnLoop')?.addEventListener('click',()=>{
    const lp=state.settings.loop;
    lp.enabled=!lp.enabled;
    applyLoopToSources();
    render(); // re-renderiza para actualizar botón y waveform
  });
  document.getElementById('btnExport')?.addEventListener('click',doExport);
  document.getElementById('btnSavePreset')?.addEventListener('click',savePreset);
  document.getElementById('btnLoadPreset')?.addEventListener('click',()=>document.getElementById('presetInput')?.click());
  document.getElementById('presetInput')?.addEventListener('change',e=>{loadPreset(e.target.files[0]);e.target.value='';});
  document.getElementById('outGainSlider')?.addEventListener('input',e=>{
    const v=parseFloat(e.target.value);
    state.settings.outGain.gain=v;
    liveUpdate('outGain.gain');
    const disp=document.getElementById('outGainVal');
    if(disp)disp.textContent=(v>=0?'+':'')+v.toFixed(1)+' dB';
    if(!specAnimId)drawLiveSpectrum();
    if(!waveAnimId)drawVUMeter();
  });

  document.querySelectorAll('[data-toggle]').forEach(cb=>{cb.addEventListener('change',e=>{const id=e.target.dataset.toggle;state.settings[id].enabled=e.target.checked;liveUpdate(id+'.enabled');render();});});
  document.querySelectorAll('[data-mid]').forEach(hdr=>{hdr.addEventListener('click',e=>{if(e.target.closest('label')||e.target.closest('[data-help]')||e.target.closest('[data-resetmod]'))return;const id=hdr.dataset.mid;state.openMods.has(id)?state.openMods.delete(id):state.openMods.add(id);render();});});
  document.querySelectorAll('.pslider').forEach(input=>{input.addEventListener('input',()=>{const key=input.dataset.key,unit=input.dataset.unit,val=parseFloat(input.value);setPath(state.settings,key,val);liveUpdate(key);const el=document.getElementById('v-'+key.replace(/[.\[\]]/g,'-'));if(el)el.textContent=fmtVal(val,unit);});});

  // Q sliders de EQ Correctiva
  document.querySelectorAll('.eq-q-slider').forEach(sl=>{
    sl.addEventListener('input',()=>{
      const idx=parseInt(sl.dataset.band), val=parseFloat(sl.value);
      applyEQChange('eqSub',idx,null,null,val);
    });
  });

}

// Resize handler registrado UNA SOLA VEZ — fuera de bindEvents para evitar acumulación por cada render()
window.addEventListener('resize',()=>{
  if(state.analysis)requestAnimationFrame(drawSpectrum);
  ['eqSub','eqAdd'].forEach(id=>{if(state.openMods.has(id))requestAnimationFrame(()=>drawEQCanvas(id));});
  if(state.origBuf&&!specAnimId)requestAnimationFrame(drawLiveSpectrum);
  if(state.origBuf&&!waveAnimId)requestAnimationFrame(()=>{drawWaveform();drawVUMeter();});
},{passive:true});

function setPath(obj,path,val){const keys=path.split('.');let cur=obj;for(let i=0;i<keys.length-1;i++){if(cur[keys[i]]===undefined)return;cur=cur[keys[i]];}cur[keys[keys.length-1]]=val;}
function deepClone(obj){return JSON.parse(JSON.stringify(obj));}
function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;');}

/* ══════════════════════════════════════
   MODULE RESET
══════════════════════════════════════ */
function resetModule(id){
  if(!state.initialSettings)return;
  state.settings[id]=deepClone(state.initialSettings[id]);
  liveUpdate(id+'.enabled');
  if(id==='hpf')liveUpdate('hpf.freq');
  else if(id==='eqSub')for(let i=0;i<3;i++)['gain','freq','q'].forEach(p=>liveUpdate(`eqSub.bands.${i}.${p}`));
  else if(id==='sat')liveUpdate('sat.amount');
  else if(id==='comp')['threshold','ratio','attack','release','makeup'].forEach(p=>liveUpdate(`comp.${p}`));
  else if(id==='eqAdd'){
    ['low','mid','high','air'].forEach(p=>liveUpdate(`eqAdd.${p}`));
    ['lowFreq','midFreq','highFreq','airFreq'].forEach(p=>liveUpdate(`eqAdd.${p}`));
  }
  else if(id==='width')liveUpdate('width.amount');
  else if(id==='lim')liveUpdate('lim.ceiling');
  render();
}

/* ══════════════════════════════════════
   PRESETS
══════════════════════════════════════ */
function savePreset(){const preset={version:'2.1',file:state.fileName,date:new Date().toISOString(),settings:deepClone(state.settings)};const blob=new Blob([JSON.stringify(preset,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=(state.fileName.replace(/\.[^.]+$/,'')||'master')+'_preset.mpreset';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function loadPreset(file){
  if(!file)return;
  const reader=new FileReader();
  reader.onload=e=>{
    try{
      const data=JSON.parse(e.target.result),loaded=data.settings||data,base=defaultSettings();
      for(const key of Object.keys(base)){
        if(loaded[key]===undefined)continue;
        if(key==='eqSub'&&loaded.eqSub?.bands){
          // eqSub tiene array de bandas — merge explícito
          base.eqSub={...base.eqSub,...loaded.eqSub};
          base.eqSub.bands=loaded.eqSub.bands.map((b,i)=>({...base.eqSub.bands[i],...b}));
        } else if(key==='eqAdd'&&typeof loaded.eqAdd==='object'){
          // eqAdd es plano: solo copiar claves que existan en base para no contaminar
          for(const k of Object.keys(base.eqAdd)){
            if(loaded.eqAdd[k]!==undefined)base.eqAdd[k]=loaded.eqAdd[k];
          }
        } else if(typeof base[key]==='object'&&!Array.isArray(base[key])){
          base[key]={...base[key],...loaded[key]};
        } else {
          base[key]=loaded[key];
        }
      }
      state.settings=base;
      applyAllLiveUpdates();
      render();
    }catch(err){alert('Error al cargar preset: '+err.message);}
  };
  reader.readAsText(file);
}

/* ══════════════════════════════════════
   ACTIONS
══════════════════════════════════════ */
async function doLoad(file){
  if(!file)return;
  stopAll();
  state.fileName=file.name;state.phase='analyzing';state.analysis=null;state.procAnalysis=null;state.playbackOffset=0;
  render();
  try{
    // Decodificar con un contexto offline independiente para no bloquear el contexto de reproducción
    const arrayBuf=await file.arrayBuffer();
    const tmpCtx=new AudioContext();
    const decoded=await tmpCtx.decodeAudioData(arrayBuf);
    tmpCtx.close().catch(()=>{});
    state.origBuf=decoded;
    state.waveformData=computeWaveform(decoded,1200);
    const freqData=await analyzeSpectrum(decoded);
    const bands=FREQ_BANDS.map(b=>{const val=getBandPower(freqData,b.min,b.max,8192,decoded.sampleRate);return{...b,value:val,diff:val-b.target};});
    state.analysis={bands,lufs:calcLUFS(decoded),rms:calcRMS(decoded),dr:calcDR(decoded),correlation:calcCorr(decoded),truePeak:null};
    state.initialSettings=autoSettings(state.analysis);
    state.settings=deepClone(state.initialSettings);
    state.phase='ready';state.isPlaying=false;state.playMode=null;
    render();
    processAudio(decoded,state.settings).then(async procBuf=>{
      const fd2=await analyzeSpectrum(procBuf);
      const bands2=FREQ_BANDS.map(b=>{const val=getBandPower(fd2,b.min,b.max,8192,procBuf.sampleRate);return{...b,value:val,diff:val-b.target};});
      state.procAnalysis={bands:bands2,lufs:calcLUFS(procBuf),rms:calcRMS(procBuf),dr:calcDR(procBuf),correlation:calcCorr(procBuf),truePeak:calcTruePeak(procBuf)};
      render();
    }).catch(e=>console.warn('Background analysis:',e));
  }catch(e){
    alert('No se pudo decodificar el audio. Prueba MP3, WAV o FLAC.');
    state.phase='upload';render();
  }
}
function doPlayMastered(){
  const pos=getCurrentPos();
  destroyRawSrc();
  buildLiveChain(state.origBuf,state.settings,pos);
  state.isPlaying=true;state.playMode='proc';
  render();startSpectrumAnim();startWaveformAnim();
}
function doPlayOriginal(){
  const pos=getCurrentPos();
  destroyLiveChain();destroyRawSrc();
  const ctx=resumeCtx();
  rawSrc=ctx.createBufferSource();rawSrc.buffer=state.origBuf;
  rawGain=ctx.createGain();rawGain.gain.setValueAtTime(0,ctx.currentTime);rawGain.gain.linearRampToValueAtTime(1,ctx.currentTime+FADE_S);
  rawSrc.connect(rawGain);rawGain.connect(ctx.destination);
  rawOffset=Math.max(0,Math.min(pos,state.origBuf.duration-.1));
  const lp=state.settings.loop;
  if(lp?.enabled){rawSrc.loop=true;rawSrc.loopStart=lp.start*state.origBuf.duration;rawSrc.loopEnd=lp.end*state.origBuf.duration;}
  rawStart=ctx.currentTime;rawSrc.start(0,rawOffset);
  rawSrc.onended=()=>{rawSrc=null;rawGain=null;stopWaveformAnim();state.isPlaying=false;state.playMode=null;state.playbackOffset=0;render();};
  state.isPlaying=true;state.playMode='orig';
  render();startWaveformAnim();
}
async function doExport(){
  if(!state.origBuf)return;
  const prevPos=getCurrentPos(),prevMode=state.playMode,prevPlaying=state.isPlaying;
  const btn=document.getElementById('btnExport');
  if(btn){btn.textContent='⏳ Exportando…';btn.disabled=true;}
  try{
    const bd=parseInt(document.getElementById('bitDepth')?.value||'24');
    const out=await processAudio(state.origBuf,state.settings);
    const blob=new Blob([toWav(out,bd)],{type:'audio/wav'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url;
    a.download=state.fileName.replace(/\.[^.]+$/,'')+'_mastered.wav';
    a.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
    const fd=await analyzeSpectrum(out);
    const bands=FREQ_BANDS.map(b=>{const val=getBandPower(fd,b.min,b.max,8192,out.sampleRate);return{...b,value:val,diff:val-b.target};});
    state.procAnalysis={bands,lufs:calcLUFS(out),dr:calcDR(out),correlation:calcCorr(out),truePeak:calcTruePeak(out)};
  }catch(e){alert('Error al exportar: '+e.message);}
  if(prevPlaying){
    if(prevMode==='proc'){buildLiveChain(state.origBuf,state.settings,prevPos);state.isPlaying=true;state.playMode='proc';}
    else if(prevMode==='orig')doPlayOriginal();
  }
  render();
}

render();

// Cerrar modal con Escape
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});
