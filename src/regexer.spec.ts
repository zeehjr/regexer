import { Regexer } from './regexer';

describe('Regexer', () => {
  it('should work as expected lmao', () => {
    const regexer = new Regexer({
      caseSensitive: false,
    })
      .exactly('sapo')
      .anyCharacter.oneOf(['cururu', 'verde', 'preto'])
      .build();

    expect(regexer.succeed('sapo cururu')).toBe(true);
    expect(regexer.succeed('sapo verde')).toBe(true);
    expect(regexer.succeed('opa e ai sapo cururu')).toBe(true);
    expect(regexer.succeed('Hoje o sapo Cururu')).toBe(true);

    expect(regexer.succeed('opa e ai sapo branco')).toBe(false);
  });

  it('should work for repeated words with .repeat()', () => {
    const regexer = new Regexer({
      caseSensitive: false,
    })
      .repeat(3, (r) => r.exactly('sapo').anyCharacterOptional())
      .build();

    expect(regexer.succeed('sapo')).toBe(false);
    expect(regexer.succeed('sapo sapo')).toBe(false);
    expect(regexer.succeed('sapo sapo sapo')).toBe(true);
  });
});
