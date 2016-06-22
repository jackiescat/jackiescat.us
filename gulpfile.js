const gulp      = require('gulp')
const sass      = require('gulp-sass')
const cache     = require('gulp-cache');
const cssmin    = require('gulp-cssmin')
const imagemin  = require('gulp-imagemin')
const prefix    = require('gulp-autoprefixer')
const sync      = require('browser-sync').create()
const del       = require('del')
const uglify    = require('gulp-uglify');

const paths = {
  sass:    ['./src/sass/**/*.scss'],
  images:  ['./src/images/**/*.+(png|jpg|jpeg|gif|svg)'],
  html:    ['./src/html/**/*.html'],
  js: ['./src/js/**/*.js']
}

gulp.task('clean', () => del(['dist/*', 'dist'], {dot: true}))

gulp.task('compress', function() {
  return gulp.src(paths.js)
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('css', () => {
  return gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix({
      // Autoprefixer shiz here
    }))
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css'))
    .pipe(sync.stream());

})

gulp.task('images', function() {
    return gulp.src(paths.images)
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('./dist/images'))
});

gulp.task('html', () => {
  gulp.src(paths.html)
   .pipe(gulp.dest('./dist/'))
})

gulp.task('sync', () => {
  sync.init({
    server: { baseDir: './dist' }
  })
  gulp.watch(paths.sass,['css']).on('change', sync.reload)
  gulp.watch(paths.html,['html']).on('change', sync.reload)
})

gulp.task('default', ['sync','css', 'compress', 'images', 'html'])
gulp.task('dist', ['clean', 'css', 'compress', 'images', 'html'])
