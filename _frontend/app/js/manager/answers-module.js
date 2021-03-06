var AnswersModule = (function () {
    var ANSWERS = [];  
    var $answersModuleBlock = $('#AnswersModuleBlock'); // весь модуль ответов целиком, с ответами, кнопками и т.д.
    var $reviewsBlock = $('#reviewsList'); // блок куда выводятся ответы
    var reviewsTplScript = $('#reviewsTpl'); // срипт шаблона для вывода ответов
    var onlyReviewsTplScript = $('#onlyReviewsTpl'); // срипт шаблона для вывода ответов
    var $foldCommentsBlock = $('#foldingBlock'); // кнопки свернуть/развернуть все ответы
    var $foldBtns = $foldCommentsBlock.children('.folding-btn');
    var reviewsItemClass = '.reviews-item';
    var reviewTitleClass = '.review-title';
    var reviewContentClass = '.review-content';
    var $answersAmountField = $('#answersAmount');
    var $averageAgeField = $('#averageAge');
    var $averageRatingField = $('#averageRating');

    var RANGES, FADEIN_TIME;

    function _init(answersJSON, SETTINGS) {
        ANSWERS = answersJSON;
        RANGES = SETTINGS.RANGES; // диапазоны для сортировки ответов
        FADEIN_TIME = SETTINGS.FADEIN_TIME; 

        _setUpListeners();
    }

    function _setUpListeners() {
        $foldBtns.on('click', _foldComments);
        $reviewsBlock.on('click', reviewTitleClass , _foldComment);
    }

    function _foldComments(e){
        e.preventDefault();

        var textFold = 'Свернуть все';
        var textUnfold = 'Развернуть все';
        $reviewsBlock.toggleClass('js-show-details');
    }

    function _foldComment(e){
        e.preventDefault();
        var $this = $(this);
        var $reviewsItem = $this.parents(reviewsItemClass);
        var $reviewContent = $reviewsItem.find(reviewContentClass);

        $this.toggleClass('active');
        $reviewContent.fadeToggle(FADEIN_TIME);
    }

    function _getAllAnswers(){
        return ANSWERS;
    }

    function _filterByQuestionId(questionId, answers){
        /* Ф-ия отсеивает из всего массива с ответами ANSWERS только ответы на определенный вопрос по его id. */
        answers = answers || ANSWERS;
        var filteredAnswers = [];
        for (item in answers) {
            if (answers[item]['question']['id'] === questionId) {
                filteredAnswers.push(answers[item]);
            }
        }
        return filteredAnswers;
    }

    function _sortByOptions(options, answers){
        var sortedAnswers = [];
        for (item in options) {
            sortedAnswers[item] = answers.filter(function(answer){
                return answer['option']['id'] == options[item]['id'];
            });    
        }
        return sortedAnswers;
    }

    function _filterByRatingRange(min, max, answers){
        answers = answers || ANSWERS;
        var filteredAnswers = [];
        for (item in answers) {
            if ((answers[item]['rating'] >= min) && (answers[item]['rating'] <= max)) {
                filteredAnswers.push(answers[item]);
            }
        }
        return filteredAnswers;
    }

    function _sortRatingsByRanges(answers){
        answers = answers || ANSWERS;
        return {
            // RANGES[номер диапазона][0 - мин.знач; 1 - макс.знач]
            low: _getRatingsInRange(RANGES[0][0], RANGES[0][1], answers),
            mid: _getRatingsInRange(RANGES[1][0], RANGES[1][1], answers),
            high: _getRatingsInRange(RANGES[2][0], RANGES[2][1], answers)
        }
    }

    function _getRatingsInRange(min, max, answers){
        answers = answers || ANSWERS;
        var ratings = [];
        for (item in answers) {
            ratings.push(answers[item]["rating"]);
        }
        return ratings.filter(function(x) {return x >= min && x <= max});
    }

    function _generateHandlebarsTpl(handlebarsScriptId){
        //  format an ISO date using Moment.js
        //  http://momentjs.com/
        //  moment syntax example: moment(Date("2011-07-18T15:50:52")).format("MMMM YYYY")
        //  usage: {{dateFormat creation_date format="MMMM YYYY"}}
        Handlebars.registerHelper('dateFormat', function(context, block) {
          if (window.moment) {
            var f = block.hash.format || "MMM Do, YYYY";
            return moment(context).format(f);
          }else{
            return context;   //  moment plugin not available. return data as is.
          };
        });

        // из скрипта вставленного в html создаем конечный шаблон
        // replace(/[\u200B]/g, '') - это костыль, чтобы убрать текстовую ноду &#8203, которая генерируется первым элементом списка и из-за этого делает лишний отступ в верстке. см."ZERO WIDTH SPACE проблема"
        var templateScript = handlebarsScriptId.html().replace(/[\u200B]/g, '');
        return Handlebars.compile(templateScript);
    }

    function _renderHandlebarsTpl(dataObject, template, blockToRender){
        // подставляем данные в конечный шаблон Handlebars
        blockToRender.html('').append(template(dataObject));
    }

    function _showAnswersData(answersData){
        var tpl = _generateHandlebarsTpl(reviewsTplScript);
        _renderHandlebarsTpl(answersData, tpl, $reviewsBlock);
    }

    function _showReviewsOnly(){
        var reviewsData = ReviewsModule.getAllReviews();
        var tpl = _generateHandlebarsTpl(onlyReviewsTplScript);
        _renderHandlebarsTpl(reviewsData, tpl, $reviewsBlock);
    }

    function _showStats(answers){
        var averageAge = _getAverageAge(answers).toFixed(1);
        var averageRating = _getAverageRating(answers).toFixed(1);

        $answersAmountField.html(answers.length);
        $averageRatingField.html(averageRating);
    }

    function _getAverageAge(answers){
        var totalAge = 0;
        var age;
        for (item in answers) {
            age = answers[item]['patient']['age'];
            totalAge = totalAge + age;
        }
        return totalAge/answers.length;
    }

    function _getAverageRating(answers){
        var totalRating = 0;
        var rating;
        for (item in answers) {
            rating = answers[item]['rating'];
            totalRating = totalRating + rating;
        }
        return totalRating/answers.length;
    }

    function _showAnswersModuleBlock(){
        $answersModuleBlock.fadeIn(FADEIN_TIME);
    }

    return {
        init: _init,
        getAllAnswers: _getAllAnswers,
        filterAnswersByQuestionId: _filterByQuestionId,
        filterAnswersByRatingRange: _filterByRatingRange,
        sortAnswersByOptions: _sortByOptions,
        sortRatingsByRanges: _sortRatingsByRanges,
        showAnswersData: _showAnswersData,
        showReviewsOnly: _showReviewsOnly,
        showAnswersModule: _showAnswersModuleBlock,
        showStats: _showStats
    }

}());
