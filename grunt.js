/*global module:false*/
module.exports = function (grunt) {

    grunt.initConfig({
        meta:{
            version:'1.0',
            banner:"/* JS Test Frame <%= meta.version %> */"
        },
        concat:{
            dist:{
                src:['<banner:meta.banner>', 'src/jstestframe.js', 'src/*.js'],
                dest:'js-testframe-<%= meta.version %>.js'
            }
        },
        min:{
            dist:{
                src:['<config:concat.dist.dest>'],
                dest:'js-testframe-<%= meta.version %>.min.js'
            }
        },
        qunit: {
            all: ['test/tests.html']
        },
        server: {
            port: 8099,
            base: '.'
        }
    });

    grunt.registerTask('default', 'concat min');
    grunt.registerTask('test', 'default server qunit');

};