var PrintModule = (function () {
    var $printBtn = $('#printBtn');
    var $questionHeader = $('#questionHeader');
    var disableClass = 'js-disableLink';

    function _init(answersJSON, SETTINGS) {
        _setUpListeners();
    }

    function _setUpListeners() {
        $printBtn.on('click', printTheScreen);

    }

    function printTheScreen(e){
        event.preventDefault();
        
        var question = QuestionsModule.getCurrentQuestionText();
        $questionHeader.html(question);

        window.print();
    }

    function _enablePrintBtn(){
        $printBtn.removeClass(disableClass);
    }

    return {
        init: _init,
        enablePrintBtn:_enablePrintBtn
    }

}());