export const a = {
	foo: () => 'foo',
	bar: () => 'bar',
	baz: () => 'baz',
	qux: () => 'qux',
} as const;

a.bar; // ✅ Go to definition works here
