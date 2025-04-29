# estate-prisma-type

Shared Prisma models & enums that any Estate project can import.

```bash
yarn add estate-prisma-type

import { prisma, User, Post } from 'estate-prisma-type'

await prisma.user.findMany()

---

### One-liner to bootstrap

```bash
yarn install           # installs deps
yarn generate          # creates src/generated
yarn build             # compiles to dist/


npm publish --access public
# → `yarn add estate-prisma-type` works from any project