var inactivityModule = (function () {
    
    var timeOut;
    var inactivityTime = 1000 * 60 * 2 // последняя цифра - минуты

    function _init() {
        if (window.location.pathname !== "/"){
            _setUpListeners();
        }
    }

    function _setUpListeners() {
        $(window).on('load', startTimer);
        $(window).on('mousedown', reset);
        $(window).on('keypress', reset);
        $(window).on('scroll', reset);
    }

    function reset() {
        window.clearTimeout(timeOut);
        timeOut = window.setTimeout( "redir()" , inactivityTime );
    }

    function redir() {
        window.location = "/";
    }

    function startTimer(){
        setTimeout(redir , inactivityTime );
    }

    return {
        init: _init
    }

}());

inactivityModule.init();