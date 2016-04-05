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

    this.route('classes', function(){
      this.route('create',{path: '/create/'});
    });

    this.route('resources', function () {
      this.route('edit', {path: '/edit/:resourceId'});
    });

    this.route('questions', function () {
      this.route('edit', {path: '/edit/:resourceId'});
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

  this.route('profile', { path: '/profile/:userId' }, function() {
    this.route('about');
    this.route('edit');
    this.route('activity');
    this.route('analytics');

    this.route('content', function() {
      this.route('course');
    });

    this.route('network');
  });
  this.route('user');
});

export default Router;
