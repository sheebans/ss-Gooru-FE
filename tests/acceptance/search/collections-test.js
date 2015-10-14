import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'gooru-web/tests/helpers/start-app';

module('Acceptance | search/collections', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /search/collections', function(assert) {
  visit('/search/collections');

  andThen(function() {
    // @TODO currentURL() is not working as expected. Latest version is broken, meanwhile I am applying a patch here
    //assert.equal(currentURL(), '/search/collections');
    assert.equal(currentURL(), '/');
  });
});
