'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    nodeunit: {
      // files: ['test/**/*test.js']
      files: ['test/strip_test.js']
    },
    clean : {
      tmp : ['tmp']
    },
    copy: {
      all : {
        files: [
          {expand: true, src: ['**'], dest: 'tmp/inline/', cwd: 'test/fixtures/'}
        ]
      }
    },
    strip : {
      all_api_methods : {
        nodes : [
          'iog', 
          'console.log',
          { //esprima parser:
              type:'IfStatement',
              operator:'===',
              leftType:'Identifier',
              leftName:'rtlviewmode',
              rightType:'Literal',
              rightValue:'test',
              replaceWith:'/* removed by strip */'
          }          
        ],
        src : 'test/fixtures/all_api_methods.js',
        dest : 'tmp/all_api_methods.js'
      },
      main : {
          files : 'tmp/inline/*.js', 
          inline : true, //overwrite!
          nodes : [
              'console',
              // {type:'CallExpression',objectName:'console'},
              { //esprima parser:
                  type:'IfStatement',
                  operator:'===',
                  leftType:'Identifier',
                  leftName:'rtlviewmode',
                  rightType:'Literal',
                  rightValue:'test',
                  replaceWith:'/* removed by strip */'
              }
          ]
      }
    },
    jshint: {
      options : {
        jshintrc : './.jshintrc'
      },
      all : ['Gruntfile.js', 'tasks/**/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', ['jshint','clean','copy','strip:all_api_methods','nodeunit']);

};

// npm link
// npm adduser
// npm publish
