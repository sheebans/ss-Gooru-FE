import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('index', {path: '/'});

  this.route('search', function() {
    this.route('collections');
  });

  this.route('player', { path: '/player/:collectionId'});

  this.route('classes');

  this.route('class', { path: '/class/:classId' }, function() {
    this.route('overview');
    this.route('info');

    this.route('analytics', function() {
      this.route('performance', function() {
        this.route('student');
        this.route('teacher');
      });
    });
  });

  this.route('profile', { path: '/profile/:userId' }, function() {
    this.route('about');
    this.route('activity');
    this.route('analytics');

    this.route('content', function() {
      this.route('course');
    });

    this.route('network');
  });

  this.route('framework', function () {
    this.route('assessment');
    this.route('class-assessment');
    this.route('components');
  });
});

export default Router;
