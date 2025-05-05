#!/usr/bin/env ts-node
/**
 * Convert every decorated class in src/entities/** into a flat `...Entity`
 * interface and write them all to src/index.d.ts
 */
import { Project } from 'ts-morph';
import { writeFileSync } from 'node:fs';
import path from 'node:path';

const ENTITIES_GLOB = 'src/entities/**/*.ts';
const OUTPUT_FILE   = 'src/index.d.ts';

const project = new Project({ tsConfigFilePath: 'tsconfig.json' });

const interfaces: string[] = [];

project.getSourceFiles(ENTITIES_GLOB).forEach(sf => {
  sf.getClasses().forEach(cls => {
    const ifaceName = `${cls.getName()}`;     // already ends with Entity
    const props = cls.getProperties().map(p => {
      const name = p.getName();
      // Remove any import() prefixes (ts-morph keeps them for type-only imports)
      const type = p.getType().getText(p).replace(/import\(.*?\)\./g, '');
      return `  ${name}: ${type};`;
    });
    interfaces.push(`export interface ${ifaceName} {\n${props.join('\n')}\n}`);
  });
});

const banner =
  '/* Auto‑generated from src/entities – DO NOT EDIT BY HAND */\n\n';
writeFileSync(OUTPUT_FILE, banner + interfaces.join('\n\n'));

console.log(
  `✨  Generated ${interfaces.length} interfaces → ${path.relative(
    process.cwd(),
    OUTPUT_FILE,
  )}`,
);