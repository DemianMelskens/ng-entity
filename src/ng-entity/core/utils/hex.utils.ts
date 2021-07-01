import {Color} from "../domain";

function rgbToHex(color: Color): string {
  return `#${((1 << 24) + (color.r << 16) + (color.g << 8) + color.b).toString(16).slice(1)}`.toUpperCase();
}

function rgbaToHex(color: Color): string {
  const hex = rgbToHex(color);
  return hex + (Math.round(color.a! * 255) + 0x10000).toString(16).substr(-2).toUpperCase();
}

function hexToRgb(hex: string): Color {
  const
    r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16)

  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    throw new Error('Invalid string')
  }

  return Color.rgb(r, g, b);
}

function hexToRgba(hex: string): Color {
  const
    r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16),
    a = Math.round(parseInt(hex.slice(7, 9), 16) / 255)

  if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) {
    throw new Error('Invalid string')
  }

  return Color.rgba(r, g, b, a);
}

export function colorToHex(color: Color): string {
  switch (color.type) {
    case "rgb":
      return rgbToHex(color);
    case "rgba":
      return rgbaToHex(color);
  }
}

export function hexToColor(hex: string): Color {
  if (hex.length === 7) {
    return hexToRgb(hex);
  } else {
    return hexToRgba(hex);
  }
}
