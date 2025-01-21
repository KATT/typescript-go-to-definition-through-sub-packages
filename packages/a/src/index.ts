import { t } from '@org/utils';

export const a = t.router({
	foo: () => 'foo',
	bar: () => 'bar',
	baz: () => 'baz',
	qux: () => 'qux',
});

a.bar; // ✅ Go to definition works here
