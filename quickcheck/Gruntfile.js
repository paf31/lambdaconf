module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({ 
  
    files: [
      "src/**/*.purs",
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

    execute: {
      src: "tmp/index.js"
    }
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-execute")
  grunt.loadNpmTasks("grunt-purescript");
  
  grunt.registerTask("default", ["pscMake:all", "copy", "execute"]);
};
