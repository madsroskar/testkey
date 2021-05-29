import Stylez from './styles';
import { render } from '@itsjavi/jsx-runtime';
import { addStateEvents, createState, dispatch, Key, State } from './state';

const DEBUG = true;

const { classes } = Stylez;

const state: State = createState();

addStateEvents(state, (state: State) => {
  renderAll(state);
});

type JSXFunctionProps = { children?: unknown };
type KeyProps = { label: string } & JSXFunctionProps;

const Key = ({ label }: KeyProps): JSX.Element => (
  <div className={classes.key}>
    <span className="hi">{label}</span>
  </div>
);

const init = () => {
  window.onkeydown = (ev: KeyboardEvent): void => {
    dispatch(state)({
      action: 'add',
      key: ev.key,
    });
  };

  document.onkeydown = (ev: KeyboardEvent): void => {
    dispatch(state)({
      action: 'remove',
      key: ev.key,
    });
  };

  if (DEBUG) {
    state.push('a', 'b', 'c', 'd', 'e');
  }
};

const HistoryItem = (props: JSXFunctionProps) => <div className={classes.historyItem}>{props.children}</div>;
type KeyHistoryProps = { keys: State } & JSXFunctionProps;
const KeyHistory = ({ keys }: KeyHistoryProps): JSX.Element => {
  return (
    <>
      {keys.map((k) => (
        <HistoryItem>
          <Key label={k} />
        </HistoryItem>
      ))}
    </>
  );
};

const renderAll = (state: State) => {
  const historyContainer = document.getElementById('history');
  historyContainer.innerHTML = '';
  render(<KeyHistory keys={state} />, historyContainer);
};

(function () {
  init();
})();
