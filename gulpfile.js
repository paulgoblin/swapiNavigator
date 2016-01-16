var gulp = require('gulp');
var concat = require('gulp-concat');
var del = require('del');
var uglify = require('gulp-uglify');
const babel = require('gulp-babel');


gulp.task('build', ['clean', 'js']);

gulp.task('clean', function(){
  del('dist')
})

gulp.task('js', function(){
  gulp.src('js/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
})


gulp.task('default',['build']);