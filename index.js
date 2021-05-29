import JSX from './jsx'; // eslint-disable-line
import { addStateEvents } from './state';
(function () {
    let currentlyPressedKeys = [];
    document.addEventListener('keydown', function (e) {
        if (!currentlyPressedKeys.find(function (key) {
            return key === e.key;
        })) {
            currentlyPressedKeys.push(e.key);
            addKeyToHistory(e.key);
        }
        if (e.key == ' ') {
            e.preventDefault();
            return 0;
        }
    });
    document.addEventListener('keyup', function (e) {
        currentlyPressedKeys = currentlyPressedKeys.filter(function (key) {
            return key !== e.key;
        });
    });
    window.addEventListener('blur', function () {
        currentlyPressedKeys = [];
    });
    function createHistoryElement(key) {
        return '<div class="history-item"><div class="key">' + key + '</div></div>';
    }
    function addKeyToHistory(key) {
        const historyElement = createHistoryElement(key);
        const historyContainer = document.getElementById('history');
        historyContainer.innerHTML = historyElement + historyContainer.innerHTML;
    }
})();
const state = [];
const render = (state) => (document.getElementById('current-pressed-keys').innerHTML = JSX.createElement(CurrentlyPressedKeys, { keys: state }));
addStateEvents(state, render);
const addKey = (key, state) => state.push(key) > -1 && state;
const removeKey = (key, state) => state.filter((k) => k !== key);
const actions = {
    add: addKey,
    remove: removeKey,
};
const dispatch = (action) => actions[action.action](action.key, state);
const CurrentlyPressedKeys = ({ keys }) => (JSX.createElement(JSX.Fragment, null, keys.map((key) => (JSX.createElement(Key, { label: key })))));
const Key = ({ label }) => JSX.createElement("div", { class: "key" }, label);
document.onkeydown = (ev) => {
    dispatch({
        action: 'add',
        key: ev.key,
    });
};
document.onkeydown = (ev) => {
    dispatch({
        action: 'remove',
        key: ev.key,
    });
};
