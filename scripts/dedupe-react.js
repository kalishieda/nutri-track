'use strict';

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const nestedDir = path.join(root, 'node_modules', 'moti', 'node_modules');

function linkPackage(name) {
  const target = path.join(root, 'node_modules', name);
  const link = path.join(nestedDir, name);

  if (!fs.existsSync(target)) {
    console.warn(`[dedupe-react] skipping ${name} — not installed at project root`);
    return;
  }

  if (!fs.existsSync(nestedDir)) {
    return;
  }

  if (fs.existsSync(link)) {
    fs.rmSync(link, { recursive: true, force: true });
  }

  fs.symlinkSync(target, link, 'junction');
  console.log(`[dedupe-react] linked ${name}`);
}

linkPackage('react');
linkPackage('react-dom');
