var gulp=require('gulp');

var browserSync=require('browser-sync').create();
gulp.task('browser',function(){
    browserSync.init({
        server:{
            baseDir:'./src'
        }
    });
    gulp.watch('./src/**',function(){
        browserSync.reload();
    });
});

// var minify = require('gulp-minify-css');
// gulp.task('cssmini',function(){
//     gulp.src('src/res/css/*.css')
//     .pipe(minify())
//     .pipe(gulp.dest('dist/css/'))
// })

// var autoprefixer = require('gulp-autoprefixer');
// gulp.task('auto',function(){
//     // 找到要添加前缀的文件
//     gulp.src('src/res/css/*.css')
//     .pipe(autoprefixer({
//         browsers:['last 4 versions','last 4 Explorer versions','iOS 7','Firefox >= 18','last 4 Chrome versions'],
//         cascade:true,
//         remove:true
//     }))
//     .pipe(gulp.dest('src/res/css(fi)/'))
// })
