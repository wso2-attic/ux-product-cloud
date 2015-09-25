/* global CodeMirror */
/* global define */

(function(mod) {
    'use strict';

    if (typeof exports === 'object' && typeof module === 'object') // CommonJS
        mod(require('../../lib/codemirror'));
    else if (typeof define === 'function' && define.amd) // AMD
        define(['../../lib/codemirror'], mod);
    else
        mod(CodeMirror);
})(function(CodeMirror) {
    'use strict';

    var SearchOnly;

    CodeMirror.defineOption('searchonly', false, function(cm) {
        if (!SearchOnly){
            SearchOnly  = new SearchOnlyBox(cm);
        }
    });


    function SearchOnlyBox(cm) {

        var self = this;
        var el = self.element = document;

        init();

        function initElements(el) {
            self.searchBox              = el.querySelector('.div-search');
            self.searchInput            = el.querySelector('.log-search');
        }

        function init() {
            initElements(el);
            bindKeys();

            self.$onChange = delayedCall(function() {
                self.find(false, false);
            });

            el.addEventListener('click', function(e) {
                var t = e.target || e.srcElement;
                var action = t.getAttribute('action');
                if (action && self[action])
                    self[action]();

                e.stopPropagation();
            });

            self.searchInput.addEventListener('input', function() {
                self.$onChange.schedule(20);
            });

            self.searchInput.addEventListener('focus', function() {
                self.activeInput = self.searchInput;
            });

            self.$onChange = delayedCall(function() {
                self.find(false, false);
            });
        }

        function bindKeys() {
            var sb  = self,
                obj = {
                    'Enter': function() {
                        sb.findNext();
                    }
                };

            self.element.addEventListener('keydown', function(event) {
                Object.keys(obj).some(function(name) {
                    var is = key(name, event);

                    if (is) {
                        event.stopPropagation();
                        event.preventDefault();
                        obj[name](event);
                    }

                    return is;
                });
            });
        }

        this.find = function(skipCurrent, backwards) {
            var value   = this.searchInput.value,
                options = {
                    skipCurrent: skipCurrent,
                    backwards: backwards
                };

            find(value, options, function(searchCursor) {
                var current = searchCursor.matches(false, searchCursor.from());
                cm.setSelection(current.from, current.to);
            });
        };

        this.findNext = function() {
            this.find(true, false);
        };

        this.findPrev = function() {
            this.find(true, true);
        };

        function find(value, options, callback) {
            var done,
                noMatch, searchCursor, next, prev, matches, cursor,
                position,
                val             = value,
                o               = options,
                is              = true,
                caseSensitive   = o.caseSensitive,
                regExp          = o.regExp,
                wholeWord       = o.wholeWord;

            if (regExp || wholeWord) {
                if (options.wholeWord)
                    val   = '\\b' + val + '\\b';

                val   = RegExp(val);
            }

            if (o.backwards)
                position = o.skipCurrent ? 'from': 'to';
            else
                position = o.skipCurrent ? 'to' : 'from';

            cursor          = cm.getCursor(position);
            searchCursor    = cm.getSearchCursor(val, cursor, !caseSensitive);

            next            = searchCursor.findNext.bind(searchCursor),
                prev            = searchCursor.findPrevious.bind(searchCursor),
                matches         = searchCursor.matches.bind(searchCursor);

            if (o.backwards && !prev()) {
                is = next();

                if (is) {
                    cm.setCursor(cm.doc.size - 1, 0);
                    find(value, options, callback);
                    done = true;
                }
            } else if (!o.backwards && !next()) {
                is = prev();

                if (is) {
                    cm.setCursor(0, 0);
                    find(value, options, callback);
                    done = true;
                }
            }

            noMatch             = !is && self.searchInput.value;
            setCssClass(self.searchInput, 'no_result_found', noMatch);

            if (!done && is)
                callback(searchCursor);
        }



        function setCssClass(el, className, condition) {
            var list = el.classList;

            list[condition ? 'add' : 'remove'](className);
        }

        function delayedCall(fcn, defaultTimeout) {
            var timer,
                callback = function() {
                    timer = null;
                    fcn();
                },

                _self = function(timeout) {
                    if (!timer)
                        timer = setTimeout(callback, timeout || defaultTimeout);
                };

            _self.delay = function(timeout) {
                timer && clearTimeout(timer);
                timer = setTimeout(callback, timeout || defaultTimeout);
            };
            _self.schedule = _self;

            _self.call = function() {
                this.cancel();
                fcn();
            };

            _self.cancel = function() {
                timer && clearTimeout(timer);
                timer = null;
            };

            _self.isPending = function() {
                return timer;
            };

            return _self;
        }

        /* https://github.com/coderaiser/key */
        function key(str, event) {
            var right,
                KEY = {
                    BACKSPACE   : 8,
                    TAB         : 9,
                    ENTER       : 13,
                    ESC         : 27,

                    SPACE       : 32,
                    PAGE_UP     : 33,
                    PAGE_DOWN   : 34,
                    END         : 35,
                    HOME        : 36,
                    UP          : 38,
                    DOWN        : 40,

                    INSERT      : 45,
                    DELETE      : 46,

                    INSERT_MAC  : 96,

                    ASTERISK    : 106,
                    PLUS        : 107,
                    MINUS       : 109,

                    F1          : 112,
                    F2          : 113,
                    F3          : 114,
                    F4          : 115,
                    F5          : 116,
                    F6          : 117,
                    F7          : 118,
                    F8          : 119,
                    F9          : 120,
                    F10         : 121,

                    SLASH       : 191,
                    TRA         : 192, /* Typewritten Reverse Apostrophe (`) */
                    BACKSLASH   : 220
                };

            keyCheck(str, event);

            right = str.split('|').some(function(combination) {
                var wrong;

                wrong = combination.split('-').some(function(key) {
                    var right;

                    switch(key) {
                        case 'Ctrl':
                            right = event.ctrlKey;
                            break;

                        case 'Shift':
                            right = event.shiftKey;
                            break;

                        case 'Alt':
                            right = event.altKey;
                            break;

                        case 'Cmd':
                            right = event.metaKey;
                            break;

                        default:
                            if (key.length === 1)
                                right = event.keyCode === key.charCodeAt(0);
                            else
                                Object.keys(KEY).some(function(name) {
                                    var up = key.toUpperCase();

                                    if (up === name)
                                        right = event.keyCode === KEY[name];
                                });
                            break;
                    }

                    return !right;
                });

                return !wrong;
            });

            return right;
        }

        function keyCheck(str, event) {
            if (typeof str !== 'string')
                throw(Error('str should be string!'));

            if (typeof event !== 'object')
                throw(Error('event should be object!'));
        }

    }
});
