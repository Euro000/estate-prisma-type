import { Project } from 'ts-morph';
import { writeFileSync } from 'fs';
import * as path from 'path';
import { UserEntity } from '../src/entities/UserEntity';
import { CommentEntity } from '../src/entities/CommentEntities';

const SOURCE_GLOB   = 'src/entities/**/*.ts';
const OUT_FLAT      = 'src/flat-entities.d.ts';
const OUT_BARREL    = 'src/index.d.ts';

const project = new Project({ tsConfigFilePath: 'tsconfig.json' });
const flatPieces: string[] = [];

project.getSourceFiles(SOURCE_GLOB).forEach(sf => {
  sf.getClasses().forEach(cls => {
    const name = cls.getName();
    if (!name?.endsWith('Entity')) return;

    const fields = cls.getProperties().map(p => {
      const id   = p.getName();
      const type = p.getType().getText(p).replace(/import\(.*?\)\./g, '');
      return `  ${id}: ${type};`;
    });

    flatPieces.push(`export interface ${name} {\n${fields.join('\n')}\n}`);
  });
});

if (!flatPieces.length) {
  console.error('⚠️  No *Entity classes found.');
  process.exit(1);
}

const flatBanner = '/* Auto-generated - DO NOT EDIT */\n\n';
writeFileSync(OUT_FLAT, flatBanner + flatPieces.join('\n\n'));

const names = flatPieces.map(code => /interface (\w+)/.exec(code)![1]);
const barrel =
  '/* Auto-generated barrel - DO NOT EDIT */\n\n' +
  'export type {\n' +
  names.map(n => `  ${n},`).join('\n') +
  `\n} from './flat-entities';\n`;

writeFileSync(OUT_BARREL, barrel);

console.log(
  `✨  ${names.length} interfaces → ${path.relative(process.cwd(), OUT_FLAT)}\n` +
  `✨  Barrel written        → ${path.relative(process.cwd(), OUT_BARREL)}`
);

