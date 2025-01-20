export type Fn = (...args: any[]) => any;
export type RouterRecord = {
	[key: string]: Procedure<ProcedureDef> | RouterRecord | BuiltRouter<any>;
};

export type ProcedureDef = {
	input: any;
	output: any;
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
			: $Value extends BuiltRouter<infer $Record>
				? $Record
				: $Value extends RouterRecord
					? DecoratedRouter<$Value>
					: never
		: never;
};

export type BuiltRouterSignature<_T extends RouterRecord> = {
	_def: {
		router: true;
	};
};

export type BuiltRouter<T extends RouterRecord> = DecoratedRouter<T> & {
	_def: {
		router: true;
	};
};

export function createRouter<T extends RouterRecord>(routes: T) {
	return routes as never as BuiltRouter<T>;
}

type ProcedureFn<TInput, TOutput> = (input: TInput) => TOutput;
export function createProcedure<TOutput>(
	fn: ProcedureFn<undefined, TOutput | Promise<TOutput>>,
) {
	return fn as Procedure<{ input: undefined; output: TOutput }>;
}
