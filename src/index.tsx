import Stylez from './styles';
import { render } from '@itsjavi/jsx-runtime';
import { addStateEvents, createState, dispatch, Key, Keys, State } from './state';

const DEBUG = true;

const { classes } = Stylez;
const state: State = createState();

addStateEvents(state, (state: State) => {
  console.log('s', state);
  renderAll(state);
});

type JSXFunctionProps = { children?: unknown };

type KeyProps = { label: string } & JSXFunctionProps;
const Key = ({ label }: KeyProps): JSX.Element => (
  <div className={classes.key}>
    <span className="hi">{label}</span>
  </div>
);

type AboutProps = { open: boolean } & JSXFunctionProps;
const About = ({ open }: AboutProps): JSX.Element => (
  <>
    <div className={`${classes.about} ${open ? 'visible' : ''}`}>
      <h1>Testkey.online</h1>
      <p>
        Testkey.online is a very simple application made to see which keys are currently being pressed on the keyboard
        of the user
      </p>
      <p>
        The reason this site exists is that I had rebound a key on my keyboard, and wanted to make sure it was working
        properly, and the easiest way I could think of was to type an URL, and just hit the key.
      </p>
      <p>
        The other sites like this one I could find were either on urls I couldn't easily remember, or they didn't work
        properly with my nordic keyboard, so I decided to make this one.
      </p>
      <p>
        This site isn't pretty, and there are probably issues I haven't noticed, or features that could be implemented
        to make it more useful. If you can think of anyone, feel free to create an issue on
        <a href="https://github.com/madsroskar/testkey" target="_blank">
          Github
        </a>
        , or just fork it and submit a pull request. It's all plain javascript, and CSS. :)
      </p>
    </div>
    <ToggleAbout isOpen={open} />
  </>
);

type ToggleAboutProps = { isOpen: boolean } & JSXFunctionProps;
const ToggleAbout = ({ isOpen }: ToggleAboutProps): JSX.Element => (
  <a id="toggle-about" href={dispatch(state)({ action: 'toggleAboutOpen', value: !isOpen })}>
    What is this?
  </a>
);

const HistoryItem = (props: JSXFunctionProps) => <div className={classes.historyItem}>{props.children}</div>;
type KeyHistoryProps = { keys: Keys } & JSXFunctionProps;
const KeyHistory = ({ keys }: KeyHistoryProps): JSX.Element => {
  console.log({ keys });
  return (
    <>
      {keys.map((k: Key) => (
        <HistoryItem>
          <Key label={k} />
        </HistoryItem>
      ))}
    </>
  );
};

const init = () => {
  window.onkeydown = (ev: KeyboardEvent): void => {
    console.log('keydown');
    dispatch(state)({
      action: 'add',
      value: ev.key,
    });
  };

  document.onkeydown = (ev: KeyboardEvent): void => {
    dispatch(state)({
      action: 'remove',
      value: ev.key,
    });
  };
  renderAll(state);
};

// Todo: clean this up. HOC? Currying?
const renderAll = (state: State) => {
  renderHistory(state);
  // renderAbout(state);
};

const renderHistory = (state: State) => {
  console.log({ state });
  const historyContainer = document.getElementById('history');
  const c = render(<KeyHistory keys={state.keys} />, historyContainer);
  console.log({ c });
};

const renderAbout = (state: State) => {
  const aboutContainer = document.getElementById('about');
  aboutContainer.innerHTML = '';
  const c = render(<About open={state.aboutOpen && false} />, aboutContainer);
  console.log({ c });
};

(function () {
  init();
})();
