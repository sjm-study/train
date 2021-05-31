var gulp = require('gulp')
var responsive = require('gulp-responsive')
gulp.task('default', function () {
    return gulp
        .src('images/*.{png,jpg}')
        .pipe(
            responsive({
                '*'
                    : [
                        {
                            width: 576,
                            quality: 50,
                            rename: {
                                suffix: '-576'
                            }
                        },
                        {
                            width: 768,
                            quality: 75,
                            rename: {
                                suffix: '-768'
                            }
                        },
                        {
                            width: 992,
                            rename: {
                                suffix: '-992'
                            },
                        },
                        {
                            rename: {
                                suffix: '-original'
                            }
                        }
                    ]
            }, {
                errorOnEnlargement: false,
                skipOnEnlargement: true,
                withoutEnlargement: true
            })
        )
        .pipe(gulp.dest('dist/images'))
})