jQuery(document).ready(function($) {
    
    $.when(

        $.getJSON('/restapi/questions/'),
        $.getJSON('/restapi/answers/'),
        $.getJSON('/restapi/patients/')

    ).then(function(r1, r2, r3){

        var questionsJSON = r1[0];
        var answersJSON = r2[0];
        var patientsJSON = r3[0];

        var SETTINGS = {
                // диапазоны сортировки ответов и построений на диаграмме
                RANGES : { 
                    0: [0,3], 
                    1: [4,7], 
                    2: [8,10]
                },
                // время плавных переходов и исчезновений информации
                FADEIN_TIME: 200
        }

        console.log(questionsJSON);
        console.log(answersJSON);
        console.log(patientsJSON);

        ChartModule.init(SETTINGS);
        AnswersModule.init(answersJSON, SETTINGS);
        QuestionsModule.init(questionsJSON, SETTINGS);
        PrintModule.init();

    }, function(e){console.log(e.status, e.statusText)});


});