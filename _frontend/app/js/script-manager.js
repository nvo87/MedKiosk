jQuery(document).ready(function($) {
    
    var url = '/restapi/answers-to-question/';
    var chart = $("#myChart");
    var chartParams = setChartParams([], [], []);
    var myChart = new Chart(chart, chartParams);

    function ajaxRequest(url){
        return $.ajax({
            url: url,
            type: "GET",
            dataType: "json"
        });
    }

    function setChartParams(low, medium, high) {
        return {
            type: 'bar',
            data: {
                labels: ["1-3 балла", "4-7 балла", "8-10 балла"],
                datasets: [{
                    label: '# of Votes',
                    data: [low.length, medium.length, high.length],
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
                onClick: function (e) {
                    console.log(e);
                }
            }
        }
    }

    function generateHandleBarsTpl(obj){
        var list = $('#reviewsList');

        var templateScript = $('#reviewsTpl').html();
        var template = Handlebars.compile(templateScript);
        list.html('').append(template(obj));
    }

    $.when(
        ajaxRequest('/restapi/questions/'),
        ajaxRequest('/restapi/answers/'),
        ajaxRequest('/restapi/patients/')
    ).then(function(r1, r2, r3){
        questionsObj = r1[0];
        answersObj = r2[0];
        patientsObj = r3[0];
        console.log(questionsObj);
        console.log(answersObj);
        console.log(patientsObj);

        // generateHandleBarsTpl(patientsObj);
    }, function(){/*fail Callbacks*/});


    $('.nav-link').on('click', function(event) {
        event.preventDefault();

        $this = $(this);

        questionId = $this.data('id');
        $this.addClass('active').parent().siblings().children().removeClass('active');

        ajaxRequest(url+questionId).done(function(response){
            var answers = response;
            var ratings = [];
            var low=[], medium=[], high=[];
            var chartParams = {};
            console.log(answers);

            for (item in answers) {
                // здесь надо разбить на диапазоны не только ratings но и самих пользователей
                ratings.push(answers[item]["rating"]);
            }

            low = ratings.filter(function(x) {return x<=3});
            medium = ratings.filter(function(x) {return x>=4 && x<=7});
            high = ratings.filter(function(x) {return x>=8 && x<=10});
            console.log(low);
            dataRange = [low.length, medium.length, high.length];

            myChart.data.datasets[0].data = dataRange;
            myChart.update();

            generateHandleBarsTpl(answers);
        });
        
    });

    chart.on('click', function(event) {
        var activePoints = myChart.getElementsAtEvent(event);
        if (activePoints[0]) {
          var chartData = activePoints[0]['_chart'].config.data;
          var idx = activePoints[0]['_index'];

          var label = chartData.labels[idx];
          var value = chartData.datasets[0].data[idx];

          var url = "http://example.com/?label=" + label + "&value=" + value;
          console.log(url);
          alert(url);
        }
        
    });

    $.ajax({
        url: '/restapi/questions/',
        type: "GET",
        dataType: "json",
        success: function(response){
            // console.log(response);
        },
        error: function(error){
            // console.log(error);
        }
    });


    

    
});