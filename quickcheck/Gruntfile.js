module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({ 
  
    mainFiles: [
      "src/**/*.purs",
      "bower_components/purescript-*/src/**/*.purs",
      "bower_components/purescript-*/src/**/*.purs.hs"
    ],
    
    clean: {
      lib: ["js"]
    },
  
    psc: {
      options: {
        main: true
      },
      main: {
        src: "<%=mainFiles%>",
        dest: "js/Main.js"
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-purescript");
  
  grunt.registerTask("main", ["psc:main"]);
  grunt.registerTask("default", ["main"]);
};
