import { TokenType, Token } from './types';

function isNonWhitespaceCharacter(char: string): boolean {
	return /\S/.test(char);
}

function isCoordinate(input: string): boolean {
  return /\d{4}/.test(input);
}

function isCoordinateSequence(input: string): boolean {
	return /\d{4}-(?:\d{4}-)*\d{4}/.test(input);
}

export function lexer(input: string): Token[] {
  const tokens: Token[] = [];
  let position = 0;
  let isBracketed = false;

  while (position < input.length) {
    const char = input[position];

    if (char === '\n') {
      tokens.push({ type: TokenType.NEWLINE, value: char });
      position++;
    } else if (char === ' ' || char === '\t') {
      tokens.push({ type: TokenType.WHITESPACE, value: char });
      position++;
    } else if (char === ':' && !isBracketed) {
      tokens.push({ type: TokenType.COLON, value: char });
      position++;
    } else if (char === '[' && input[position + 1] === '[') {
      tokens.push({ type: TokenType.DOUBLE_OPEN_BRACKET, value: '[[' });
      position += 2;
	  isBracketed = true;
    } else if (char === ']' && input[position + 1] === ']') {
      tokens.push({ type: TokenType.DOUBLE_CLOSE_BRACKET, value: ']]' });
      position += 2;
	  isBracketed = false;
    } else if (char === '"') {
      tokens.push({ type: TokenType.QUOTE, value: char });
      position++;
	  isBracketed = !isBracketed;
    } else {
      let tokenValue = '';
	  const terminators = ['\n', ' ', '\t', '[', ']', '"'];
	  if (!isBracketed) terminators.push(':');
      while (
        position < input.length &&
        !terminators.includes(input[position]) &&
        isNonWhitespaceCharacter(input[position])
      ) {
        tokenValue += input[position];
        position++;
      }

	  if (isCoordinateSequence(tokenValue)) {
		tokenValue.split('-').flatMap(s => [
			{ type: TokenType.DASH, value: '-' },
			{ type: TokenType.COORDINATE, value: s }
		]).slice(1).forEach(token => { tokens.push(token) });
      } else if (isCoordinate(tokenValue)) {
        tokens.push({ type: TokenType.COORDINATE, value: tokenValue });
      } else {
        tokens.push({ type: TokenType.WORD, value: tokenValue });
      }
    }
  }

  tokens.push({ type: TokenType.NEWLINE, value: "\n" });
  return tokens;
}
