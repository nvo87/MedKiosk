var QuestionsModule = (function () {
    // JSON-данные полученные через АЯКС с сервера при загрузке приложения. Сами переменные будут заполнены при инициализации модуля в функции _init().
    var QUESTIONS = [];
    // привязка к элементам верстки блока с вопросами
    var $questionsModuleBlock = $('#QuestionsModuleBlock');
    var $questionLink = $('.question-link'); // кнопки с вопросом
    var activeClass = 'active'; // название класса для подсветки активной кнопки
    var currentQuestionId = 0; // id вопроса по которому на данный момент показаны данные
    var FADEIN_TIME;

    function _init(questionsJSON, SETTINGS) {
        QUESTIONS = questionsJSON;
        FADEIN_TIME = SETTINGS.FADEIN_TIME; 

        _showQuestionsModuleBlock();
        _setUpListeners();
    }

    function _setUpListeners() {
        $questionLink.on('click', _showQuestionData);
    }

    function _toggleActiveClass($el) {
        $el.addClass(activeClass).parent().siblings().children().removeClass(activeClass);
    }

    function _getCurrentQuestionId(){
        return currentQuestionId;
    }

    function _showQuestionData(e) {
        e.preventDefault();
        var $this = $(this);
        var questionId = $this.data('id');
        var answersToQuestion = [];
        var ratings = {};
        var dataRange=[];

        _toggleActiveClass($this);
        currentQuestionId = questionId;

        AnswersModule.showAnswersModule();
        ChartModule.showChartModule();

        // Отсеиваем ответы для выбранного вопроса и разбиваем оценки в ответах на диапазоны.
        answersToQuestion = AnswersModule.filterAnswersByQuestionId(questionId);
        ratings = AnswersModule.sortRatingsByRanges(answersToQuestion);

        // Строим график - количество оценок для каждого диапазона
        dataRange = [
            ratings.low.length, 
            ratings.mid.length,
            ratings.high.length
        ];
        ChartModule.setDataSet(dataRange);
        ChartModule.update();

        // Рендерим список людей давших ответы
        AnswersModule.showAnswersData(answersToQuestion);


    }

    function _showQuestionsModuleBlock(){
        $questionsModuleBlock.fadeIn(FADEIN_TIME);
    }

    return {
        init: _init,
        getCurrentQuestionId: _getCurrentQuestionId
    }

}());
