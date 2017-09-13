"use strict" //показывать место ошибки в терминале

var gulp = require('gulp');
var	sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS    = require('gulp-clean-css');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create(),
	reload = browserSync.reload;
var wiredep = require('wiredep').stream;
var spritesmith = require('gulp.spritesmith');
var gulpif = require("gulp-if");

gulp.task('sprites', function () {
    return  gulp.src('app/img/icons/*.png') //все иконки которые необходимо положить в спрайт класть в эту папку
                .pipe(spritesmith({
                    imgName: 'sprite.png',
                    cssName: '_sprite.scss',
                    cssFormat: 'scss',
                    imgPath: '../img/sprite/sprite.png',
                    padding: 20
                }))
                .pipe(gulpif('*.png', gulp.dest('app/img/sprite'))) // на выходе получаем спрайт в этой папке
                .pipe(gulpif('*.scss', gulp.dest('app/scss/_common')));
});

gulp.task('wiredep', function () {
  gulp.src('app/*.html')
    .pipe(wiredep())
    .pipe(gulp.dest('app/'))
});

//Компилируем Sass в CSS
gulp.task('sass', function () {
		gulp.src('app/scss/main.scss')
			.pipe(plumber())
			.pipe(sass())
			.on('error',log)
			.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
			.pipe(cleanCSS())
			.pipe(gulp.dest('app/css'))
			.pipe(reload({stream: true}));
});

gulp.task('sync', function(){
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });
});


gulp.task('watch', function(){
	gulp.watch('./app/markups/**/*.jade', ['jade']);
	gulp.watch('./app/scss/**/*.scss', ['sass']);
	gulp.watch('./bower.json', ['wiredep']);

	gulp.watch(['app/*.html', 'app/css/*.css', 'app/js/*.js']).on('change', browserSync.reload);
});


gulp.task('default', ['sass', 'sync', 'watch']);


// ===================== Функции ======================

// Более наглядный вывод ошибок
var log = function (error) {
	console.log([
		'',
		"----------ERROR MESSAGE START----------",
		("[" + error.name + " in " + error.plugin + "]"),
		error.message,
		"----------ERROR MESSAGE END----------",
		''
	].join('\n'));
	this.end();
}
