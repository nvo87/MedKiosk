var OptionsModule = (function () {
    function _init(optionsJSON, SETTINGS) {
        OPTIONS = optionsJSON;
        FADEIN_TIME = SETTINGS.FADEIN_TIME; 

        _setUpListeners();
    }

    function _setUpListeners() {
        
    }

    function _getOptionsForQuestion(question_id, options){
        /* Ф-ия отсеивает из всего массива с вар-тами ответов OPTIONS только варианты на определенный вопрос по его id. */
        options = options || OPTIONS;
        var filteredOptions = [];
        for (item in options) {
            if (options[item]['question'] === question_id) {
                filteredOptions.push(options[item]);
            }
        }
        return filteredOptions;
    }


    return {
        init: _init,
        getOptionsForQuestion: _getOptionsForQuestion
    }

}());
