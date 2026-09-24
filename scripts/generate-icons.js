import fs from 'fs';
import zlib from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '../public');

// Minimal pure Node PNG builder
function createPNG(width, height, getPixel) {
  // getPixel(x, y) => [r, g, b, a] (0-255)
  const rowStride = width * 4 + 1; // 1 filter byte (0 = None) per row
  const rawData = Buffer.alloc(height * rowStride);

  for (let y = 0; y < height; y++) {
    const rowStart = y * rowStride;
    rawData[rowStart] = 0; // Filter type 0: None
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = getPixel(x, y, width, height);
      const pixelStart = rowStart + 1 + x * 4;
      rawData[pixelStart] = r;
      rawData[pixelStart + 1] = g;
      rawData[pixelStart + 2] = b;
      rawData[pixelStart + 3] = a;
    }
  }

  const compressedData = zlib.deflateSync(rawData);

  // PNG Header
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR Chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;  // bit depth: 8
  ihdr[9] = 6;  // color type: RGBA (6)
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', compressedData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function makeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(4 + 4 + len + 4);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const crc = crc32(chunk.subarray(4, 8 + len));
  chunk.writeUInt32BE(crc, 8 + len);
  return chunk;
}

// CRC32 table
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

// Render icon pixels
function renderWorkdayIcon(x, y, w, h, isMaskable = false) {
  // Normalize coords
  let nx = (x / w) * 2 - 1;
  let ny = (y / h) * 2 - 1;

  if (isMaskable) {
    // If maskable, scale so safe zone is within 80% (scale by 1.25)
    nx *= 1.22;
    ny *= 1.22;
  }

  // Base rounded rect or full bleed
  const distToEdge = Math.max(Math.abs(nx), Math.abs(ny));
  if (!isMaskable && distToEdge > 0.94) {
    // Rounded corners
    const cornerRadius = 0.28;
    const cx = Math.max(0, Math.abs(nx) - (1 - cornerRadius));
    const cy = Math.max(0, Math.abs(ny) - (1 - cornerRadius));
    if (Math.hypot(cx, cy) > cornerRadius) {
      return [0, 0, 0, 0]; // Transparent outside rounded corner
    }
  }

  // Deep enterprise gradient background (#090d16 to #1e293b)
  const gradT = (nx + ny + 2) / 4;
  let r = Math.round(9 + (30 - 9) * gradT);
  let g = Math.round(13 + (41 - 13) * gradT);
  let b = Math.round(22 + (59 - 22) * gradT);
  let a = 255;

  // Concentric subtle cyan orbit rings
  const distFromCenter = Math.hypot(nx, ny);
  if (Math.abs(distFromCenter - 0.72) < 0.015) {
    return [56, 189, 248, 120]; // Sky blue dashed ring
  }

  // Golden sunburst arc top (y from -0.6 to -0.45)
  if (ny > -0.62 && ny < -0.42) {
    const arcY = -0.52 + (nx * nx) * 0.22;
    if (Math.abs(ny - arcY) < 0.045 && Math.abs(nx) < 0.55) {
      // Golden arc
      return [251, 191, 36, 255];
    }
  }

  // Enterprise 'W' glyph
  // Check segments of 'W'
  // Center is at 0, 0
  const inW = isInsideW(nx, ny);
  if (inW) {
    // Vibrant electric cyan gradient
    const wT = (ny + 0.5);
    const wr = Math.round(56 + (37 - 56) * Math.max(0, Math.min(1, wT)));
    const wg = Math.round(189 + (99 - 189) * Math.max(0, Math.min(1, wT)));
    const wb = Math.round(248 + (235 - 248) * Math.max(0, Math.min(1, wT)));
    return [wr, wg, wb, 255];
  }

  // Golden Infinity loop near bottom (ny ~ 0.55 to 0.75)
  if (ny > 0.45 && ny < 0.78 && Math.abs(nx) < 0.55) {
    const inInf = isInsideInfinity(nx, ny);
    if (inInf) {
      return [251, 191, 36, 255]; // Gold
    }
  }

  return [r, g, b, a];
}

function isInsideW(x, y) {
  // Normalize 'W' into coordinate box x in [-0.55, 0.55], y in [-0.35, 0.35]
  if (y < -0.35 || y > 0.38 || Math.abs(x) > 0.55) return false;

  // 4 diagonal strokes:
  // Stroke 1: from (-0.45, -0.3) to (-0.28, 0.35)
  // Stroke 2: from (-0.28, 0.35) to (-0.05, -0.15)
  // Stroke 3: from (0.05, -0.15) to (0.28, 0.35)
  // Stroke 4: from (0.28, 0.35) to (0.45, -0.3)

  const width = 0.08;
  if (distToSegment(x, y, -0.45, -0.3, -0.28, 0.35) < width) return true;
  if (distToSegment(x, y, -0.28, 0.35, -0.05, -0.15) < width) return true;
  if (distToSegment(x, y, 0.05, -0.15, 0.28, 0.35) < width) return true;
  if (distToSegment(x, y, 0.28, 0.35, 0.45, -0.3) < width) return true;

  return false;
}

function isInsideInfinity(x, y) {
  // Infinity centers at (-0.16, 0.62) and (0.16, 0.62)
  const d1 = Math.hypot(x - (-0.15), y - 0.62);
  const d2 = Math.hypot(x - 0.15, y - 0.62);
  const ringR = 0.12;
  const thick = 0.035;

  if (Math.abs(d1 - ringR) < thick || Math.abs(d2 - ringR) < thick) {
    return true;
  }
  return false;
}

function distToSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const l2 = dx * dx + dy * dy;
  if (l2 === 0) return Math.hypot(px - x1, py - y1);
  let t = ((px - x1) * dx + (py - y1) * dy) / l2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
}

// Generate all required PWA icons
console.log('Generating PWA icons...');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. 192x192
const icon192 = createPNG(192, 192, (x, y, w, h) => renderWorkdayIcon(x, y, w, h, false));
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), icon192);
console.log('Created pwa-192x192.png');

// 2. 512x512
const icon512 = createPNG(512, 512, (x, y, w, h) => renderWorkdayIcon(x, y, w, h, false));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), icon512);
console.log('Created pwa-512x512.png');

// 3. 512x512 maskable (with 15% safe padding)
const iconMaskable = createPNG(512, 512, (x, y, w, h) => renderWorkdayIcon(x, y, w, h, true));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), iconMaskable);
console.log('Created pwa-maskable-512x512.png');

// 4. Apple Touch Icon (180x180)
const iconApple = createPNG(180, 180, (x, y, w, h) => renderWorkdayIcon(x, y, w, h, false));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), iconApple);
console.log('Created apple-touch-icon.png');

// 5. Favicon (64x64 PNG saved as favicon.ico compatible format)
const iconFavicon = createPNG(64, 64, (x, y, w, h) => renderWorkdayIcon(x, y, w, h, false));
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), iconFavicon);
console.log('Created favicon.ico');

console.log('All PWA icons successfully generated!');
