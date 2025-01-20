import { a } from '@org/a';

a.foo; // ✅ Jump to definition works here
// ^?

export const b = {
	a,
} as const;
