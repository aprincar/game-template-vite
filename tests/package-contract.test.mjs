import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('template exposes typecheck, build, package and validation as production gates', () => {
  const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
  assert.equal(typeof pkg.scripts.typecheck, 'string');
  assert.equal(typeof pkg.scripts.validate, 'string');
  assert.match(pkg.scripts.check, /typecheck/);
  assert.match(pkg.scripts.check, /validate/);
  assert.equal(fs.existsSync(new URL('../tsconfig.json', import.meta.url)), true);
  assert.equal(fs.existsSync(new URL('../scripts/validate.mjs', import.meta.url)), true);
});

test('template validator keeps sensitive capabilities optional', () => {
  const validator = fs.readFileSync(new URL('../scripts/validate.mjs', import.meta.url), 'utf8');
  assert.match(validator, /sensitive permissions must be declared only in optionalPermissions/);
  assert.match(validator, /non-offline games must declare network in optionalPermissions/);
});
