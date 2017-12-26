var ChartModule = (function () {
    var $chartModuleBlock = $("#ChartModuleBlock");
    var $chartTitleQuestion = $("#chartTitleQuestion");
    var $chartBlock = $("#StatsChart");
    var $legendBlock = $("#chartLegend");
    var legendTplScript = $("#legendTpl");
    var myChart;
    var RANGES, FADEIN_TIME;
    var defaultBackgroundColor= [
                    'rgba(255, 99, 132, 0.3)',
                    'rgba(54, 162, 235, 0.3)',
                    'rgba(255, 206, 86, 0.3)',
                    'rgba(25, 26, 186, 0.3)',
                    'rgba(124, 180, 86, 0.3)',
                    'rgba(12, 150, 186, 0.3)',
                    'rgba(55, 206, 6, 0.3)'
                ];
    var ActiveBackgroundColor= [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(25, 26, 186, 1)',
                    'rgba(124, 180, 86, 1)',
                    'rgba(12, 150, 186, 1)',
                    'rgba(55, 206, 6, 1)'
                ];

    function _init(SETTINGS) {
        FADEIN_TIME = SETTINGS.FADEIN_TIME;
        RANGES = SETTINGS.RANGES; // диапазоны сортировки ответов
        
        if ($chartBlock.length > 0) {
            myChart = new Chart($chartBlock, _setChartParams());
        } else {
            return false;
        }

        _setUpListeners();
    }

    function _setUpListeners() {
        // $chartBlock.on('click', _showRangeAnswsersData);
    }

    function _setChartParams(dataRanges) {
        dataRanges = dataRanges || [0,0,0];

        return {
            type: 'bar',
            data: {
                labels: [
                    // // RANGES[номер диапазона][0 - мин.знач; 1 - макс.знач]
                    // RANGES[0][0]+"-"+RANGES[0][1]+" балла", 
                    // RANGES[1][0]+"-"+RANGES[1][1]+" балла", 
                    // RANGES[2][0]+"-"+RANGES[2][1]+" балла"
                    1,2,3,4
                    ],
                datasets: [{
                    label: 'Кол-во оценок',
                    data: dataRanges,
                    backgroundColor: defaultBackgroundColor,
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                legend: {
                    display: true
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,
                            stepsize:1,
                            max: 10,
                            min: 0
                        }
                    }]
                },
                tooltips: {enabled:true}
            }
        }
    }

    function _getClickValues(event){
        var activePoints = myChart.getElementsAtEvent(event);
        if (activePoints[0]) {
            var chartData = activePoints[0]['_chart'].config.data;
            var idx = activePoints[0]['_index']; // порядковый номер нажатого элемента по оси Х. Определяет номер дипазона

            var label = chartData.labels[idx];
            var value = chartData.datasets[0].data[idx];

            return {
                range: RANGES[idx],
                label: label,
                value: value
            }
        }
        return false;
    }

    function _highlightActiveBar(event){
        var activePoints = myChart.getElementsAtEvent(event);

        myChart.data.datasets[0].backgroundColor = defaultBackgroundColor;
        myChart.update();

        var NewBackgroundColor = defaultBackgroundColor.slice(); // .slice() - копирует массив, а не передает по ссылке

        if (activePoints[0]) {
            var idx = activePoints[0]['_index'];
            NewBackgroundColor[idx] = ActiveBackgroundColor[idx];
            myChart.data.datasets[0].backgroundColor = NewBackgroundColor;
            myChart.update();
        }
    }

    function _showRangeAnswsersData(event) {
        // информация о клике по диаграмме
        _highlightActiveBar(event);

        var clickPoint = _getClickValues(event);

        if (!clickPoint) {return false}

        var range = { 
            // Мин. и макс. значение диапазона, на котором кликнули.
            min: clickPoint.range[0], 
            max: clickPoint.range[1]
        }; 

        //получаем текущий вопрос и отсеиваем ответы на него в соответствии с диапазоном на который кликнули
        var questionId = QuestionsModule.getCurrentQuestionId();
        var answersToQuestion = AnswersModule.filterAnswersByQuestionId(questionId);
        var answersInRange = AnswersModule.filterAnswersByRatingRange(range.min, range.max, answersToQuestion);


        AnswersModule.showAnswersData(answersInRange);
        AnswersModule.showStats(answersInRange);
        
    }

    function _updateChart() {
        myChart.update();
    }

    function _setDataSet(answersArray) {
        var xArray = []; // вариант ответа
        var yArray = []; // количество ответов для каждого варианта
        var yMax = 0; // максимальное значение по оси Y (для масштабирования)
        for (item in answersArray) {
            xArray[item] = +item + 1; // делаем нумерацию вариантов с 1. +item - быстрое преобразование к числу
            yArray[item] = answersArray[item].length;
        }
        var yMax = Math.max.apply(null, yArray);

        myChart.data.labels = xArray;
        myChart.data.datasets[0].data = yArray;
        myChart.options.scales.yAxes[0].ticks.max = +yMax + 1;
        myChart.data.datasets[0].backgroundColor = defaultBackgroundColor;
    }

    function _showChartModuleBlock(){
        $chartModuleBlock.fadeIn(FADEIN_TIME);
    }

    function _hideChartModuleBlock(){
        $chartModuleBlock.fadeOut(FADEIN_TIME);
    }

    function _generateHandlebarsTpl(handlebarsScriptId){
        //вывод порядкового номера для ответа, начиная с 1
        Handlebars.registerHelper("counter", function (index){
            return index + 1;
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

    function _showChartLegend(chartData){
        var tpl = _generateHandlebarsTpl(legendTplScript);
        _renderHandlebarsTpl(chartData, tpl, $legendBlock);
    }

    function _showChartTitleQuestion(text){
        $chartTitleQuestion.html(text);
        $chartTitleQuestion.addClass('chartTitle');
    }


    return {
        init: _init,
        setDataSet: _setDataSet,
        update: _updateChart,
        showChartModule: _showChartModuleBlock,
        hideChartModule: _hideChartModuleBlock,
        showChartLegend: _showChartLegend,
        showChartTitleQuestion: _showChartTitleQuestion
    }

}());