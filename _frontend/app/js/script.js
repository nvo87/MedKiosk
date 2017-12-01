jQuery(window).ready(function($) {
    (function () { 
        /* скроллинг экрана с помощью зажатой кнопки мыши */

        var scrollContainer = mainContent || window; // или window. Тогда в методе drag использовать не scrollLeft, scrollTop, а scrollX, scrollY
        var dragHandler = {
            lastClientY: 0,
            start: function (e) {
                if (e.button == 0) {
                    window.addEventListener('mousemove', dragHandler.drag);
                    dragHandler.lastClientY = e.clientY;
                    // e.preventDefault();
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
            // $(nextQuestionBtn).on('click', _showNextScreen);
            ratingRadioBtn.on('click', _changeSubmitBtnText);
        }

        function _changeSubmitBtnText() {
            var markNumber = ratingRadioBtn.index(this)+1;
            console.log($(this));
            submitBtn = $(this).closest(questionWrapClass).find(nextQuestionBtnClass);
            ratingMark = submitBtn.children(textOnNextQuestBtn).text(markNumber);
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


    // таблица этажей
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



    

});