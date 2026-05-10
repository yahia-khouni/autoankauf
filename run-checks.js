#!/usr/bin/env node
const { execSync } = require('child_process');

console.log('📋 BASELINE CHECKS\n');

// Run lint
console.log('1️⃣  Running: npm run lint');
console.log('─'.repeat(50));
try {
  execSync('npm run lint', { stdio: 'inherit', cwd: process.cwd() });
  console.log('✅ LINT: PASS\n');
} catch (error) {
  console.log('❌ LINT: FAIL\n');
}

// Run build
console.log('2️⃣  Running: npm run build');
console.log('─'.repeat(50));
try {
  execSync('npm run build', { stdio: 'inherit', cwd: process.cwd() });
  console.log('✅ BUILD: PASS\n');
} catch (error) {
  console.log('❌ BUILD: FAIL\n');
}
