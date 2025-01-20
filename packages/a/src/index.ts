import { createProcedure, createRouter } from '@org/utils';

export const a = createRouter({
	foo: createProcedure(() => 'foo'),
	bar: createProcedure(() => 'bar'),
	baz: createProcedure(() => 'baz'),
	qux: createProcedure(() => 'qux'),
});

a.bar; // ✅ Go to definition works here
