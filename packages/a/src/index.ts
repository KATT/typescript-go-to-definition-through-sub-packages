import { createRouter } from '@org/utils';

export const a = createRouter({
	foo: () => 'foo',
	bar: () => 'bar',
	baz: () => 'baz',
	qux: () => 'qux',
});

a.bar; // ✅ Go to definition works here
