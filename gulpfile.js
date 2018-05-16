var gulp = require('gulp'), //  手动引入模块（可以详细的看到引入了那些模块）
    sass = require('gulp-sass'), //  scss文件编译成css 
    minifyCss = require('gulp-minify-css'), //  gulp-minify-css压缩css文件
    plumber = require('gulp-plumber'), //  错误代码输出报错，不阻断进程
    babel = require('gulp-babel'), //  编译ES6/7等
    uglify = require('gulp-uglify'), //  压缩js
    clearnHtml = require("gulp-cleanhtml"), //  清洁html（删除不需要的空格，换行符等...）
    imagemin = require('gulp-imagemin'), //  压缩图片文件（包括PNG、JPEG、GIF和SVG图片）
    browserSync = require('browser-sync').create(), //  实时加载(开启服务) 保证多个浏览器或设备网页同步显示 (recipes)
    connect = require('gulp-connect'), //  开启服务（另一种方法）
    sourcemaps = require('gulp-sourcemaps'), //  生成sourcemap文件
    autoprefixer = require('gulp-autoprefixer'), //  css 加前缀
    $ = require('gulp-load-plugins')(), //  引入gulp加载的所有插件
    pngquant = require('imagemin-pngquant'), //  使用pngquant深度压缩png图片的imagemin插件
    cache = require('gulp-cache'), //  只压缩修改的图片
    fileinclude = require('gulp-file-include'), //  
    reload = browserSync.reload;

var proxy = require('http-proxy-middleware');
/*
var express = require('express');
var app = express();
app.use('/user', proxy({
    target: 'http://192.168.4.124:7200/',
    changeOrigin: true,
    pathRewrite: {
        '^/user': '/user'
    }
}));

app.listen(8080, function() {
    console.log('http://localhost:5555')
});*/

// var gulp = require('gulp'),      
//     //按需加载package.json中的所有依赖包
//     $ = require('gulp-load-plugins')({
//         pattern: '*',
//     });

// 定义源代码的目录和编译压缩后的目录
var src = 'src',
    dist = 'build';

// 编译全部scss 并压缩
gulp.task('css', function() {
    gulp.src(src + '/**/*.scss')
        .pipe(plumber())
        .pipe(autoprefixer({ // 需要兼容的版本是当前浏览器最新版的前20个版本
            browsers: ['last 20 versions', 'Firefox >= 10'],
            cascade: true
        }))
        .pipe(sass())
        // .pipe(minifyCss())
        .pipe(gulp.dest(dist))
        .pipe(connect.reload());
})

// 编译全部js 并压缩
gulp.task('js', function() {
    gulp.src(src + '/**/*.js')
        .pipe(plumber())
        // .pipe(babel({
        //     presets: ['es2015']
        // }))
        // .pipe(uglify())
        .pipe(gulp.dest(dist))
        .pipe(connect.reload());
});

// 压缩全部html
gulp.task('html', function() {
    gulp.src(src + '/**/*.html')
        .pipe(plumber())
        // .pipe(clearnHtml())
        .pipe(gulp.dest(dist))
        .pipe(connect.reload());
});

// 压缩全部image
gulp.task('image', function() {
    gulp.src([src + '/**/*.{jpg,png,gif,ico}'])
        .pipe(plumber())
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest(dist))
        .pipe(connect.reload());
});

gulp.task('fileinclude', function() {
    // 适配page中所有文件夹下的所有html，排除page下的include文件夹中html
    gulp.src(['./src/**.html'])
        .pipe(plumber())
        .pipe(fileinclude({
            prefix: '@@',
            basepath: 'src/components', //引用文件路径
            indent: true //保留文件的缩进
        }))
        .pipe(gulp.dest('build'))
        .pipe(connect.reload());
});

// 自动刷新
gulp.task('watch', function() {
    connect.server({
        root: ['./build'],
        port: 8080,
        livereload: true,
        middleware: function(connect, opt) {
            return [
                proxy('/user',  {
                    target: 'http://192.168.4.124:7200/',
                    changeOrigin:true,
                    pathRewrite: {
                        '^/user': '/user'
                    }
                }),
            ]
        }

    });

    /*browserSync.init({
        port: 8080,
        server: "./build"
    });*/

    // 监听scss文件编译
    gulp.watch(src + '/**/*.scss', ['css'], reload);

    // 监听js文件变化后刷新页面
    gulp.watch(src + "/**/*.js", ['js']).on("change", reload);

    // 监听html文件变化后刷新页面
    gulp.watch("./src/*.html", ['html']).on("change", reload);

    // 监听css文件变化后刷新页面
    gulp.watch(dist + "/**/*.css").on("change", reload);
});



// 监听事件
gulp.task('default', ['fileinclude', 'css', 'js', 'html', 'image', 'watch']);
// http://svn.ids111.com/game_server/expendables/web/tags/20171017.1