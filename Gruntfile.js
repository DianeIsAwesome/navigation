module.exports = function (grunt) {
  // Load S3 plugin
  grunt.loadNpmTasks('grunt-aws');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // aws: grunt.file.readJSON('credentials.json'),
    s3: {
      options: {
        accessKeyId: 'AKIAJ43PIWB6YMBTQOJQ',
        secretAccessKey: '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',
        bucket: 'sdc-images-vacationdb',
      },
      build: {
        cwd: 'public/dist',
        src: '**',
      },
    },
  });
};
