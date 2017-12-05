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

    function _getCurrentQuestionText(){
        for (item in QUESTIONS) {
            if (QUESTIONS[item]['id'] === currentQuestionId) {
                return QUESTIONS[item]['text'];
            }
        }
    }

    function _showQuestionData(e) {
        e.preventDefault();
        var $this = $(this);
        var questionId = $this.data('id');
        var answers = [];
        var options = [];
        var answersGroupedByOptions = [];
        var ratings = {};
        var dataRange=[];

        _toggleActiveClass($this);

        // появляются на экране
        AnswersModule.showAnswersModule();
        ChartModule.showChartModule();

        // Отсеиваем ответы для выбранного вопроса
        answers = AnswersModule.filterAnswersByQuestionId(questionId);
        // Получаем все возможные варианты ответов на данный вопрос
        options = OptionsModule.getOptionsForQuestion(questionId);
        answersGroupedByOptions = AnswersModule.sortAnswersByOptions(options, answers);

        ChartModule.setDataSet(answersGroupedByOptions);
   
/* 
-----------------------------------------------------------------     
ОТКЛЮЧИЛ, т.к. от ответов в баллах от 1 до 10, перешли к произвольным ответам.  

        // Если варианты ответов - это баллы от 1 до 10, то сортируем их по диапазонам (1-3, 4-7, 8-10 - диапазоны задаются в настройках SETTINGS)
        ratings = AnswersModule.sortRatingsByRanges(answers);

        // Строим график - количество оценок для каждого диапазона (ось Y, высота столбцов)
        dataRange = [
            ratings.low.length, 
            ratings.mid.length,
            ratings.high.length
        ];
        ChartModule.setDataSet(dataRange);
-----------------------------------------------------------------
*/       
        ChartModule.update();

        // Рендерим список людей давших ответы
        AnswersModule.showAnswersData(answers);
        AnswersModule.showStats(answers);

        PrintModule.enablePrintBtn();

    }

    function _showQuestionsModuleBlock(){
        $questionsModuleBlock.fadeIn(FADEIN_TIME);
    }

    return {
        init: _init,
        getCurrentQuestionId: _getCurrentQuestionId,
        getCurrentQuestionText: _getCurrentQuestionText
    }

}());
