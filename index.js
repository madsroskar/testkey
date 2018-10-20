'use strict';
(function() {
	// https://tc39.github.io/ecma262/#sec-array.prototype.find
	if (!Array.prototype.find) {
		Object.defineProperty(Array.prototype, 'find', {
			value: function(predicate) {
				// 1. Let O be ? ToObject(this value).
				if (this == null) {
					throw new TypeError('"this" is null or not defined');
				}

				var o = Object(this);

				// 2. Let len be ? ToLength(? Get(O, "length")).
				var len = o.length >>> 0;

				// 3. If IsCallable(predicate) is false, throw a TypeError exception.
				if (typeof predicate !== 'function') {
					throw new TypeError('predicate must be a function');
				}

				// 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
				var thisArg = arguments[1];

				// 5. Let k be 0.
				var k = 0;

				// 6. Repeat, while k < len
				while (k < len) {
					// a. Let Pk be ! ToString(k).
					// b. Let kValue be ? Get(O, Pk).
					// c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
					// d. If testResult is true, return kValue.
					var kValue = o[k];
					if (predicate.call(thisArg, kValue, k, o)) {
						return kValue;
					}
					// e. Increase k by 1.
					k++;
				}

				// 7. Return undefined.
				return undefined;
			}
		});
	}

	var currentlyPressedKeys = [];

	document.addEventListener('keydown', function (e) {
		if (!currentlyPressedKeys.find(function (key) {
			return key.keyCode === e.keyCode;
		})) {
			currentlyPressedKeys.push(e);
			addKeyToHistory(e);
		}
		render();

		if(e.keyCode == 32 /* space */) {
			e.preventDefault();
			return 0;
		}
	});

	document.addEventListener('keyup', function (e) {
		currentlyPressedKeys = currentlyPressedKeys.filter(function (key) {
			return key.keyCode !== e.keyCode;
		});
		render();
	});

	window.addEventListener('blur', function() {
		currentlyPressedKeys = [];
		render();
	});

	function createKeyElement(key) {
		return '<div class="key-element"><div class="key">' + key.key + '</div><div class="code">Code <span class="right">' + key.code + '</span></div><div class="key-code">Key code: <span class="right">' + key.keyCode + '</span></div>\n</div>\n    ';
	};

	function createHistoryElement(key) {
		return '<div class="history-item"><div class="key">' + key.key + '</div><div class="code">' + key.code + '</div><div class="key-code">' + key.keyCode + '</div></div>';
	};

	function addKeyToHistory(key) {
		var historyElement = createHistoryElement(key);
		var historyContainer = document.getElementById('history');
		historyContainer.innerHTML = historyElement + historyContainer.innerHTML;
	};

	function render() {
		document.getElementById('current-pressed-keys').innerHTML
			= currentlyPressedKeys.map(createKeyElement).join('');
	};

	
})();
