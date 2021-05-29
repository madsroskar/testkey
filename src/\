export type Key = string;
export type Keys = Array<Key>;
export type State = Keys;
const addKey = (key: Key, state: State): State => {
  state.push(key);
  return state;
};
const removeKey = (key: Key, state: State): State => state.filter((k: Key) => k !== key);
const actions = {
  add: addKey,
  remove: removeKey,
} as const;
export type ActionType = keyof typeof actions;
export type Action = { key: Key; action: ActionType };

export const addStateEvents = (state: State, fn: (state: State) => unknown): void => {
  state.push = (...ks: Key[]): number => {
    const length = Array.prototype.push.call(state, ...ks);
    fn(state);
    return length;
  };
};


export const dispatch =
  (state: State) =>
    (action: Action): State =>
      actions[action.action](action.key, state);

export const createState = (): State => {
  return [];
};
