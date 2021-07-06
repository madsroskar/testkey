export type Key = string;
export type Keys = Array<Key>;
export type State = { keys: Keys; aboutOpen: boolean };

const addKey = (value: Key, state: State): State => {
  console.log('addkey called', value, state);
  return { ...state, keys: [...state.keys, value] };
};
const removeKey = (value: Key, state: State): State => ({ ...state, keys: state.keys.filter((k: Key) => k !== value) });
const toggleAboutOpen = (value: boolean, state: State) => ({ ...state, aboutOpen: value });
const actions: { [key: string]: (value: Key | boolean, state: State) => State } = {
  add: addKey,
  remove: removeKey,
  toggleAboutOpen,
};
export type ActionType = keyof typeof actions;
export type Action = { value: Key | boolean; action: ActionType };

export const addStateEvents = (state: State, fn: (state: State) => unknown): void => {
  state.keys.push = (...ks: Key[]): number => {
    const length = Array.prototype.push.call(state, ...ks);
    fn(state);
    return length;
  };
};

export const dispatch =
  (state: State) =>
  // eslint-disable-next-line indent
  (action: Action): State =>
    // eslint-disable-next-line indent
    actions[action.action](action.value as Key | boolean | string, state);

export const createState = (overrides?: Partial<State>): State => {
  const initialProps: State = { keys: [], aboutOpen: false };
  return { ...initialProps, ...overrides };
};
