"use strict";

var gulp = require("gulp");
var scss = require("gulp-sass");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var uglify = require("gulp-uglify");
var htmlmin = require("gulp-htmlmin");
var del = require("del");

gulp.task("css", function() {
  return gulp
    .src("source/scss/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(scss())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

// gulp.task("css", function () {
//   return gulp.src("source/sass/style.scss")
//     .pipe(plumber())
//     .pipe(sourcemap.init())
//     .pipe(sass())
//     .pipe(postcss([
//       autoprefixer()
//     ]))
//     .pipe(csso())
//     .pipe(rename("style.min.css"))
//     .pipe(sourcemap.write("."))
//     .pipe(gulp.dest("build/css"))
// });

// gulp.task("images", function() {
//   return gulp
//     .src("source/img/**/*.{png,jpg,svg}")
//     .pipe(
//       imagemin([
//         imagemin.optipng({ optimizationLevel: 3 }),
//         imagemin.jpegtran({ progressive: true }),
//         imagemin.svgo()
//       ])
//     )
//     .pipe(gulp.dest("source/img"));
// });

// gulp.task("webp", function() {
//   return gulp
//     .src("source/img/**/*.{png,jpg}")
//     .pipe(webp({ quality: 90 }))
//     .pipe(gulp.dest("source/img"));
// });

// gulp.task("sprite", function() {
//   return gulp
//     .src("source/img/icon-*.svg")
//     .pipe(
//       svgstore({
//         inlineSvg: true
//       })
//     )
//     .pipe(rename("sprite.svg"))
//     .pipe(gulp.dest("source/img"));
// });

// gulp.task("sprite", function () {
//   return gulp.src("source/img/icon-*.svg")
//     .pipe(svgstore({
//       inlineSvg: true
//     }))
//     .pipe(rename("sprite.svg"))
//     .pipe(gulp.dest("build/img"));
// });

// gulp.task("html", function() {
//   return (
//     gulp
//       .src("source/*.html")
//       .pipe(posthtml([include()]))
//       .pipe(gulp.dest("source"))
//   );
// });

// gulp.task("html", function () {
//   return gulp.src("source/*.html")
//     .pipe(posthtml([
//       include()
//     ]))
//     .pipe(gulp.dest("build"));
// });

// gulp.task("compress", function () {
//   return gulp.src("source/js/*.js")
//     .pipe(uglify())
//     .pipe(gulp.dest("source/js"));
// });

// gulp.task("copy", function () {
//   return gulp.src([
//       "source/fonts/**/*.{woff,woff2}",
//       "source/img/**",
//       "source/js/**"
//     ], {
//       base: "source"
//     })
//     .pipe(gulp.dest("build"));
//  });

// gulp.task("clean", function () {
//   return del("build");
// });

gulp.task("server", function() {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/scss/**/*.scss", gulp.series("css"));
  gulp.watch("source/*.html").on("change", server.reload);
});

// gulp.task("server", function () {
//   server.init({
//     server: "build/",
//   });

//   gulp.watch("source/sass/**/*.scss", gulp.series("css"));
//   gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html", "refresh"));
//   gulp.watch("source/*.html", gulp.series("html", "refresh"));
// });

// gulp.task("refresh", function (done) {
//   server.reload();
//   done();
// });

gulp.task("start", gulp.series("css", "server"));

// gulp.task("build", gulp.series("clean", "copy", "css", "sprite", "html"));
// gulp.task("start", gulp.series("build", "server"));
