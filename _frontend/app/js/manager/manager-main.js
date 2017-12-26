jQuery(document).ready(function($) {
    
    $.when(

        $.getJSON('/restapi/questions/'),
        $.getJSON('/restapi/answers/'),
        $.getJSON('/restapi/patients/'),
        $.getJSON('/restapi/patients-with-reviews/'),
        $.getJSON('/restapi/options/')

    ).then(function(r1, r2, r3, r4, r5){

        var questionsJSON = r1[0];
        var answersJSON = r2[0];
        var patientsJSON = r3[0];
        var reviewsPatientsJSON = r4[0];
        var optionsJSON = r5[0];

        var SETTINGS = {
                // диапазоны сортировки ответов (в случае баллов от 1 до 10) и построений на диаграмме
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
        console.log(reviewsPatientsJSON);
        console.log(optionsJSON);

        ChartModule.init(SETTINGS);
        AnswersModule.init(answersJSON, SETTINGS);
        ReviewsModule.init(reviewsPatientsJSON, SETTINGS);
        QuestionsModule.init(questionsJSON, SETTINGS);
        OptionsModule.init(optionsJSON, SETTINGS);
        PrintModule.init();

    }, function(e){console.log(e.status, e.statusText)});


});