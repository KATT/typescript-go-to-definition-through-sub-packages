import { b } from '@org/b';

b; // 🚧 Go to definition does not works here, but seemingly fixed by https://github.com/microsoft/TypeScript/pull/60005
b.a; // <--- 🚧 Go to definition does not works here, but seemingly fixed by https://github.com/microsoft/TypeScript/pull/60005
b.a.foo; // <--- ❌ Go to definition does not work here
