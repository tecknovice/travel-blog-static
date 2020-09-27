const path = require('path')
const gulp = require('gulp')
const imagemin = require('gulp-imagemin')
const source = path.join('static', 'temp', 'images', '*')
const dest = path.join('static', 'images')
const globby = require('globby')
const del = require('del')
const debug = require('debug')('travel-blog-static:*')

async function imageclean() {
    let deleteFiles = await globby(source)
    debug('deleteFiles', deleteFiles)
    await del(deleteFiles)
}
function imageminify() {
    return gulp.src(source)
        .pipe(imagemin([
            // imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(gulp.dest(dest));
}
gulp.task("imageminify", imageminify)
gulp.task("imageclean", imageclean)
gulp.task("watch", () => {
    gulp.watch(source, gulp.series('imageminify', 'imageclean'));
})
gulp.task("default", gulp.series("imageminify", 'imageclean', "watch"))