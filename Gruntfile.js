'use strict';
module.exports = function(grunt) {

	// Load all Grunt Tasks
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		// Watch
		watch: {
			sass: {
				files: ['assets/styles/**/*.{scss,sass}'],
				tasks: ['sass', 'autoprefixer', 'cssmin']
			},
			js: {
				files: '<%= jshint.all %>',
				tasks: ['jshint', 'uglify']
			},
			images: {
				files: ['assets/images/**/*.{png,jpg,gif}'],
				tasks: ['imagemin']
			},
			livereload: {
				options: { livereload: true },
				files: ['**/*.{html,php}', 'style.css', 'assets/scripts/*.js', 'assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}']
			}
		},

		// Browser Sync
		browserSync: {
			bsFiles: {
				src: 'style.css'
			},
			options: {
				watchTask: true,
				notify: false,
				//proxy: "localhost.site.com"
			}
		},

		// Sass
		sass: {
			dist: {
				options: {
					sourcemap: true,
					style: 'expanded'
				},
				files: {
					'assets/styles/build/style.css': 'assets/styles/style.scss',
					//'assets/styles/build/editor-style.css': 'assets/styles/editor-styles.scss'
				}
			}
		},

		// Autoprefixer
		autoprefixer: {
			options: {
				browsers: ['last 2 versions', 'ie 9', 'ios 6', 'android 4'],
				map: true
			},
			files: {
				expand: true,
				flatten: true,
				src: 'assets/styles/build/*.css',
				dest: 'assets/styles/build'
			}
		},

		// CSS Min
		cssmin: {
			options: {
				keepSpecialComments: 1
			},
			minify: {
				expand: true,
				cwd: 'assets/styles/build',
				src: ['*.css', '!*.min.css'],
				dest: 'assets/styles/build',
				ext: '.min.css'
			}
		},

		// JS Linting
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				"force": true
			},
			all: [
				'Gruntfile.js',
				'assets/scripts/source/**/*.js'
			]
		},

		// Uglify
		uglify: {
			plugins: {
				options: {
					sourceMap: 'assets/scripts/plugins.js.map',
					sourceMappingURL: 'plugins.js.map',
					sourceMapPrefix: 2
				},
				files: {
					'assets/scripts/plugins.min.js': [
						'assets/scripts/source/plugins.js',
						//'assets/scripts/vendor/pluginname/pluginnanme.js'
					]
				}
			},
			main: {
				options: {
					sourceMap: 'assets/scripts/main.js.map',
					sourceMappingURL: 'main.js.map',
					sourceMapPrefix: 2
				},
				files: {
					'assets/scripts/main.min.js': [
						'assets/scripts/source/main.js'
					]
				}
			}
		},

		// Image Optimization
		imagemin: {
			dist: {
				options: {
					optimizationLevel: 7,
					progressive: true,
					interlaced: true
				},
				files: [{
					expand: true,
					cwd: 'assets/images/',
					src: ['**/*.{png,jpg,gif'],
					dest: 'assets/images/'
				}]
			}
		}

	});

	grunt.registerTask('default', ['sass', 'autoprefixer', 'cssmin', 'uglify', 'imagemin', 'browserSync', 'watch']);
	grunt.registerTask('serve', ['browserSync', 'watch']);

};
