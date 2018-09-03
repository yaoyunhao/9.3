var gulp = require('gulp');
var css = require('gulp-clean-css');
var sass = require('gulp-sass');
var js = require('gulp-uglify');
var server = require('gulp-webserver');
var fs = require("fs");
var path = require('path');
var url = require("url");
//编译SCSS，解压css
gulp.task('scss', function() {
        return gulp.src("./src/scss/index.scss")
            .pipe(sass())
            .pipe(css())
            .pipe(gulp.dest('./src/css'))
    })
    //编译JS
gulp.task('js', function() {
    return gulp.src('./src/js/module/*.js')
        .pipe(js())
        .pipe(gulp.dest('./src/js/myjs'))
})

//监听scss
gulp.task("watch", function() {
    return gulp.watch('./src/scss/index.scss', gulp.series('scss'))
})

gulp.task('server', function() {
        return gulp.src('src')
            .pipe(server({
                port: 8080,
                middleware: function(req, res, next) {
                    if (req.url === "/favicon.ico") {
                        return res.end();
                    }
                    var pathname = url.parse(req.url).pathname;
                    pathname = "/" ? "index.html" : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }))

    })
    //合并
gulp.task('dev', gulp.series('scss', 'server', 'watch'));