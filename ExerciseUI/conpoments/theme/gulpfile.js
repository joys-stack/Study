const {
    series,
    src,
    dest
} = require('gulp')
// 文件压缩
const cssmin = require('gulp-cssmin')
// 兼容性处理
const autoprefixer = require('gulp-autoprefixer')
// 处理less
const less = require('gulp-less')

// 编译
function compile() {
    return src('./src/*.less')
        .pipe(less())
        .pipe(autoprefixer({
            overrideBrowserslist: require('../../package.json').borwserslists,
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(dest('./lib'))
}

// 拷贝文件
function copyfont() {
    return src('./src/fonts/**')
        .pipe(cssmin())
        .pipe(dest('./lib/fonts'))
}

exports.build = series(compile, copyfont)