// Web Audio API ambient sound generator for NOIR & BEAN (Safe, client-side, zero external assets)
class CafeSoundGenerator {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private filterNode: BiquadFilterNode | null = null;

  private init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    this.ctx = new AudioContextClass();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.06, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      // Generate soft vinyl warm crackle & low ambient café warmth buffer
      const bufferSize = this.ctx.sampleRate * 4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        // Pink noise filter
        const white = Math.random() * 2 - 1;
        lastOut = (lastOut * 0.95) + (white * 0.05);
        // Add random vinyl pops
        const pop = Math.random() > 0.9996 ? (Math.random() - 0.5) * 0.35 : 0;
        data[i] = lastOut * 0.6 + pop;
      }

      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = buffer;
      this.noiseNode.loop = true;

      // Lowpass warmth filter (removes harsh hiss, creates cozy espresso bar muffled warmth)
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(550, this.ctx.currentTime);

      this.noiseNode.connect(this.filterNode);
      this.filterNode.connect(this.masterGain);

      this.noiseNode.start();
      this.isPlaying = true;
    } catch {
      this.isPlaying = false;
    }
  }

  public stop() {
    if (this.noiseNode) {
      try {
        this.noiseNode.stop();
        this.noiseNode.disconnect();
      } catch {
        // ignore
      }
      this.noiseNode = null;
    }
    this.isPlaying = false;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const cafeAudio = new CafeSoundGenerator();
