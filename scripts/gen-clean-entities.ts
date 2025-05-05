#!/usr/bin/env ts-node
import { Project } from 'ts-morph';
import { writeFileSync } from 'fs';
import * as path from 'path';

const ENTITIES = 'src/entities/**/*.ts';
const OUT      = 'src/index.d.ts';

const project = new Project({ tsConfigFilePath: 'tsconfig.json' });
const out: string[] = [];

project.getSourceFiles(ENTITIES).forEach(sf => {
  sf.getClasses().forEach(cls => {
    const iface = `${cls.getName()}`;    // already ends with Entity
    const fields = cls.getProperties().map(p => {
      const name = p.getName();
      const type = p.getType().getText().replace(/import\(.*?\)\./g, '');
      return `  ${name}: ${type};`;
    });
    out.push(`export interface ${iface} {\n${fields.join('\n')}\n}`);
  });
});

const banner = '/* Auto‑generated – DO NOT EDIT */\n\n';
writeFileSync(OUT, banner + out.join('\n\n'));
console.log(`✨  Wrote ${path.relative(process.cwd(), OUT)} (${out.length} entities)`);