import { a } from '@org/a';
import { createRouter } from '@org/utils';

a; // ✅ Go to definition works here with ^5.7.3
a.foo; // 🚧 Go to definition does not work here, but seemingly fixed by https://github.com/microsoft/TypeScript/pull/60005
// ^?

export const b = createRouter({
	a,
});

b.a.bar;
