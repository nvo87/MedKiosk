var ReviewsModule = (function () {
    var REVIEWS = [];  

    function _init(reviewsJSON, SETTINGS) {
        REVIEWS = reviewsJSON;
        _setUpListeners();
    }

    function _setUpListeners() {

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

    return {
        init: _init,

    }

}());
