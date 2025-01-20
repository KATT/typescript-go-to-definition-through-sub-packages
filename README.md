# TypeScript Monorepo Demo

This repository demonstrates a limitation in TypeScript's "Go to Definition" functionality when working with nested package imports in a monorepo. While upcoming improvements in TypeScript ([PR #60005](https://github.com/microsoft/TypeScript/pull/60005)) have partially addressed this issue, some limitations still remain with deeply nested property access.

## Setup Instructions

```shell
git clone git@github.com:KATT/typescript-go-to-definition-through-sub-packages.git
cd typescript-go-to-definition-through-sub-packages
pnpm i
```

& if you want to watch for changes:

```shell
pnpm dev
```

## Problem Explanation

TypeScript's "Go to Definition" does not work through multiple levels of package imports. Here's the setup:

1. Package `@org/a` defines a base object:

   ```typescript
   export const a = {
   	foo: 'foo',
   	bar: 'bar',
   	baz: 'baz',
   	qux: 'qux',
   } as const;
   ```

1. Package `@org/b` imports and re-exports package `@org/a`'s object:

   ```typescript
   import { a } from '@org/a';

   a; // ✅ Go to definition works here with ^5.7.3
   a.foo; // 🚧 Go to definition does not works here, but seemingly fixed by https://github.com/microsoft/TypeScript/pull/60005
   // ^?

   export const b = {
   	a,
   } as const;
   ```

1. Package `@org/c` imports from package `@org/b` and tries to access the nested property:

   ```typescript
   import { b } from '@org/b';

   b; // 🚧 Go to definition does not works here, but seemingly fixed by https://github.com/microsoft/TypeScript/pull/60005
   b.a; // <--- 🚧 Go to definition does not works here, but seemingly fixed by https://github.com/microsoft/TypeScript/pull/60005
   b.a.foo; // <--- ❌ Go to definition does not work here
   ```

## Expected Behavior

Go to definition should work through multiple levels of package imports as if the code was written in a single file.

## Current Behavior

- In package `@org/b`, TypeScript's "Go to Definition" works as expected when clicking on `a.foo`
- In package `@org/c`, "Go to Definition" does **not** work as expected when trying to navigate through the re-exported property `b.a.foo`

## Technical Details

All packages:

- Use TypeScript with strict configuration
- Are properly linked using `workspace:*` dependencies
- Generate declaration maps (enabled in base tsconfig)
