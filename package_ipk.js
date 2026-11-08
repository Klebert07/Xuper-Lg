/**
 * Generador de paquetes .ipk para LG webOS
 * Empaqueta la aplicación y el servicio en formato Debian ar compliant con webOS
 */
const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const WORKSPACE = __dirname;
const APP_DIR = path.join(WORKSPACE, 'usr', 'palm', 'applications', 'com.webosflux.xuptertv.fidelity');
const appinfoPath = path.join(APP_DIR, 'appinfo.json');

if (!fs.existsSync(appinfoPath)) {
  console.error('No se encontró appinfo.json en:', appinfoPath);
  process.exit(1);
}

const appinfo = JSON.parse(fs.readFileSync(appinfoPath, 'utf8'));
const appId = appinfo.id || 'com.webosflux.xuptertv.fidelity';
const appVersion = appinfo.version || '1.0.5';
const ipkName = `Xuper WebOS ${appVersion}.ipk`;
const ipkPath = path.join(WORKSPACE, ipkName);

// Sincronizar automáticamente imagen de bienvenida si Windows le puso doble extensión
const welcomeDir = path.join(APP_DIR, 'assets', 'original', 'welcome');
const webpJpeg = path.join(welcomeDir, 'wind_bg.webp.jpeg');
const webp = path.join(welcomeDir, 'wind_bg.webp');
if (fs.existsSync(webpJpeg)) {
  fs.copyFileSync(webpJpeg, webp);
  console.log('[+] Sincronizada imagen de bienvenida wind_bg.webp');
}

console.log(`===============================================`);
console.log(` Empaquetador webOS IPK`);
console.log(` ID: ${appId}`);
console.log(` Versión: ${appVersion}`);
console.log(` Salida: ${ipkName}`);
console.log(`===============================================`);

const tempDir = path.join(WORKSPACE, '_ipk_temp');
if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
fs.mkdirSync(tempDir, { recursive: true });

// 1. debian-binary
const debianBinaryPath = path.join(tempDir, 'debian-binary');
fs.writeFileSync(debianBinaryPath, '2.0\n', 'ascii');

// 2. control file
const controlContent = [
  `Package: ${appId}`,
  `Version: ${appVersion}`,
  `Section: misc`,
  `Priority: optional`,
  `Architecture: all`,
  `Maintainer: webosflux`,
  `Description: ${appinfo.title || 'XuperTV'} optimizado para webOS 25`
].join('\n') + '\n';

const controlPath = path.join(tempDir, 'control');
fs.writeFileSync(controlPath, controlContent, 'utf8');

console.log('[1/4] Creando control.tar.gz...');
const controlTarGz = path.join(tempDir, 'control.tar.gz');
cp.execSync(`tar -czf "${controlTarGz}" -C "${tempDir}" control`);

console.log('[2/4] Creando data.tar.gz (excluyendo ffmpeg de 32 bits)...');
const dataTarGz = path.join(tempDir, 'data.tar.gz');

// Excluir ffmpeg de 32 bits (incompatible con webOS 25) para reducir el tamaño de 35MB a ~2MB
cp.execSync(`tar -czf "${dataTarGz}" --exclude="ffmpeg" -C "${WORKSPACE}" usr`);

console.log('[3/4] Empaquetando en formato ar (.ipk)...');

function createArHeader(name, size, mode = '100644') {
  const buf = Buffer.alloc(60, 0x20); // relleno de espacios
  buf.write(name.padEnd(16, ' '), 0, 16, 'ascii');
  buf.write(Math.floor(Date.now() / 1000).toString().padEnd(12, ' '), 16, 12, 'ascii');
  buf.write('0'.padEnd(6, ' '), 28, 6, 'ascii');
  buf.write('0'.padEnd(6, ' '), 34, 6, 'ascii');
  buf.write(mode.padEnd(8, ' '), 40, 8, 'ascii');
  buf.write(size.toString().padEnd(10, ' '), 48, 10, 'ascii');
  buf.write('`\n', 58, 2, 'ascii');
  return buf;
}

function packAr(files, outputPath) {
  const out = fs.createWriteStream(outputPath);
  out.write('!<arch>\n', 'ascii');
  for (const f of files) {
    const data = fs.readFileSync(f.path);
    const header = createArHeader(f.name, data.length, f.mode || '100644');
    out.write(header);
    out.write(data);
    if (data.length % 2 !== 0) {
      out.write('\n', 'ascii'); // byte de alineación par
    }
  }
  out.end();
}

const arFiles = [
  { name: 'debian-binary', path: debianBinaryPath },
  { name: 'control.tar.gz', path: controlTarGz },
  { name: 'data.tar.gz', path: dataTarGz }
];

packAr(arFiles, ipkPath);

setTimeout(() => {
  // Limpiar temporales
  try {
    fs.rmSync(tempDir, { recursive: true, force: true });
  } catch (e) {}

  if (fs.existsSync(ipkPath)) {
    const stats = fs.statSync(ipkPath);
    const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);
    console.log('[4/4] ¡Paquete generado con éxito!');
    console.log(`-----------------------------------------------`);
    console.log(` Archivo: ${ipkName}`);
    console.log(` Tamaño: ${sizeMb} MB (${stats.size} bytes)`);
    console.log(` Ruta completa: ${ipkPath}`);
    console.log(`-----------------------------------------------`);
  } else {
    console.error('Error: No se pudo generar el archivo .ipk');
  }
}, 500);

