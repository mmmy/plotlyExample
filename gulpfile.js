var gulp = require('gulp');
var del = require('del');
var browserSync = require('browser-sync').create();
var react = require('gulp-react');
var babel =require('gulp-babel');
var less = require('gulp-less');
var sass = require('gulp-sass');

var src = ['src/*'];
var buildPath = 'build';

gulp.task('clear',function(){
	del.sync(buildPath);
	console.log('-----------build已经清除');
});

gulp.task('build',['clear'],function(){
	gulp.src(src).pipe(gulp.dest(buildPath));
});

gulp.task('default',['build'],function(){
	browserSync.init({
        server: buildPath
    });
	gulp.watch(src,function(event){
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		gulp.src(event.path).pipe(gulp.dest(buildPath)).pipe(browserSync.reload({stream:true}));
	});
});