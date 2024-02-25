import { tokenize } from "./parser";
import type { Expression, SimpleToken, Variable } from "./types";

type OpFunction = typeof compare;

const quoteRegex = /^['"](.*?)['"]$/;
const variables = new Map<string, Variable>();
const expressions = new Map<string, Expression>();
const invalidExprs = new Map<string, boolean>();

let init = false;

function ensureInit() {
	if (init) {
		return;
	}

	init = true;
	// TODO: Improve this ugly code
	import("src/game/stores/base").then((store) => {
		for (const [key, obs] of store.useReadStore().entries()) {
			const exprs = [] as Expression[];
			const vara = { exprs, get: obs.get } as Variable;

			variables.set(key, vara);
			obs.subscribe(() => {
				for (let n = exprs.length - 1; n >= 0; n--) {
					exprs[n].valid = false;
					exprs.splice(n, 1);
				}
			});
		}
	});
}

export function compute(sz: string): boolean {
	if (invalidExprs.has(sz)) {
		return false;
	}

	let expr = expressions.get(sz);

	if (expr && expr.valid) {
		return expr.value;
	} else if (!expr) {
		expr = {} as Expression;
		expressions.set(sz, expr);
	}

	try {
		const tokens = tokenize(sz).reverse() as SimpleToken[];
		// console.log(sz, tokens);

		computeExpr(tokens);
		computeOp(expr, tokens, compare);
		computeOp(expr, tokens, and);
		computeOp(expr, tokens, or);

		const res = tokens[0];

		if (res.kind == "variable") {
			expr.value = resolveToken(res, expr);
		} else {
			expr.value = res.result as boolean;
		}

		expr.valid = true;

		// console.log(`${sz} = ${expr.value}`);
		return expr.value;
	} catch (err) {
		console.error(`**** Failed to compute expression ${err}\n\n${sz} ****`);
		invalidExprs.set(sz, true);
		return false;
	}
}

function computeExpr(tokens: SimpleToken[]) {
	let tk: SimpleToken;
	let val: boolean;
	for (let i = tokens.length - 1; i >= 0; i--) {
		tk = tokens[i];

		if (tk.kind == "expr_open") {
			val = compute(tk.value);

			if (tk.invert == true) {
				val = !val;
			}

			tokens.splice(i, 1, {
				kind: "result",
				result: val,
				value: ""
			});
		}
	}
}

function computeOp(expr: Expression, tokens: SimpleToken[], func: OpFunction) {
	if (tokens.length < 3) {
		return;
	}

	let left: SimpleToken;
	let op: SimpleToken;
	let right: SimpleToken;

	for (let i = tokens.length - 2; i >= 0; i -= 2) {
		left = tokens[i + 1];
		op = tokens[i];
		right = tokens[i - 1];

		if (op.kind != "operation") {
			continue;
		}

		const l = resolveToken(left, expr);
		const r = resolveToken(right, expr);

		const res = func(l, op.value, r);

		if (res == null) {
			continue;
		}

		tokens.splice(i - 1, 3, {
			kind: "result",
			result: res,
			value: ""
		});

		i = tokens.length - 2;
	}
}

function resolveToken(token: SimpleToken, expr: Expression) {
	if (token.kind == "result") {
		return token.result;
	} else if (token.kind != "variable") {
		// Remove quotes
		return token.value.replace(quoteRegex, "$1");
	}

	let chunks = token.value.split("_");
	const name = chunks[0];

	chunks = chunks.slice(1);

	const inst = variables.get(name);

	if (!inst) {
		throw new Error(`Requested variable ${name} does not exist`);
	}

	const n = inst.exprs.indexOf(expr);
	if (n < 0) {
		inst.exprs.push(expr);
	}

	let value = inst.get();

	if (value instanceof Map) {
		const key = chunks[0];
		const val = value.get(key);

		// console.log("expr", key, val, token.invert);
		chunks = chunks.slice(1);

		if (val instanceof Set) {
			value = val.has(chunks.splice(1));
		} else if (!val) {
			value = false;
		} else {
			value = val;
		}
	}

	if (token.invert == true) {
		value = !value;
	}

	return value;
}

function compare(l: any, op: string, r: any) {
	switch (op) {
		case "==":
			return l == r;

		case "!=":
			return l != r;

		case ">=":
			return l >= r;

		case "<=":
			return l <= r;

		case "<":
			return l < r;

		case ">":
			return l > r;

		default:
			return null;
	}
}

function or(l: any, op: string, r: any) {
	if (op != "||") {
		return null;
	}

	return l || r;
}

function and(l: any, op: string, r: any) {
	if (op != "&&") {
		return null;
	}

	return l && r;
}

export default {
	init: () => ensureInit()
};
