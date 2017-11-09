jQuery(window).ready(function($) {

    (function () { 
        /* скроллинг экрана с помощью зажатой кнопки мыши */

        var scrollContainer = mainContent // или window. Тогда в методе drag использовать не scrollLeft, scrollTop, а scrollX, scrollY
        var dragHandler = {
            lastClientY: 0,
            start: function (e) {
                if (e.button == 0) {
                    window.addEventListener('mousemove', dragHandler.drag);
                    dragHandler.lastClientY = e.clientY;
                    console.log(dragHandler.lastClientY);
                    e.preventDefault();
                }
            },
            end: function (e) {
                if (e.button == 0) {
                    window.removeEventListener('mousemove', dragHandler.drag);
                }
            },
            drag: function (e) {
                var delta = e.clientY - dragHandler.lastClientY;
                scrollContainer.scrollTo(scrollContainer.scrollLeft, scrollContainer.scrollTop - delta);
                dragHandler.lastClientY = e.clientY;
                e.preventDefault();
            }
        };
        document.body.addEventListener('mousedown', dragHandler.start);
        document.body.addEventListener('mouseup', dragHandler.end);


    }());

    var QuestionFormCarousel = (function () {

        /* 
            Данный модуль делит форму-анкету на несколько экранов. Каждый экран - это один вопрос. Последний экран - сбор контактов и общего отзыва. 
            В каждом блоке с вопросом есть кнопка для подтверждения ответа на текущий вопрос и переход к следующему вопросу. Кнопка на последнем экране - это сабмит всей формы.
            Помимо этого сюда встроена валидация полей и вызов экранной клавиаутры.
        */
        
        var
            pollForm = $('#pollForm');
            questionWrapClass = '.question__inner';   // обертка для одного вопроса
            questionScreens = pollForm.find(questionWrapClass);  // все обертки вопросов (экраны с вопросами)
            nextQuestionBtnClass = '.js-nextQuestBtn';
            textOnNextQuestBtn = '.rating-mark'
            nextQuestionBtn = pollForm.find(nextQuestionBtnClass);
            ratingRadioBtn = pollForm.find('.rating__radio');
            displayNoneClass = 'hidden';
            fadeTime = 400;
            currentQuestionScreen = 0;

        function _init() {
            _setUpListeners();
            currentQuestionScreen = 0;
        }

        function _setUpListeners() {
            $(nextQuestionBtn).on('click', _showNextScreen);
            ratingRadioBtn.on('click', _changeSubmitBtnText);
        }

        function _changeSubmitBtnText() {
            var mark = $(this).val();
            submitBtn = $(this).closest(questionWrapClass).find(nextQuestionBtnClass);
            ratingMark = submitBtn.children(textOnNextQuestBtn).text(mark);
        }
        function _showNextScreen(e) {
            e.preventDefault();
            $(questionScreens[currentQuestionScreen]).fadeOut(fadeTime, function() {
                $(questionScreens[currentQuestionScreen+1]).fadeIn(fadeTime/1.5);
                currentQuestionScreen++;
            });
        }

        return {
            init: _init
        }

    }());
    QuestionFormCarousel.init();


    var FloorTableAccordionModule = (function () {       
        var
            $colItem = $('.floor-table__link');

        function _init() {
            _setUpListeners();
        }

        function _setUpListeners() {
            $colItem.on('click', _toggleContent);
        }

        function _toggleContent(e){
            e.preventDefault();
            
            $this = $(this);

            $table = $this.closest('.floor-table__table');
            $colItems = $table.find('.floor-table__link');
            $colItems.removeClass('js-content-visible');
            $this.addClass('js-content-visible');
        }


        return {
            init: _init
        }

    }());
    FloorTableAccordionModule.init();



    $(function() {

    // $.keyboard.language.love = $.extend($.keyboard.language.ru);

    $('.js-keyboard').keyboard({
          usePreview: true,
          language: "ru",
          // layout: 'russian-qwerty'
          layout: 'custom',
          stickyShift: false,
          autoAccept: true,
          customLayout: {
            'normal' : [
                "\u0451 1 2 3 4 5 6 7 8 9 0 - № {bksp}",
                " \u0439 \u0446 \u0443 \u043a \u0435 \u043d \u0433 \u0448 \u0449 \u0437 \u0445 \u044a \\",
                "\u0444 \u044b \u0432 \u0430 \u043f \u0440 \u043e \u043b \u0434 \u0436 \u044d {enter}",
                "{shift} \u044f \u0447 \u0441 \u043c \u0438 \u0442 \u044c \u0431 \u044e . {shift}",
                "{accept} {space} {cancel}"
            ],
            'shift' : [
                '\u0401 ! " \u2116 ; \u20ac : ? * ( ) _ + {bksp}',
                " \u0419 \u0426 \u0423 \u041a \u0415 \u041d \u0413 \u0428 \u0429 \u0417 \u0425 \u042a /",
                "\u0424 \u042b \u0412 \u0410 \u041f \u0420 \u041e \u041b \u0414 \u0416 \u042d {enter}",
                "{shift} \u042f \u0427 \u0421 \u041c \u0418 \u0422 \u042c \u0411 \u042e , {shift}",
                "{accept} {space} {cancel}"
            ]
          }
        });
        // // activate the typing extension
        // .addTyping({
        //   showTyping: true,
        //   delay: 250
        // });

    });

});