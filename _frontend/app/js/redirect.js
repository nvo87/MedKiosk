/* Данный вариант алгоритма позаимствован у http://usrbb.ru/ */

var c=0;
           var t;
           var timer_is_on=0;

           function timedCount(){
               
               
               if (c>60) {
            //     makemeoffline();
                    setTimeout(function(){
                        window.location.href="/";                     
                    }, 200);
               }else{
                   c=c+1;
                    t=setTimeout("timedCount()",1000);
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
