import type { Token, TokenKind } from "./types";

const CH_0 = 48; //  0
const CH_9 = 57; //  9
const CH_CR = 13; //  CR
const CH_LF = 10; //  LF
const CH_TAB = 9; //  /t
const CH_SPACE = 32; //  /s
const CH_PERIOD = 46; //  .
const CH_COMMA = 44; //  ,
const CH_OPAREN = 40; //  (
const CH_CPAREN = 41; //  )

const CH_AND = 38; //  &
const CH_OR = 124; //  |
const CH_EQ = 61; // =
const CH_EXCL = 33; //  !
const CH_DOLLAR = 36; // $
const CH_GT = 62; // >
const CH_LT = 60; // <

////////////////////////////////////////////////////////////////////////////////
// Utils
function classify(ch: number): TokenKind {
	if (isDecimalDigit(ch)) {
		return "literal";
	}

	switch (ch) {
		case CH_DOLLAR:
			return "variable";

		case CH_PERIOD:
		case CH_COMMA:
			return "literal";

		case CH_OPAREN:
			return "expr_open";

		case CH_CPAREN:
			return "expr_close";

		case CH_OR:
		case CH_AND:
		case CH_EQ:
		case CH_GT:
		case CH_LT:
		case CH_EXCL:
			return "operation";

		case CH_CR:
		case CH_LF:
		case CH_TAB:
		case CH_SPACE:
			return "whitespace";

		default:
			return "literal";
	}
}

function report(tk: Token) {
	throw new Error(`Invalid token found at pos ${tk.start} '${tk.value}' ${tk.kind}`);
}

function isDecimalDigit(ch: number) {
	return ch >= CH_0 && ch <= CH_9; // 0...9
}

function isWhiteSpace(ch: number) {
	switch (ch) {
		case CH_CR:
		case CH_LF:
		case CH_SPACE:
		case CH_TAB:
			return true;

		default:
			return false;
	}
}

////////////////////////////////////////////////////////////////////////////////

export function tokenize(sz: string) {
	const max = sz.length;

	let n = 0;
	let ch = 0;
	let kind: TokenKind;

	function adv() {
		if (n >= max) {
			return false;
		}
		++n;

		readCode();
		return true;
	}

	function skipws() {
		while (n < sz.length) {
			if (!isWhiteSpace(ch)) {
				break;
			}

			adv();
		}
	}

	function readCode() {
		ch = sz.charCodeAt(n);
		kind = classify(ch);
	}

	// 1 == $day
	// ($replays_mom_kiss && !($quest == "kate_blowjob_dream"))
	//

	function readTerm() {
		skipws();
		let invert = false;

		while (ch == CH_EXCL) {
			adv();
			invert = !invert;
		}

		const term = readToken();

		if (term.kind == "expr_open" || term.kind == "variable") {
			term.invert = invert;
		}

		return term;
	}

	function readToken(): Token {
		let start = n;
		const k = kind;
		let depth = 1;

		while (adv()) {
			if (k == "expr_open") {
				if (kind == "expr_open") {
					depth++;
				} else if (kind == "expr_close") {
					depth--;

					if (depth <= 0) {
						break;
					}
				}
			} else if (k == "variable") {
				if (kind != "literal") {
					break;
				}
			} else {
				if (kind != k) {
					break;
				}
			}
		}

		const end = n;

		if (k == "expr_open") {
			start++;
			adv();
		} else if (k == "variable") {
			start++;
		}

		return {
			kind: k,
			value: sz.substring(start, end),
			start,
			end
		};
	}

	let op: Token;
	const tokens: Token[] = [];
	readCode();

	while (n < sz.length) {
		const term = readTerm();
		tokens.push(term);

		skipws();

		if (n >= sz.length) {
			break;
		}

		op = readToken();

		if (op.kind != "operation") {
			if (tokens.length < 2) {
				report(op);
			} else {
				break;
			}
		} else {
			tokens.push(op);
		}
	}

	return tokens;
}
