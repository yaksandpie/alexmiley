module.exports = function(grunt) {

  // Load all the grunts
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Set up the tasks
  grunt.initConfig({
    jade: {
      compile: {
        files: [
          {
            expand: true,
            cwd: 'src/pages',
            src: ['**/*.jade'],
            dest: 'dist/',
            ext: '.html'
          }
        ]
      }
    },

    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/assets/css',
          src: ['**/*.scss'],
          dest: 'dist/css',
          ext: '.css'
        }]
      }
    },

    uglify: {
      all: {
        files: {
          'dist/js/main.js': 'src/assets/js/**/*.js'
        }
      }
    },

    copy: {
      images: {
        expand: true,
        cwd: 'src/assets/images',
        src: '**',
        dest: 'dist/images'
      },

      fonts: {
        expand: true,
        cwd: 'src/assets/fonts',
        src: '**',
        dest: 'dist/fonts'
      },

      resume: {
        expand: true,
        cwd: 'src/resume',
        src: '**',
        dest: 'dist/resume'
      }
    },

    autoprefixer: {
      build: {
        expand: true,
        cwd: 'dist/css',
        src: [ '**/*.css' ],
        dest: 'dist/css'
      }
    },

    watch: {
      jade: {
        files: '**/*.jade',
        tasks: [ 'jade', 'copy']
      },

      html: {
        files: '**/*.html',
        tasks: [ 'copy' ]
      },

      sass: {
        files: '**/*.scss',
        tasks: [ 'sass' ]
      },

      javascript: {
          files: 'src/assets/js/**/*.js',
          tasks: [ 'uglify' ]
        },

      autoprefixer: {
        files: '**/*.css',
        tasks: [ 'autoprefixer' ]
      },

      css: {
        files: '**/*.css',
        tasks: [ 'copy' ]
      },

      livereload: {
        files: ['*.html', 'assets/css/*', 'assets/images/*', 'assets/js/*'],
        options: {
          livereload: true
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 4000,
          base: 'dist/',
          hostname: '*'
        }
      }
    }
  });

  grunt.registerTask('default', [ 'jade', 'sass', 'autoprefixer', 'copy', 'connect', 'watch' ]);
}
