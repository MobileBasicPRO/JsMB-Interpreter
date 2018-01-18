// Copyright (c) 2017 - 2018 PROPHESSOR
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use strict';

const $$ = id => document.getElementById(id);

const $Console = {
    'log': console.log,
    'error': console.error,
    'warn': console.warn
};

// endregion test
const Interpreter = {
    'settings': {
        'libs': {
            'rus': false,
            'ukr': false
        }
    },
    init() {
        const html = $$('html');
        const {body} = document;
        const bg = $$('bg');

        html.height = body.height = bg.height = window.innerHeight;
    },
    execute() {
        const code = editor.getValue();

        eval(code);
    },
    include(file) {
        const e = document.createElement('script');

        e.src = file;
        e.type = 'text/javascript';
        document.head.appendChild(e);
    },
    'Settings': {
        save() {
            this.check(false);
            localStorage.setItem('settings', JSON.stringify(Interpreter.settings));
            $$('settings').style.display = 'none';
        },
        load() {
            let tmp = null;

            try {
                tmp = JSON.parse(localStorage.getItem('settings'));
            } catch (e) {}
            if (tmp) {
                Interpreter.settings = tmp;
                this.check(true);
                if (Interpreter.settings.libs.rus) Interpreter.include('rus.mbm');
                if (Interpreter.settings.libs.ukr) Interpreter.include('ukr.mbm');
            } else {
                localStorage.setItem('settings', JSON.stringify(Interpreter.settings));
            }
        },

        check(mode) {
            if (mode) { // save
                $$('rus').checked = Interpreter.settings.libs.rus;
                $$('ukr').checked = Interpreter.settings.libs.ukr;
            } else { // read
                Interpreter.settings.libs.rus = $$('rus').checked;
                Interpreter.settings.libs.ukr = $$('ukr').checked;
            }
        },

        show() {
            Fader.fadeIn('settings');
        }
    },
    'Help': {
        show() {
            Fader.fadeIn('help');
        }
    },
    'Console': {
        show() {
            Fader.fadeIn('sconsole');
            Interpreter.Console.btn();
        },
        btn(mode) {
            $$('consolebtn').setAttribute('active', mode || '');
        },
        append(...text) {
            $$('console').innerHTML += `${text}<br/>`;
            return text;
        },

        log(...text) {
            if (/%c/.test(text[0])) Interpreter.Console.append(`<gray>${text[0].replace(/%c/g, '')}</gray>`);
            else
                Interpreter.Console.append(`<lblue>${text}</lblue>`);
            $Console.log(text);
            return text;
        },
        error(...text) {
            console.log(text);
            let msg;

            if (text[0] instanceof ErrorEvent) {
                const [error] = text;
                let emsg = error.message;

                for (const arr of $_Errors) {
                    emsg = emsg.replace(new RegExp(arr[0], 'g'), arr[1]);
                }
                msg = `<red>#${emsg}<br/>
                        &ensp;&ensp;Строка: ${error.lineno}<br/>
                        &ensp;&ensp;Символ: ${error.colno}</red>`;
            } else {
                msg = `Ошибка: <red>${text}</red>`;
            }
            Interpreter.Console.append(msg);
            Interpreter.Console.btn('error');
            $Console.error(text);
            return text;
        },
        warn(...text) {
            Interpreter.Console.append(`<yellow>${text}</yellow>`);
            $Console.warn(text);
            return text;
        },
        debug(text) {
            Interpreter.Console.append(`<gray>${text}</gray>`);
            $Console.log(text);
        }
    }
};


{
    console.log = Interpreter.Console.log;
    console.warn = Interpreter.Console.warn;
    window.debug = Interpreter.Console.debug;
}


window.onresize = function () {
    Interpreter.init();
};

window.addEventListener('error', Interpreter.Console.error);

const Fader = {
    '_fade': {
        'fade_in_from': 0,
        'fade_out_from': 10,
        'step_in': 10,
        'step_out': 25
    },
    '_timer': 0,
    fadeOut(element) {
        const target = $$(element);

        if (getComputedStyle(target, '').opacity == 0) return;
        const newSetting = this._fade.fade_out_from / 10;

        target.style.opacity = newSetting;
        this._fade.fade_out_from--;

        if (this._fade.fade_out_from == 0) {
            target.style.opacity = 0;
            target.style.display = 'none';

            clearTimeout(this._timer);

            this._fade.fade_out_from = 10;
            return false;
        }

        this._timer = setTimeout(() => this.fadeOut(element), this._fade.step_out);
    },

    fadeIn(element) {
        const target = $$(element);

        if (getComputedStyle(target, '').opacity == 1 && getComputedStyle(target, '').display != 'none') return;
        target.style.display = 'block';
        const newSetting = this._fade.fade_in_from / 10;

        target.style.opacity = newSetting;
        this._fade.fade_in_from++;

        if (this._fade.fade_in_from == 10) {
            target.style.opacity = 1;

            clearTimeout(this._timer);

            this._fade.fade_in_from = 0;
            return false;
        }

        this._timer = setTimeout(() => this.fadeIn(element), this._fade.step_in);
    }
};

// JsMB patch
window.println = function (text) {
    if (typeof text === 'function') text = '[Function]';
    log(text);
    Interpreter.Console.log(text);
    Interpreter.Console.btn('log');
};