export const JSX = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  createElement(name: string, props: { [id: string]: string }, ...children: string[]) {
    props = props || {};
    const propsstr = Object.keys(props)
      .map((key) => {
        const value = props[key];
        if (key === 'className') return `class=${value}`;
        else return `${key}=${value}`;
      })
      .join(' ');
    const fnRegex = /(createElement\(.+\))/i;
    console.log({ c: children.join('').match(fnRegex), s: children.join('') });
    return `<${name} ${propsstr}> ${children.join('')}</${name}>`;
  },
};

export default JSX;
