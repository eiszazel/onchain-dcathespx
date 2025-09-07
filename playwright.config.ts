import { defineConfig, devices } from '@playwright/test';
import net from 'node:net';

async function getFreePort(preferred = 3000): Promise<number> {
  // Try preferred first
  const ok = await new Promise<boolean>((resolve) => {
    const srv = net.createServer();
    srv.once('error', (e: any) => {
      if (e?.code === 'EADDRINUSE') resolve(false);
      else resolve(false);
    });
    srv.listen(preferred, () => {
      srv.close(() => resolve(true));
    });
  });
  if (ok) return preferred;
  // Fallback to ephemeral free port
  return await new Promise<number>((resolve, reject) => {
    const srv = net.createServer();
    srv.listen(0, () => {
      const address = srv.address();
      if (typeof address === 'string' || address === null) return reject(new Error('Failed to allocate port'));
      const p = address.port;
      srv.close(() => resolve(p));
    });
    srv.once('error', reject);
  });
}

export default defineConfig({
  testDir: 'tests/e2e',
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: true,
    timeout: 120_000,
  },
  use: {
    baseURL: 'http://localhost:3000',
    browserName: 'chromium',
    headless: false,
    slowMo: 1000, // Slow down actions by 1 second
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
