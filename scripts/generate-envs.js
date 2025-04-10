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

environments.forEach(env => {
  const merged = { ...globalVars, ...config[env] };
  const output = formatEnv(merged);
  fs.writeFileSync(`.env.${env}`, output);
  console.log(`✅ .env.${env} generiert`);
  Object.keys(merged).forEach(k => allKeys.add(k));
});

const exampleLines = Array.from(allKeys).map((key) => {
  if (/_KEY$|_PASSWORD$|_SECRET$/i.test(key)) {
    return `${key}="ChangeThisSecretKey!"`;
  }
  return `${key}=`;
});
fs.writeFileSync('.env.example', exampleLines.join('\n'));
console.log(`✅ .env.example generiert`);
