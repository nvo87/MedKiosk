jQuery(document).ready(function($) {
    
    var url = '/restapi/answers-to-question/';
    var chart = $("#myChart");
    var chartParams = setChartParams([1,1,1], [1,1,1], [1,1,1]);
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
            type: 'horizontalBar',
            data: {
                labels: ["1-3", "4-7", "8-10"],
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
                            beginAtZero:true
                        }
                    }]
                }
            }
        }
    }

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

            for (item in answers) {
                ratings.push(answers[item]["rating"]);
            }

            low = ratings.filter(function(x) {return x<=3});
            medium = ratings.filter(function(x) {return x>=4 && x<=7});
            high = ratings.filter(function(x) {return x>=8 && x<=10});
            dataRange = [low.length, medium.length, high.length];
            console.log(myChart);
            // myChart.clear();

            myChart.data.datasets[0].data = dataRange;
            console.log(myChart.data);
            myChart.update();
        });
        
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