/** Tiny retro game SFX built with the Web Audio API — no audio files needed. */

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

type ToneOptions = {
  freq: number;
  endFreq?: number;
  start?: number;
  duration?: number;
  type?: OscillatorType;
  gain?: number;
};

function tone(ac: AudioContext, { freq, endFreq, start = 0, duration = 0.12, type = "square", gain = 0.12 }: ToneOptions) {
  const t0 = ac.currentTime + start;
  const osc = ac.createOscillator();
  const vol = ac.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (endFreq && endFreq !== freq) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(endFreq, 20), t0 + duration);
  }

  vol.gain.setValueAtTime(0.0001, t0);
  vol.gain.exponentialRampToValueAtTime(gain, t0 + 0.012);
  vol.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);

  osc.connect(vol).connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}

/** Ascending power-up arpeggio — entering the maze. */
export function playEnter() {
  const ac = getCtx();
  if (!ac) return;
  [392, 523.25, 659.25, 783.99].forEach((freq, i) => {
    tone(ac, { freq, start: i * 0.075, duration: 0.14, type: "square", gain: 0.11 });
  });
  tone(ac, { freq: 1046.5, start: 0.3, duration: 0.28, type: "triangle", gain: 0.1 });
}

/** Short blip — picking an answer. */
export function playSelect() {
  const ac = getCtx();
  if (!ac) return;
  tone(ac, { freq: 660, endFreq: 880, duration: 0.07, type: "square", gain: 0.07 });
}

/** Falling "womp-womp-womp" — descending a floor. */
export function playDescend() {
  const ac = getCtx();
  if (!ac) return;
  [660, 494, 370].forEach((freq, i) => {
    tone(ac, { freq, endFreq: freq * 0.7, start: i * 0.12, duration: 0.14, type: "square", gain: 0.12 });
  });
  tone(ac, { freq: 220, endFreq: 110, start: 0.38, duration: 0.3, type: "sawtooth", gain: 0.1 });
}

/** Victory flourish — claiming loot / sharing. */
export function playFanfare() {
  const ac = getCtx();
  if (!ac) return;
  [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
    tone(ac, { freq, start: i * 0.09, duration: 0.16, type: "square", gain: 0.1 });
  });
  tone(ac, { freq: 1318.5, start: 0.38, duration: 0.42, type: "triangle", gain: 0.11 });
}
