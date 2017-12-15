// Keyboard Language
// please update this section to match this language and email me with corrections!
// ru = ISO 639-1 code for Russian
// ***********************
jQuery.keyboard.language.ru = {
    language: '\u0420\u0443\u0441\u0441\u043a\u0438\u0439 (Russian)',
    display : {
        'a'      : '\u2714:Сохранить (Shift+Enter)', // check mark - same action as accept
        'accept' : 'Далее:Сохранить (Shift+Enter)',
        'alt'    : 'РУС:Русская клавиатура',
        'b'      : '\u2190:Удалить символ слева',    // Left arrow (same as &larr;)
        'bksp'   : '\u21e6 Стереть:Удалить символ слева',
        'c'      : '\u2716:Отменить (Esc)', // big X, close - same action as cancel
        'cancel' : 'Отменить:Отменить (Esc)',
        'clear'  : 'C:Очистить',             // clear num pad
        'combo'  : '\u00f6:Toggle Combo Keys',
        'dec'    : ',:Decimal',           // decimal point for num pad (optional), change '.' to ',' for European format
        'e'      : '\u21b5:Ввод',        // down, then left arrow - enter symbol
        'enter'  : 'Новая строка:Перевод строки',
        'lock'   : '\u21ea Lock:Caps Lock', // caps lock
        's'      : '\u21e7:Верхний регистр',        // thick hollow up arrow
        'shift'  : '\u21e7 Большие:Верхний регистр',
        'sign'   : '\u00b1:Сменить знак',  // +/- sign for num pad
        'space'  : 'Пробел:',
        't'      : '\u21e5:Tab',          // right arrow to bar (used since this virtual keyboard works with one directional tabs)
        'tab'    : '\u21e5 Tab:Tab'       // \u21b9 is the true tab symbol (left & right arrows)
    },
    // Message added to the key title while hovering, if the mousewheel plugin exists
    wheelMessage : 'Use mousewheel to see other keys',
};


$(function() {

    // $.keyboard.language.love = $.extend($.keyboard.language.ru);

    $('.js-keyboard').keyboard({
          usePreview: true,
          language: "ru",
          // layout: 'russian-qwerty'
          layout: 'custom',
          stickyShift: false,
          autoAccept: true,
          position : {
            // null (attach to input/textarea) or a jQuery object (attach elsewhere)
            of : null,
            my : 'center center',
            at : 'center top',
            // at2 is used when "usePreview" is false (centers keyboard at the bottom
            // of the input/textarea)
            at2: 'center bottom',
            collision: 'flipfit flipfit'
          },
          customLayout: {
            'normal' : [
                '. , ! " \u2116 ; \u20ac : ? * ( ) _ +',
                "\u0451 1 2 3 4 5 6 7 8 9 0 - № {bksp}",
                " \u0439 \u0446 \u0443 \u043a \u0435 \u043d \u0433 \u0448 \u0449 \u0437 \u0445 \u044a \\",
                "\u0444 \u044b \u0432 \u0430 \u043f \u0440 \u043e \u043b \u0434 \u0436 \u044d {enter}",
                "{shift} \u044f \u0447 \u0441 \u043c \u0438 \u0442 \u044c \u0431 \u044e . , {shift}",
                "{space}",
                "{accept}"
            ],
            'shift' : [
                '. , ! " \u2116 ; \u20ac : ? * ( ) _ +',
                "\u0401  1 2 3 4 5 6 7 8 9 0 - № {bksp}",
                " \u0419 \u0426 \u0423 \u041a \u0415 \u041d \u0413 \u0428 \u0429 \u0417 \u0425 \u042a /",
                "\u0424 \u042b \u0412 \u0410 \u041f \u0420 \u041e \u041b \u0414 \u0416 \u042d {enter}",
                "{shift} \u042f \u0427 \u0421 \u041c \u0418 \u0422 \u042c \u0411 \u042e . , {shift}",
                "{space}",
                "{accept}"
            ]
          }
        });
        // // activate the typing extension
        // .addTyping({
        //   showTyping: true,
        //   delay: 250
        // });

        $('.js-keyboard--number').keyboard({
              usePreview: true,
              language: "ru",
              // layout: 'russian-qwerty'
              layout: 'custom',
              stickyShift: false,
              autoAccept: true,
              position : {
                // null (attach to input/textarea) or a jQuery object (attach elsewhere)
                of : null,
                my : 'center top',
                at : 'center top',
                // at2 is used when "usePreview" is false (centers keyboard at the bottom
                // of the input/textarea)
                at2: 'center bottom',
                collision: 'flip'
              },
              customLayout: {
                'normal' : [
                    " 1 2 3 ",
                    " 4 5 6 ",
                    " 7 8 9 ",
                    "0 {bksp}",
                    "{accept}"
                ]
              }
            });

        $('.js-keyboard--short').keyboard({
              usePreview: true,
              language: "ru",
              // layout: 'russian-qwerty'
              layout: 'custom',
              stickyShift: false,
              autoAccept: true,
              position : {
                // null (attach to input/textarea) or a jQuery object (attach elsewhere)
                of : null,
                my : 'left top',
                at : 'left top',
                // at2 is used when "usePreview" is false (centers keyboard at the bottom
                // of the input/textarea)
                at2: 'left top',
                collision: 'flipfit flipfit'
              },
                customLayout: {
                  'normal' : [
                      " \u0439 \u0446 \u0443 \u043a \u0435 \u043d \u0433 \u0448 \u0449 \u0437 \u0445 \u044a {bksp}",
                      "\u0444 \u044b \u0432 \u0430 \u043f \u0440 \u043e \u043b \u0434 \u0436 \u044d {shift}",
                      "\u044f \u0447 \u0441 \u043c \u0438 \u0442 \u044c \u0431 \u044e ",
                      "{space}",
                      "{accept}"
                  ],
                  'shift' : [
                      " \u0419 \u0426 \u0423 \u041a \u0415 \u041d \u0413 \u0428 \u0429 \u0417 \u0425 \u042a {bksp}",
                      "\u0424 \u042b \u0412 \u0410 \u041f \u0420 \u041e \u041b \u0414 \u0416 \u042d {shift}",
                      "\u042f \u0427 \u0421 \u041c \u0418 \u0422 \u042c \u0411 \u042e",
                      "{space}",
                      "{accept}"
                  ]
                }
            });

    });