
import { Project } from 'ts-morph';
import { writeFileSync } from 'fs';
import * as path from 'path';

const SOURCE_GLOB = 'src/entities/**/*.ts';
const OUT_FILE    = 'index.d.ts';

const project = new Project({ tsConfigFilePath: 'tsconfig.json' });
const pieces: string[] = [];

project.getSourceFiles(SOURCE_GLOB).forEach(sf =>
  sf.getClasses().forEach(cls => {
    const name = cls.getName();
    if (!name?.endsWith('Entity')) return;

    const fields = cls.getProperties().map(p => {
      const id   = p.getName();
      const type = p.getType().getText(p).replace(/import\(.*?\)\./g, '');
      return `  ${id}: ${type};`;
    });

    pieces.push(`export interface ${name} {\n${fields.join('\n')}\n}`);
  }),
);

if (!pieces.length) {
  console.error('⚠️  No *Entity classes found.');
  process.exit(1);
}

writeFileSync(
  OUT_FILE,
  '/* Auto-generated - DONT EDIT */\n\n' + pieces.join('\n\n'),
);

console.log(
  `✨  ${pieces.length} interfaces → ${path.relative(process.cwd(), OUT_FILE)}`,
);