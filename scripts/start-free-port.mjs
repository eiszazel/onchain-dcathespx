#!/usr/bin/env node
import net from 'node:net';
import { spawn } from 'node:child_process';

function checkPortAvailable(port) {
  return new Promise((resolve) => {
    const srv = net.createServer();
    srv.once('error', (e) => resolve(false));
    srv.listen(port, () => srv.close(() => resolve(true)));
  });
}

async function getFreePort(preferred = Number(process.env.PORT) || 3000) {
  if (await checkPortAvailable(preferred)) return preferred;
  return await new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.listen(0, () => {
      const addr = srv.address();
      if (!addr || typeof addr === 'string') return reject(new Error('No port'));
      const p = addr.port;
      srv.close(() => resolve(p));
    });
    srv.once('error', reject);
  });
}

const port = await getFreePort();
process.env.PORT = String(port);
console.log(`[start-free-port] Launching Next on http://localhost:${port}`);
const shell = process.platform === 'win32';
const child = spawn('npx', ['next', 'start', '-p', String(port)], {
  stdio: 'inherit',
  env: process.env,
  shell,
});
child.on('exit', (code) => process.exit(code ?? 0));

