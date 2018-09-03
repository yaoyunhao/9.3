var gulp = require('gulp');
var css = require('gulp-clean-css');
var sass = require('gulp-sass');
var js = require('gulp-uglify');
var server = require('gulp-webserver');
var fs = require("fs");
var path = require('path');
var url = require("url");
var list = require("./src/moke/list.json");
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
    //开启服务
gulp.task('server', function() {
        return gulp.src('src')
            .pipe(server({
                port: 8080,
                middleware: function(req, res, next) {
                    if (req.url === "/favicon.ico") {
                        return res.end();
                    }
                    var pathname = url.parse(req.url).pathname;
                    if (pathname == "/api/list") {
                        var key = url.parse(req.url, true).query.key;
                        var arr = [];
                        list.forEach(function(file) {
                            if (file.title.match(key)) {
                                arr.push(file);
                            }
                        })
                        res.end(JSON.stringify({ code: 1, msg: arr }));
                    } else {
                        console.log(pathname);
                        pathname = "/" ? "index.html" : pathname;
                        res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                    }
                    // if (pathname == "/") {
                    //     res.end(fs.readFileSync(__dirname, 'src', 'index.html'));
                    // } else {
                    //     res.end(fs.readFileSync(__dirname, 'src', pathname));
                    // }
                }
            }))

    })
    //合并
gulp.task('dev', gulp.series('scss', 'server', 'watch'));