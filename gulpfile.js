// Import required Gulp modules
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const browserSync = require("browser-sync").create();

// Paths
const paths = {
  html: "./*.html",
  css: ["./style.css", "./responsive.css"], // Include your CSS files
  js: ["./main.js"],
  images: "./images/*",
  bootstrapCss: "./node_modules/bootstrap/dist/css/bootstrap.min.css",
  bootstrapJs: "./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
};

// Task: Minify & Combine CSS (Including Bootstrap)
gulp.task("styles", function () {
  return gulp
    .src([paths.bootstrapCss, ...paths.css]) // Include Bootstrap CSS
    .pipe(cleanCSS())
    .pipe(concat("style.min.css"))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream());
});

// Task: Minify & Combine JavaScript (Including Bootstrap)
gulp.task("scripts", function () {
  return gulp
    .src([paths.bootstrapJs, ...paths.js]) // Include Bootstrap JS
    .pipe(babel({ presets: ["@babel/env"] }))
    .pipe(uglify())
    .pipe(concat("main.min.js"))
    .pipe(gulp.dest("./dist/js"))
    .pipe(browserSync.stream());
});

// Task: Optimize Images
gulp.task("images", function () {
  return gulp.src(paths.images).pipe(imagemin()).pipe(gulp.dest("./dist/images"));
});

// Task: Live Reload (BrowserSync)
gulp.task("serve", function () {
  browserSync.init({ server: { baseDir: "./" } });

  gulp.watch(paths.css, gulp.series("styles"));
  gulp.watch(paths.js, gulp.series("scripts"));
  gulp.watch(paths.html).on("change", browserSync.reload);
});

// Default Task
gulp.task("default", gulp.series("styles", "scripts", "images", "serve"));
