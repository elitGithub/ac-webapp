export const convert = (text: string) => {
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line)
    .map((line) => (line.slice(0, 1) === '$' ? `// TODO: ${line}` : line))
    .map((line) => (line.slice(0, 4) === 'show' ? `// TODO ${line}` : line))
    .reduce<string[]>((lines, line) => {
      const [, controls, content] = line.match(/(.*)\"(.*)\"/) ?? [];

      if (controls) {
        const [character, expression, modifier] = controls.split(' ');

        if (character === 'mc')
          return [...lines, `yield text('${content}', '${character}')`];

        return [
          ...lines,
          `yield show('${character}', '${expression}')`,
          `// TODO: ${modifier}`,
          `yield text('${content}', '${character}')`,
        ];
      }

      if (content) {
        return [...lines, `yield text('${content}')`];
      }

      return [...lines, line];
    }, []);
  console.log(lines.join('\n'));
};
