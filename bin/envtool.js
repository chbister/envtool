#!/usr/bin/env node

const [,, command] = process.argv;

switch (command) {
  case 'generate':
    require('../scripts/generate-envs.js');
    break;
  case 'extract':
    require('../scripts/extract-config.js');
    break;
  default:
    console.log(`❓ Unbekannter Befehl: ${command}
Verfügbare Befehle: generate, extract`);
}