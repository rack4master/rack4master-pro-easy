# Rack4Master Pro Easy — AI Mastering Engine

## ✨ Key Features

- **Fixed professional chain** (HPF → Corrective EQ → Saturation → Bus Comp → Tonal EQ → Stereo Width → Limiter → Output Gain).
- **Intelligent auto‑analysis** — averages 15 FFT snapshots distributed across the first 40 seconds of the track, compares the relative spectral balance with the typical commercial pop‑rock curve, and calculates initial adjustments for each module.
- **Automatic corrections** — the analysis not only detects problems but fixes them: adjusts the HPF based on sub content, smooths or disables the compressor if the DR is already too low, sets the Limiter’s ceiling according to the original True Peak, and reduces saturation if the mix is already heavily limited.
- **4‑band Corrective EQ** — draggable peak filters centered at 200 / 300 / 500 / 1000 Hz with adjustable Q and gain. Designed for surgical cuts in the mud range (200–1000 Hz) before the compressor.
- **7‑band Tonal EQ** — covers the same spectrum as the initial analysis: Sub shelf (40 Hz), Low shelf (120 Hz), Lo‑Mid peak (350 Hz, draggable), Mid peak (1 kHz, draggable), Hi‑Mid peak (3 kHz, draggable), High shelf (8 kHz), Air shelf (16 kHz).
- **Quality metrics** — LUFS‑I (ITU‑R BS.1770‑4), True Peak with 4× cubic interpolation calculated on original and master, Dynamic Range, Stereo Correlation.
- **Real‑time control** — all sliders and switches act instantly while you listen.
- **A/B variant comparison** — two preset slots (A and B) to create and compare two different master versions. Switch slots without losing playback position.
- **Draggable loop** — define a loop region on the waveform and repeat the section indefinitely, in either original or mastered mode.
- **Real‑time analyzer** — FFT spectrum overlaid with the Corrective EQ and Tonal EQ curves. **Drag EQ nodes directly on the graph** to modify frequency and gain instantly.
- **Post‑limiter Output Gain** — output trim that is baked into the exported WAV without affecting the limiter's behavior.
- **Stereo VU Meter** — RMS bars with a 2‑second peak hold.
- **Presets** — save and load your full configuration (`.mpreset` file).
- **WAV export** — choose 24‑bit (professional) or 16‑bit (direct distribution) with TPDF dithering for both.

## 🖥️ Screenshots

| Spectral analysis | Mastering chain |
|--------------------|--------------------------|
| ![Spectrum](pic1.png) | ![Chain](pic2.png) |

## 🚀 Quick Start

1. Drag an audio file (MP3, WAV, FLAC, AAC, OGG, M4A) or click to load it.
2. Wait for the automatic analysis (10–30 seconds depending on length). The auto‑analysis calculates adjustments and applies preventive corrections.
3. Press **▶ Mastered** to listen to the result with the calculated settings.
4. Adjust the sliders or drag the EQ nodes on the real‑time analyzer.
5. Use **⟳ Loop** to isolate a section, **A / B** to compare two master variants, and **▶ Original** to evaluate the starting point.
6. Save the preset (💾) and export the master (⬇ WAV).

## 🎛️ The Processing Chain

```
IN → HPF → EQ Correctiva (4 bandas) → Saturación → Bus Comp → EQ Tonal (7 bandas) → Stereo Width → Limiter → Out Gain → OUT
```

| Module | Type | Function |
|--------|------|---------|
| HPF | High‑pass 12 dB/oct | Remove subsonic content (auto: 22–55 Hz based on sub content) |
| Corrective EQ | 4× peaking Q‑adjustable | Surgical mud cuts at 200 / 300 / 500 / 1000 Hz |
| Saturation | Tanh waveshaper | Analog warmth, spectral density (auto‑disabled if DR < 5 dB) |
| Bus Comp | DynamicsCompressor | Stereo glue (auto‑bypass if DR < 3 dB; min ratio 1.3:1 if DR < 5 dB) |
| Tonal EQ | 2 shelves + 3 peaks + 2 shelves | Character spectral shaping (7 bands = 7 analysis zones) |
| Stereo Width | M/S matrix | Stereo width control |
| Limiter | Ratio 20:1, attack 1 ms | Auto‑adjusted ceiling based on original True Peak |
| Output Gain | Linear gain | Final post‑limiter trim |

## 🗺️ Frequency Map

| Zone | Range | Module | Default |
|------|-------|--------|---------|
| Sub | 20–80 Hz | HPF + Tonal EQ Sub | Shelf 40 Hz |
| Low | 80–250 Hz | Corrective EQ + Tonal EQ Low | Shelf 120 Hz / Peak 200 Hz |
| Lo‑Mid (mud) | 250–500 Hz | Corrective EQ + Tonal EQ Lo‑Mid | Peak 300 Hz / Peak 350 Hz |
| Mid | 500–2000 Hz | Corrective EQ + Tonal EQ Mid | Peak 1 kHz |
| Hi‑Mid | 2–8 kHz | Tonal EQ Hi‑Mid | Peak 3 kHz |
| High | 8–16 kHz | Tonal EQ High | Shelf 8 kHz |
| Air | 16–22 kHz | Tonal EQ Air | Shelf 16 kHz |

## 🛠️ Technologies

- **Web Audio API** — real‑time processing and offline rendering, no servers required.
- **OfflineAudioContext with multiple suspensions** — averaged FFT analysis (15 snapshots) and high‑quality export.
- **Canvas API** — spectrum, waveform, EQ curves, VU meter (all at 60 fps).
- **Pure JavaScript (ES2020)** — no frameworks or external dependencies.
