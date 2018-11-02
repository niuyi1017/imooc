module.exports = function (grunt) {
  
  grunt.initConfig({
    watch: {
      jade: {
        files: ['app/views/**'],
        option: {
          livereload: true
        }
      },
      js: {
        files: ['public/js/**', 'modules/**/*.js', 'schemas/**/*.js'],
        option: {
          livereload: true
        }
      }
    },
    nodemon: {
      dev: {
        script: 'app.js',
        options: {
          args: [],
          nodeArgs: ['--inspect'],
          ignore: ['node_modules/**'],
          ext: 'js',
          watch: ['./'],
          delayTime: 1000,
          env: {
            PORT: 3000
          },
          cwd: __dirname
        }
      }
    },
    concurrent: {
      task: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-nodemon')
  grunt.loadNpmTasks('grunt-concurrent')

  // grunt.option('force', true)

  grunt.registerTask('default', ['concurrent'])
}