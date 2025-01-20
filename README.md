# TypeScript Monorepo Demo

This repository demonstrates an ~~issue~~ lack of feature in TypeScript's "Jump to Definition" functionality when working with nested package imports in a monorepo.

## Setup Instructions

```shell
git clone git@github.com:KATT/typescript-jump-to-definition-through-sub-packages.git
cd typescript-jump-to-definition-through-sub-packages
pnpm i
```

& if you want to watch for changes:

```shell
pnpm dev
```

## Problem Explanation

TypeScript's "Jump to Definition" does not work through multiple levels of package imports. Here's the setup:

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

   a; // ✅ Jump to definition works here
   a.foo; // ✅ Jump to definition works here

   export const b = {
   	a,
   } as const;
   ```

1. Package `@org/c` imports from package `@org/b` and tries to access the nested property:

   ```typescript
   import { b } from '@org/b';

   b; // ✅ Jump to definition works here
   b.a; // ❌ Jump to definition fails here
   b.a.foo; // ❌ Jump to definition fails here
   ```

## Expected Behavior

Jumping to definition should work through multiple levels of package imports as if the code was written in a single file.

## Current Behavior

- In package `@org/b`, TypeScript's "Jump to Definition" works as expected when clicking on `a.foo`
- In package `@org/c`, "Jump to Definition" does **not** work as expected when trying to navigate through the re-exported property `b.a.foo`

## Technical Details

All packages:

- Use TypeScript with strict configuration
- Are properly linked using `workspace:*` dependencies
- Generate declaration maps (enabled in base tsconfig)
