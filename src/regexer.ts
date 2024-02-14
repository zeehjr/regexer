type RegexerStep =
  | RegexerStepAnyCharacter
  | RegexerStepAnyCharacterOptional
  | RegexerStepExactly
  | RegexerStepOneOf
  | RegexerStepAnyCharacterBetweenChars
  | RegexerStepGroup
  | RegexerStepRepeat;

type RegexerStepAnyCharacter = {
  type: 'anyCharacter';
};

type RegexerStepAnyCharacterOptional = {
  type: 'anyCharacterOptional';
};

type RegexerStepExactly = {
  type: 'exactly';
  data: string;
};

type RegexerStepOneOf = {
  type: 'oneOf';
  data: Array<string>;
};

type RegexerStepAnyCharacterBetweenChars = {
  type: 'anyCharacterBetweenChars';
  data: Array<string>;
};

type RegexerStepGroup = {
  type: 'group';
  auxRegexer: Regexer;
};

type RegexerStepRepeat = {
  type: 'repeat';
  auxRegexer: Regexer;
  times: number | 'indefinitely';
};

type RegexerOptions = {
  isStart?: boolean;
  isEnd?: boolean;
  caseSensitive?: boolean;
};

export class Regexer {
  public options: Required<RegexerOptions>;

  constructor(options?: RegexerOptions) {
    this.options = {
      isStart: options?.isStart ?? false,
      isEnd: options?.isEnd ?? false,
      caseSensitive: options?.caseSensitive ?? true,
    };
  }

  private steps: Array<RegexerStep> = [];

  private validate() {
    const errors: Array<string> = [];

    return errors;
  }

  private buildPattern() {
    const errors = this.validate();

    if (errors.length > 0) {
      throw new Error(errors.join('\n'));
    }

    let pattern = '';

    if (this.options.isStart) {
      pattern += '^';
    }

    for (const step of this.steps) {
      switch (step.type) {
        case 'exactly':
          pattern += step.data;
          break;
        case 'anyCharacter':
          pattern += '.';
          break;
        case 'anyCharacterOptional':
          pattern += '.?';
          break;
        case 'oneOf':
          pattern += `(?:${step.data.join('|')})`;
          break;
        case 'repeat':
          const innerPattern = step.auxRegexer.buildPattern();
          pattern += `(?:${innerPattern})`;

          switch (step.times) {
            case 'indefinitely':
              pattern += '+';
              break;
            default:
              pattern += `{${step.times}}`;
          }

          break;
      }
    }

    return pattern;
  }

  public build() {
    return new BuiltRegexer(this.buildPattern(), this.options);
  }

  public get anyCharacter() {
    this.steps.push({
      type: 'anyCharacter',
    });

    return this;
  }

  public anyCharacterOptional() {
    this.steps.push({
      type: 'anyCharacterOptional',
    });

    return this;
  }

  public exactly(str: string) {
    this.steps.push({
      type: 'exactly',
      data: str,
    });

    return this;
  }

  public oneOf(strings: Array<string>) {
    this.steps.push({
      type: 'oneOf',
      data: strings,
    });

    return this;
  }

  public anyCharacterOfList(characterList: Array<string>) {
    this.steps.push({
      type: 'anyCharacterBetweenChars',
      data: characterList,
    });

    return this;
  }

  public group(handler: (regexer: Regexer) => Regexer) {
    const auxRegexer = new Regexer();

    handler(auxRegexer);

    this.steps.push({
      type: 'group',
      auxRegexer,
    });

    return this;
  }

  public repeat(
    times: number | 'indefinitely',
    handler: (regexer: Regexer) => Regexer
  ) {
    const auxRegexer = new Regexer();

    handler(auxRegexer);

    this.steps.push({
      type: 'repeat',
      auxRegexer,
      times,
    });

    return this;
  }
}

class BuiltRegexer {
  private regexp: RegExp;

  constructor(pattern: string, regexerOptions: RegexerOptions) {
    let flags = '';

    if (!regexerOptions.caseSensitive) {
      flags += 'i';
    }

    this.regexp = new RegExp(pattern, flags);

    console.log(this.regexp);
  }

  public matchFirst(input: string) {}

  public matchAll(input: string) {}

  public succeed(input: string) {
    return this.regexp.test(input);
  }
}
