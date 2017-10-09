var ChartModule = (function () {
    var $chartModuleBlock = $("#ChartModuleBlock");
    var $chartBlock = $("#StatsChart");
    var myChart;
    var RANGES, FADEIN_TIME;

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
        $chartBlock.on('click', _showRangeAnswsersData);
    }

    function _setChartParams(dataRanges) {
        dataRanges = dataRanges || [0,0,0];
        return {
            type: 'bar',
            data: {
                labels: [
                    // RANGES[номер диапазона][0 - мин.знач; 1 - макс.знач]
                    RANGES[0][0]+"-"+RANGES[0][1]+" балла", 
                    RANGES[1][0]+"-"+RANGES[1][1]+" балла", 
                    RANGES[2][0]+"-"+RANGES[2][1]+" балла"
                    ],
                datasets: [{
                    label: 'Кол-во оценок',
                    data: dataRanges,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                legend: {display: false},
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,
                            stepsize:1,
                            max: 10,
                            min: 0
                        }
                    }]
                }
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
    }

    function _showRangeAnswsersData(event) {
        // информация о клике по диаграмме
        var clickPoint = _getClickValues(event); 
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
    }

    function _updateChart() {
        myChart.update();
    }

    function _setDataSet(dataArray) {
        myChart.data.datasets[0].data = dataArray;
    }

    function _showChartModuleBlock(){
        $chartModuleBlock.fadeIn(FADEIN_TIME);
    }

    return {
        init: _init,
        setDataSet: _setDataSet,
        update: _updateChart,
        showChartModule: _showChartModuleBlock
    }

}());