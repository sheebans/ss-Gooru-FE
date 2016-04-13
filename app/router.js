import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('index', {path: '/'});

  this.route('search', function() {
    this.route('collections');
    this.route('assessments');
    this.route('questions');
    this.route('resources');
  });

  this.route('sign-in');
  this.route('sign-up');
  this.route('logout');

  this.route('content', function () {

    this.route('assessments', function () {
      this.route('edit', {path: '/edit/:assessmentId'});
    });

    this.route('collections', function () {
      this.route('edit', {path: '/edit/:collectionId'});
    });

    this.route('courses', function () {
      this.route('edit', {path: '/edit/:courseId'});
    });

    this.route('classes', function() {
      this.route('create');
      this.route('join');
    });

    this.route('resources', function () {
      this.route('edit', {path: '/edit/:resourceId'});
    });

    this.route('questions', function () {
      this.route('edit', {path: '/edit/:questionId'});
    });
  });

  this.route('player', { path: '/player/:collectionId'});

  this.route('context-player', {path: '/player/class/:classId/course/:courseId/unit/:unitId/lesson/:lessonId/collection/:collectionId'});

  this.route('classes');

  this.route('class', { path: '/class/:classId' }, function() {
    this.route('overview');
    this.route('info');

    this.route('analytics', function() {
      this.route('performance', function() {
        this.route('student');
        this.route('teacher', function() {
          this.route('course');
          this.route('unit', { path: '/unit/:unitId'});
          this.route('lesson', { path: '/unit/:unitId/lesson/:lessonId'});
          this.route('collection', { path: '/unit/:unitId/lesson/:lessonId/collection/:collectionId'});
        });
      });
    });
  });

  this.route('reports', function () {
    this.route('collection', {path: '/class/:classId/collection/:collectionId'});
    this.route('student-collection', {path: '/class/:classId/course/:courseId/unit/:unitId/lesson/:lessonId/collection/:collectionId/student/:userId'});
  });

  this.route('user');

  this.route('api'); //development api for testing end points

  this.route('profile', { path: '/:userId' }, function() {
    this.route('about');
    this.route('edit');
    this.route('activity');
    this.route('analytics');

    this.route('content', function() {
      this.route('courses');
      this.route('resources');
      this.route('questions');
      this.route('collections');
      this.route('assessments');
    });

    this.route('network');
  });
  /**
   * IMPORTANT! the profile route should be the last one at this file, so we can handle the app urls
   * and the vanity urls for profiles like www.gooru.org/javier-perez
   */
});

export default Router;
