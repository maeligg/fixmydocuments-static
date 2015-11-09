module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'img/unoptimised/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'img/'
                }]
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'css/main-pre.css': 'sass/main.scss'
                }
            }
        },

        postcss: {
            options: {
                map: true, // inline sourcemaps

                // or
                map: {
                  inline: false, // save all sourcemaps as separate files...
                  annotation: 'css/main.postcss.map' // ...to the specified directory
                },

                processors: [
                    require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
                    require('cssnano')() // minify the result
                ]
            },

            dist: {
                src: 'css/main-pre.css',
                dest: 'css/main.css'
            }


  },


        watch: {

                    images: {
                        files: ['img/unoptimised/*.{png,jpg,gif}'],
                        tasks: ['imagemin'],
                    },
                    css: {
                        files: ['sass/*.scss'],
                        tasks: ['sass'],
                    },
                    postcss: {
                        files: ['css/main-pre.css'],
                        tasks: ['postcss'],
                    }
                }

    });

// 3. Where we tell Grunt we plan to use this plug-in.
grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-postcss');

// 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
grunt.registerTask('default', ['imagemin', 'sass', 'postcss']);

};