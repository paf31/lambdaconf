module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({ 
  
    files: [
      "src/**/*.purs",
      "bower_components/scrap-your-markup/src/**/*.purs",
      "bower_components/purescript-*/src/**/*.purs",
      "bower_components/purescript-*/src/**/*.purs.hs"
    ],
    
    clean: {
      all: ["tmp", "output"]
    },
  
    pscMake: {
      all: {
        src: "<%=files%>"
      }
    },

    copy: [
      {
        expand: true, 
        cwd: "output",
        src: ["**"], 
        dest: "tmp/node_modules/"
      }, {
        src: ["js/index.js"],
        dest: "tmp/index.js"
      }
    ],

    browserify: {
      all: {
        src: ["tmp/index.js"],
        dest: "html/index.js"
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-purescript");
  grunt.loadNpmTasks('grunt-browserify');
 
  grunt.registerTask("default", ["pscMake:all", "copy", "browserify:all"]);
};
