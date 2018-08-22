module.exports = function (grunt) {
  // Load S3 plugin
  grunt.loadNpmTasks('grunt-aws');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    aws: grunt.file.readJSON('credentials.json'),
    s3: {
      options: {

      },
      build: {
        cwd: 'public',
        src: '**',
      },
    },
  });
};
