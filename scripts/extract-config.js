const fs = require('fs');

const inputFile = fs.existsSync('.env.local') ? '.env.local' : '.env';
const content = fs.readFileSync(inputFile, 'utf-8');

const lines = content.split(/\r?\n/).filter(line =>
  line.trim() !== '' && !line.trim().startsWith('#')
);

const envVars = {};
lines.forEach(line => {
  const [key, ...rest] = line.split('=');
  envVars[key.trim()] = rest.join('=').replace(/^"|"$/g, '');
});

const config = {
  global: {},
  local: envVars
};

fs.writeFileSync('env-config.json', JSON.stringify(config, null, 2));
console.log(`✅ env-config.json wurde aus ${inputFile} erzeugt.`);