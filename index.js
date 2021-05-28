(function () {
    let currentlyPressedKeys = [];
    document.addEventListener('keydown', function (e) {
        if (!currentlyPressedKeys.find(function (key) {
            return key.key === e.key;
        })) {
            currentlyPressedKeys.push(e);
            addKeyToHistory(e.key);
        }
        render();
        if (e.key == ' ') {
            e.preventDefault();
            return 0;
        }
    });
    document.addEventListener('keyup', function (e) {
        currentlyPressedKeys = currentlyPressedKeys.filter(function (key) {
            return key.key !== e.key;
        });
        render();
    });
    window.addEventListener('blur', function () {
        currentlyPressedKeys = [];
        render();
    });
    function createKeyElement(key) {
        return '<div class="key-element"><div class="key">' + key + '</div>\n</div>\n';
    }
    function createHistoryElement(key) {
        return '<div class="history-item"><div class="key">' + key + '</div></div>';
    }
    function addKeyToHistory(key) {
        var historyElement = createHistoryElement(key);
        var historyContainer = document.getElementById('history');
        historyContainer.innerHTML = historyElement + historyContainer.innerHTML;
    }
    function render() {
        document.getElementById('current-pressed-keys').innerHTML = currentlyPressedKeys.map(createKeyElement).join('');
    }
    console.log('hello');
})();
