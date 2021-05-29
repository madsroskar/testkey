export const addStateEvents = (state, fn) => {
    state.push = (k) => {
        const length = Array.prototype.push.call(state, k);
        fn(state);
        return length;
    };
};
