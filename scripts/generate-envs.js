const fs = require('fs');

const config = JSON.parse(fs.readFileSync('env-config.json', 'utf-8'));
const globalVars = config.global || {};
const environments = Object.keys(config).filter(env => env !== 'global');

const allKeys = new Set();

function formatEnv(vars) {
  return Object.entries(vars)
      .map(([key, val]) => `${key}="${val}"`)
      .join('\n');
}

// .env.[env] generieren
environments.forEach(env => {
  const merged = { ...globalVars, ...config[env] };
  const output = formatEnv(merged);
  fs.writeFileSync(`.env.${env}`, output);
  console.log(`✅ .env.${env} generiert`);
  Object.keys(merged).forEach(k => allKeys.add(k));
});

// .env.example: Sammle alle Keys & maskiere sensible
const mergedVars = {};
Object.keys(config).forEach((envKey) => {
  const envVars = config[envKey];
  if (typeof envVars === 'object') {
    Object.entries(envVars).forEach(([key, val]) => {
      if (!(key in mergedVars)) {
        mergedVars[key] = val;
      }
    });
  }
});

const exampleLines = Object.entries(mergedVars).map(([key, value]) => {
  if (/_KEY$|_PASSWORD$|_SECRET$|_TOKEN$/i.test(key)) {
    return `${key}="ChangeThisSecretKey!"`;
  }
  return `${key}="${value}"`;
});

fs.writeFileSync('.env.example', exampleLines.join('\n'));
console.log(`✅ .env.example generiert (mit Standardwerten, sensible ersetzt)`);
