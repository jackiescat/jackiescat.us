const gulp   = require('gulp')
const sass   = require('gulp-sass')
const cssmin = require('gulp-cssmin')
const prefix = require('gulp-autoprefixer')
const sync   = require('browser-sync').create()
const del    = require('del')

const paths = {
  sass:    ['./src/sass/**/*.scss'],
  images:  ['./src/images/**/*'],
  html:    ['./src/html/**/*.html']
}

gulp.task('clean', () => del(['dist/*', 'dist'], {dot: true}))

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

gulp.task('default', ['sync','css','html'])
gulp.task('dist', ['clean', 'css','html'])
