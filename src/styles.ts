import jss, { Styles } from 'jss';
import preset from 'jss-preset-default';

jss.setup(preset());

const styles: Styles = {
  ['@global']: {
    html: {
      padding: 0,
      margin: 0,
      fontSize: '16px',
      fontFamily: 'Arial, sans-serif',
      fontWeight: 100,
    },
    body: {
      extends: 'html',
    },
    '.root': {
      width: '80%',
      margin: 'auto',
    },
  },
  oopsie: {
    color: 'red',
  },
  historyItem: {
    width: '80%',
    margin: '0 auto',
    padding: '0.5em',
    whiteSpace: 'nowrap',
  },
  about: {
    height: 0,
    overflow: 'hidden',
    transition: 'height 0.5s ease',
  },
};
const Stylez = jss.createStyleSheet(styles).attach();
console.log({ Styles: Stylez.classes });
export default Stylez;
