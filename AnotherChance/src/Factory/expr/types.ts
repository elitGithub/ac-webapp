export interface Variable {
	exprs: Expression[];
	get: () => any;
}

export interface Expression {
	valid: boolean;
	value: boolean;
}

export type TokenKind =
	| "operation"
	| "variable"
	| "literal"
	| "expr_open"
	| "expr_close"
	| "whitespace"
	| "result";

export interface Token {
	value: string;
	kind: TokenKind;
	invert?: boolean;
	start: number;
	end: number;
}

export interface SimpleToken {
	value: string;
	result?: boolean;
	invert?: boolean;
	kind: TokenKind;
}
