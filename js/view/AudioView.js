/**
 * AudioView — MVVM View (adapter)
 * Speaks letters via Web Speech API with a WebAudio tone fallback.
 */
export class AudioView {
  constructor() {
    this.ctx = null;
  }

  get speechAvailable() {
    return typeof globalThis.speechSynthesis !== 'undefined';
  }

  speak(letter) {
    if (this.speechAvailable) {
      try {
        const utterance = new SpeechSynthesisUtterance(letter);
        utterance.lang = 'en-US';
        utterance.rate = 1;
        globalThis.speechSynthesis.cancel();
        globalThis.speechSynthesis.speak(utterance);
        return;
      } catch {
        /* fall through to tone */
      }
    }
    this.fallbackTone(letter);
  }

  fallbackTone(letter) {
    try {
      this.ctx ??= new AudioContext();
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const codes = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const idx = Math.max(0, codes.indexOf(letter));
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.frequency.value = 220 + idx * 30;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);
      osc.connect(gain).connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch {
      /* no audio possible */
    }
  }

  stop() {
    if (this.speechAvailable) globalThis.speechSynthesis.cancel();
  }
}
