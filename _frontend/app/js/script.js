jQuery(window).ready(function($) {

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

});