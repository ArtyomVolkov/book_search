module.exports = function (grunt) {
	grunt.initConfig ({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
		  options: {
	      curly: true,
	      eqeqeq: true,
	      eqnull: true,
	      browser: true,
	      globals: {
	        jQuery: true,
	        $: true,
	        console: true
	      },
	    },
	    '<%= pkg.name %>' : {
	    		src: ['js/**/*.js']
	    	} 
		},
		concat: {
			dist: {
				src: ['js/app.js', 'js/**/*.js'],
				dest: 'dest/js/main.js'
			}
		},
		uglify: {
			options: {
				mangle: true,
				stripBanners: true,
				banner: '/* <%= pkg.name %> -v <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */ \n'
			},
			build: {
				src: 'dest/js/main.js',
				dest: 'dest/js/main.min.js'
			}
		},
		watch: {
			files: 'js/**/*.js',
			tasks: 'build'
		}
	});

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.registerTask("build", ['jshint', 'concat', 'uglify']);
    grunt.registerTask("watcher", ['watch']);
};