let $$ = (id) => document.getElementById(id);

let $Console = {
    log: console.log,
    error: console.error,
    warn: console.warn
}

//region test
/* 
var _$_$ = {
    libs: {
        "rus": false,
        "ukr": true
    }
};

function _loadSettings() {
    try {
        var tmp = JSON.parse(localStorage.getItem('settings'));
    } catch (e) {
        tmp = null;
    }
    if (tmp) {
        _$_$ = tmp;
        _check(1);
        if (_$_$.libs.rus) _include("rus.mbm");
        if (_$_$.libs.ukr) _include("ukr.mbm");
    } else {
        localStorage.setItem('settings', JSON.stringify(_$_$));
    }
}

function _include(file) {
    var e = document.createElement("script");
    e.src = file;
    e.type = "text/javascript";
    document.head.appendChild(e);
    return true;
}

function _saveSettings() {
    _check(0);
    localStorage.setItem('settings', JSON.stringify(_$_$));
    document.getElementById('settings').style.display = 'none';
}

function _check(mode) {
    // var tmp = document.getElementById;
    if (!mode) { //read
        _$_$.libs.rus = document.getElementById('rus').checked;
        _$_$.libs.ukr = document.getElementById('ukr').checked;
    } else { //save
        document.getElementById('rus').checked = _$_$.libs.rus;
        document.getElementById('ukr').checked = _$_$.libs.ukr;
    }
}

function _init() {
    var html = document.getElementById('html');
    var body = document.body;
    var bg = document.getElementById('bg');
    var page = document.getElementById('page');
    var canvas;
    var code;
    html.height = body.height = bg.height = window.innerHeight;
    // var p = document.getElementById('p');

}


function _execute() {
    var code = editor.getValue();
    try {
        eval(code);
    } catch (e) {
        console.error(e);
    }
}

function _showSettings() {
    document.getElementById("settings").style.display = "block";
}

function _showHelp() {
    // document.getElementById("help").style.display = "block";
}
 */

//endregion test
const Interpreter = {
    settings: {
        libs: {
            "rus": false,
            "ukr": true
        },
    },
    init() {
        const html = $$('html');
        const body = document.body;
        const bg = $$('bg');
        // const page = $$('page');
        // const canvas;
        // const code;
        html.height = body.height = bg.height = window.innerHeight;
    },
    execute() {
        const code = editor.getValue();
        // try {
            eval(code);
        // } catch (e) {
            // console.error(e);
            // Interpreter.Console.error(e);
        // }
    },
    include() {
        let e = document.createElement("script");
        e.src = file;
        e.type = "text/javascript";
        document.head.appendChild(e);
    },
    Settings: {
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
                if (Interpreter.settings.libs.rus) _include("rus.mbm");
                if (Interpreter.settings.libs.ukr) _include("ukr.mbm");
            } else {
                localStorage.setItem('settings', JSON.stringify(Interpreter.settings));
            }
        },

        check(mode) {
            if (!mode) { //read
                Interpreter.settings.libs.rus = $$('rus').checked;
                Interpreter.settings.libs.ukr = $$('ukr').checked;
            } else { //save
                $$('rus').checked = Interpreter.settings.libs.rus;
                $$('ukr').checked = Interpreter.settings.libs.ukr;
            }
        },

        show() {
            $$("settings").style.display = "block";
        }
    },
    Help: {
        show() {
            $$("help").style.display = "block";
        }
    },
    Console: {
        show() {
            $$("sconsole").style.display = "block";
            Interpreter.Console.btn(!!0);
        },
        btn(mode){
            $$("consolebtn").setAttribute("active",mode?"true":"");
        },
        append(...text) {
            $$("console").innerHTML += `${text}<br/>`;
            return text;
        },

        log(...text) {
            if(/%c/.test(text[0])) Interpreter.Console.append(`<gray>${text[0].replace(/%c/g,"")}</gray>`);
            else
            Interpreter.Console.append(`<blue>${text}</blue>`);
            return text;
        },
        error(...text) {
            console.log(text);
            let msg;
            if (text[0] instanceof ErrorEvent) {
                let error = text[0];
                let emsg = error.message;
                for(const arr of $_Errors){
                    emsg = emsg.replace(new RegExp(arr[0],"g"), arr[1]);
                }
                msg = `<red>#${emsg}<br/>
                        &ensp;&ensp;Строка: ${error.lineno}<br/>
                        &ensp;&ensp;Символ: ${error.colno}</red>`;
            } else {
                msg = `Ошибка: <red>${text}</red>`;
            }
            Interpreter.Console.append(msg);
            Interpreter.Console.btn(!!1);
            return text;
        },
        warn(...text) {
            Interpreter.Console.append(`<yellow>${text}</yellow>`);
            return text;
        },
        debug(text){
            Interpreter.Console.append(`<gray>${text}</gray>`);
        }
    }
}


{
    console.log = Interpreter.Console.log;
    console.warn = Interpreter.Console.warn;
    // console.error = Interpreter.Console.error;
    window.debug = Interpreter.Console.debug;
}


window.onresize = function () {
    // _init();
    Interpreter.init();
}

// window.onerror = Interpreter.Console.error;

window.addEventListener("error", Interpreter.Console.error);