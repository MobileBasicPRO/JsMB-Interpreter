var _$_$ = {
    libs:{
        "rus":false,
        "ukr":true
    }
};

function _loadSettings(){
    try{
        var tmp = JSON.parse(localStorage.getItem('settings'));
    }catch(e){
        tmp = null;
    }
    if(tmp){
        _$_$ = tmp;
        _check(1);
        if(_$_$.libs.rus) _include("rus.mbm");
        if(_$_$.libs.ukr) _include("ukr.mbm");
    }else{
        localStorage.setItem('settings',JSON.stringify(_$_$));
    }
}

function _include(file) {
    var e = document.createElement("script");
    e.src = file;
    e.type = "text/javascript";
    document.head.appendChild(e);
    return true;
}

function _saveSettings(){
    _check(0);
    localStorage.setItem('settings',JSON.stringify(_$_$));
    document.getElementById('settings').style.display='none';
}

function _check(mode){
    // var tmp = document.getElementById;
    if(!mode){//read
        _$_$.libs.rus = document.getElementById('rus').checked;
        _$_$.libs.ukr = document.getElementById('ukr').checked;
    }else{//save
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
window.onresize = function () {
    _init();
}

function _execute() {
    var code = editor.getValue();
    try {
        eval(code);
    }catch(e){
        console.error(e);
    }
}

function _showSettings(){
    document.getElementById("settings").style.display = "block";
}

function _showHelp(){
    // document.getElementById("help").style.display = "block";
}

const Interpreter = {
    libs:{
        "rus":false,
        "ukr":true
    },
    init(){},
    execute(){},
    include(){
        let e = document.createElement("script");
        e.src = file;
        e.type = "text/javascript";
        document.head.appendChild(e);
    },
    Settings:{
        save(){},
        load(){},

        check(){},

        show(){}
    },
    Help:{
        show(){}
    }
}