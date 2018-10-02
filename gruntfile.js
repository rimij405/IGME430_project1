module.exports = function(grunt) {
    
    // project config
    grunt.initConfig({
        jsdoc: {
            dist: {
                src: ['hosted/*.js', 'server/*.js'],
                jsdoc: './node_modules/.bin/jsdoc',
                options: {
                    destination: 'docs/jsdoc',
                    configure: 'docs/jsdoc/config.json',
                    template: './node_modules/ink-docstrap/template'
                }
            }
        },
        docco: {
            debug: {
                src: [ 'server/*.js' ],
                options: {
                    output: 'docs/docco'
                }
            }
        }
    });
    
    // load plugins.
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-docco');
    
};