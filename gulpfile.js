require('dotenv').config()
const { src , dest } = require('gulp')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')

function defaultTask(){
    return src([
        'src/public/assets/js/jquery-3.5.1.min.js',
        'src/public/assets/js/bootstrap.bundle.min.js',
        'src/public/assets/js/script.js'
    ],{sourcemaps:true})
    .pipe(uglify())
    .pipe(concat('script.min.js'))
    .pipe(dest('src/public/assets/dist/js/',{sourcemaps:true}))
}

exports.default = defaultTask