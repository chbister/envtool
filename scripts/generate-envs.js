// .env.example: Alle Umgebungen zusammenführen + sensible Werte ersetzen
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
  if (/_KEY$|_PASSWORD$|_SECRET$/i.test(key)) {
    return `${key}="ChangeThisSecretKey!"`;
  }
  return `${key}="${value}"`;
});

fs.writeFileSync('.env.example', exampleLines.join('\n'));
console.log(`✅ .env.example generiert (basierend auf allen Konfigurationen, sensible Werte ersetzt)`);
