jQuery(document).ready(function($) {
    var $blindBtn = $('#blindBtn');
    var blindCookieName = 'blindMode';
    var blindFlag = false;
    var blindClass = 'blind-mode';

    var $listBtn = $('.list-btn');
    var $rightBtn = $('.right-btn');
    var $leftBtn = $('.left-btn');

    if (
      window.location.pathname === '/about/' ||
      window.location.pathname === '/map/' ||
      window.location.pathname === '/reviews/' 
      ) {
        $listBtn.addClass('js-hidden');
        $rightBtn.addClass('js-hidden');
    }

    $rightBtn.on('click', function(event) {
      event.preventDefault();
  
      var urlsAbout = [
        '/about/reference_hospital/',
        '/about/maternity_hospital/',
        '/about/women/',
        '/about/schedule/',
        '/about/reference_kdc/',
        '/about/reference_pay/',
        '/about/reception/',
        '/about/rules/',
        '/about/rules/patients-rules/',
        '/about/rules/ban/',
        '/about/rules/product-allow/',
        '/about/rules/product-disallow/'
      ];
      var urlsMap = [
        '/map/main-building/',
        '/map/therap-building/',
      ];

      for (var i=0; i < urlsAbout.length; i++) {
        if (window.location.pathname === urlsAbout[i]) {
          if (i === (urlsAbout.length-1)){
            var pathname = urlsAbout[0];
          } else {
            var pathname = urlsAbout[i+1];
          }
          var domen = window.location.host;
          url = 'http://' + domen + pathname;
          window.location.replace(url);
        }
      }
      for (var i=0; i < urlsMap.length; i++) {
        if (window.location.pathname === urlsMap[i]) {
          if (i === (urlsMap.length-1)){
            var pathname = urlsMap[0];
          } else {
            var pathname = urlsMap[i+1];
          }
          var domen = window.location.host;
          var url = 'http://' + domen + pathname;
          window.location.replace(url);
        }
      }
    });

    $listBtn.on('click', function(event) {
      event.preventDefault();
      
      var path = window.location.pathname;
      var pages = path.split('/');
      var firstLevelUrl = pages[1];
      var domen = window.location.host;
      var url = 'http://' + domen + '/' + firstLevelUrl;
      window.location.replace(url);
    });

    if (getCookie(blindCookieName)) {
        $('html').addClass(blindClass); 
        blindFlag = true;
    } else {
        blindFlag = false;
    }

    $blindBtn.on('click', function(event) {
        event.preventDefault();
    
        $('html').toggleClass(blindClass); 
        if (!blindFlag) {
            setCookie(blindCookieName, 'true', {path:'/'});
            blindFlag = true;
        } else {
            blindFlag = false;
            deleteCookie(blindCookieName);
        }
    }); 

    $leftBtn.on('click', function(event) {
      event.preventDefault();
      
      window.history.back();
    });

});


// возвращает cookie с именем name, если есть, если нет, то undefined
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
  options = options || {};
  console.log(options);

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
    console.log(updatedCookie);
  }

  document.cookie = updatedCookie;
}

function deleteCookie(name) {
  setCookie(name, "", {
    expires: -1
  })
}