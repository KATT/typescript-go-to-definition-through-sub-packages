type Fn = (...args: any[]) => any;
type RouterRecord = {
	[key: string]: Fn | RouterRecord;
};

type ProcedureDef = {
	input: unknown;
	output: unknown;
};

export interface Procedure<TDef extends ProcedureDef> {
	_def: {
		procedure: true;
	};
	(opts: TDef['input']): TDef['output'];
}

export type DecoratedRouter<T extends RouterRecord> = {
	[K in keyof T]: T[K] extends infer $Value
		? $Value extends Fn
			? Procedure<{
					input: $Value extends Fn ? Parameters<$Value> : never;
					output: $Value extends Fn ? ReturnType<$Value> : never;
				}>
			: $Value extends RouterRecord
				? DecoratedRouter<$Value>
				: never
		: never;
};
// test
export function createRouter<T extends RouterRecord>(routes: T) {
	return routes as never as DecoratedRouter<T>;
}
