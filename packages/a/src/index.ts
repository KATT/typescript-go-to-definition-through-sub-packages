import { t } from '@org/utils';

const proc = t.procedure;
export const a = t.router({
	foo: proc.query(() => 'foo' as const),
	bar: proc.query(() => 'bar' as const),
	baz: proc.query(() => 'baz' as const),
	qux: proc.query(() => 'qux' as const),
	sub: {
		routers: {
			are: {
				cool: proc.query(() => 'cool' as const),
			},
		},
	},
});

a.bar; // ✅ Go to definition works here
