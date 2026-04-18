const fs = require('fs');
const path = 'c:/Users/medya/AppData/Roaming/Code/User/workspaceStorage/0e0c66a55a2bc2c5967a53ed005772a4/GitHub.copilot-chat/chat-session-resources/0e92bc6d-d7af-4f56-a39e-ad6c6b22fbe8/call_MHx2akU2TTByMU1wQUtHbHhURzY__vscode-1776440580082/content.txt';

let c = fs.readFileSync(path, 'utf8');
c = c.replace(/Bundeslâ”œÃ±nder/g, 'Bundesländer')
  .replace(/Stâ”œÃ±dte/g, 'Städte')
  .replace(/4.9Ã”Ã¿Ã /g, '4.9★')
  .replace(/Ã”Ã¶Ã‡Ã”Ã¶Ã‡/g, '──')
  .replace(/verf├╝gbar/g, 'verfügbar')
  .replace(/W├ñhlen/g, 'Wählen')
  .replace(/Seri├Âs/g, 'Seriös')
  .replace(/Pers├Ânliche/g, 'Persönliche')
  .replace(/ÔÇö/g, '—')
  .replace(/T├╝V/g, 'TÜV')
  .replace(/├╝/g, 'ü')
  .replace(/├ñ/g, 'ä')
  .replace(/├Â/g, 'ö')
  .replace(/Bundesl├ñndern/g, 'Bundesländern')
  .replace(/St├ñdten/g, 'Städten')
  .replace(/Ôÿà/g, '★')
  .replace(/ÔöÇÔöÇ/g, '──');

fs.writeFileSync('src/app/[locale]/standorte/page.tsx', c, 'utf8');
console.log('Restored!');
