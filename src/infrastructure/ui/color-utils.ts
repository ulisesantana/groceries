export class ColorUtils {
  private static hexToRgb(hex: string): [number, number, number] {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  }

  private static rgbToHex(r: number, g: number, b: number): string {
    const toHex = (x: number) => x.toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  private static rgbToHsl(
    r: number,
    g: number,
    b: number
  ): [number, number, number] {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    let l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return [h, s, l];
  }

  private static hslToRgb(
    h: number,
    s: number,
    l: number
  ): [number, number, number] {
    let r, g, b;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  private static setLuminosityFromRgb(
    r: number,
    g: number,
    b: number,
    percentage: number
  ): [number, number, number] {
    const [h, s] = this.rgbToHsl(r, g, b);
    return this.hslToRgb(h, s, percentage);
  }

  static setLuminosity(hexColor: string, percentage: number): string {
    const [r, g, b] = this.hexToRgb(hexColor);
    const [newR, newG, newB] = this.setLuminosityFromRgb(r, g, b, percentage);
    return this.rgbToHex(newR, newG, newB);
  }

  static isGrayscale(hexColor: string, tolerance: number = 5): boolean {
    const [r, g, b] = this.hexToRgb(hexColor);
    return (
      Math.abs(r - g) <= tolerance &&
      Math.abs(r - b) <= tolerance &&
      Math.abs(g - b) <= tolerance
    );
  }
}
