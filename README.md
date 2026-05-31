# Rack4Master Pro Easy — AI Mastering Engine

**Masterización profesional en el navegador**  
Carga tu mezcla, obtén un análisis espectral completo y aplica una cadena de procesado en tiempo real con control total sobre cada módulo. Sin instalaciones, sin suscripciones.

![Análisis espectral](pic1.png)
*Vista del análisis de bandas, LUFS‑I, True Peak y comparación antes/después.*

![Cadena de masterización](pic2.png)
*Interfaz principal con la cadena de módulos, analizador en tiempo real y línea de tiempo navegable.*

## ✨ Características principales

- **Cadena profesional fija** (HPF → EQ Correctiva → Saturación → Bus Comp → EQ Tonal → Stereo Width → Limiter → Output Gain).
- **Auto‑análisis inteligente** – calcula ajustes iniciales comparando tu mezcla con la curva espectral del pop‑rock comercial.
- **Métricas de calidad** – LUFS‑I (ITU‑R BS.1770‑4), True Peak con interpolación cúbica 4×, rango dinámico, correlación estéreo.
- **Control en tiempo real** – todos los sliders y conmutadores actúan al instante mientras escuchas.
- **Comparación A/B** – dos slots de ajustes (A y B) para probar variantes y cambiar sin perder la posición de reproducción.
- **Loop arrastrable** – define una región de bucle en la waveform y repite la sección indefinidamente.
- **Analizador en tiempo real** – espectro FFT superpuesto con las curvas de EQ Correctiva y EQ Tonal. **Arrastra los nodos EQ directamente sobre el gráfico** para modificar frecuencia y ganancia.
- **Output Gain post‑limitador** – trim de salida que se bakea en el WAV exportado, sin afectar al comportamiento del limitador.
- **VU Meter estéreo** – barras RMS con peak hold de 2 segundos.
- **Presets** – guarda y carga tu configuración completa (archivo `.mpreset`).
- **Exportación WAV** – elige 24‑bit (profesional) o 16‑bit (distribución directa) con dithering TPDF para 16‑bit.

## 🖥️ Capturas de pantalla

| Análisis espectral | Cadena de masterización |
|--------------------|--------------------------|
| ![Espectro](pic1.png) | ![Cadena](pic2.png) |

## 🚀 Uso rápido

1. Arrastra un archivo de audio (MP3, WAV, FLAC, AAC, OGG, M4A) o haz clic para cargarlo.
2. Espera el análisis automático (unos segundos).
3. Pulsa **▶ Masterizado** para escuchar el resultado con los ajustes calculados.
4. Ajusta los sliders o arrastra los nodos EQ en el analizador en tiempo real.
5. Usa **⟳ Loop** para aislar una sección y **A/B** para comparar variantes.
6. Guarda el preset (💾) y exporta el master (⬇ WAV).

## 🛠️ Tecnologías

- **Web Audio API** – procesado en tiempo real sin servidores.
- **OfflineAudioContext** – renderizado de exportación y análisis en segundo plano.
- **Canvas API** – visualizaciones: espectro, waveform, curvas EQ, VU meter.
- **JavaScript puro (ES2020)** – sin frameworks ni dependencias externas.
