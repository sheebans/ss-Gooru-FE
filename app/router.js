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

  this.route('class', function(){
    this.route('index', { path: '/:classId'});
    this.route('overview', { path: '/:classId/overview'});
  });
});

export default Router;
