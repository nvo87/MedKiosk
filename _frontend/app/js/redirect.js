jQuery(document).ready(function($) {
  if (window.location.pathname != "/") {
    RedirectModule.init();
  }
});


var RedirectModule = (function () {
    var c = 0;
    var cMax = 60; // макс. время неактивности, в сек.
    var t;
    var timer_is_on=0;

    function _init() {
        doTimer();
        _setUpListeners();
    }

    function _setUpListeners() {
      $(document).mousemove(function(){
        resetCount();
      });

      $(document).mousedown(function(){
        resetCount();
      });
    }

    function timedCount(){
        if (c>cMax) {
             setTimeout(function(){
                 window.location.href="/";                     
             }, 200);
        }else{
            c=c+1;
            t=setTimeout(timedCount,1000);
        }
    }

    function doTimer() {
        if (!timer_is_on) {
           timer_is_on=1;
            timedCount();
        }
    }

    function stopCount(){
        clearTimeout(t);
        timer_is_on=0;
    }
    function resetCount (){
        clearTimeout(t);
        timer_is_on=0;
        c=0;
        doTimer();
    } 

    return {
        init: _init
    }

}());