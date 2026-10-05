// Runs automatically before `npm run dev` and `npm run build`.
// This project uses Tailwind CSS v3. Tailwind v4 has a different PostCSS plugin and will crash with:
//   "It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin..."
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const fail = (msg) => {
  console.error(`\n\x1b[31m✖ ${msg}\x1b[0m\n`);
  console.error('Fix (run inside the "frontend" folder):\n');
  console.error('   npm ci\n');
  console.error('This deletes node_modules and installs the exact versions from package-lock.json.');
  console.error('If it still fails, delete the "node_modules" folder and "package-lock.json", then run: npm install\n');
  process.exit(1);
};

if (!existsSync('node_modules')) fail('Dependencies are not installed.');

let version;
try {
  version = JSON.parse(readFileSync(require.resolve('tailwindcss/package.json'), 'utf8')).version;
} catch {
  fail('tailwindcss is not installed.');
}

if (!version.startsWith('3.')) {
  fail(`Tailwind CSS ${version} is installed, but this project needs Tailwind CSS 3.x.`);
}
