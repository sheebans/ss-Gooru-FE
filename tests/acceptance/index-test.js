import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'gooru-web/tests/helpers/start-app';
import T from 'gooru-web/tests/helpers/assert';

module('Acceptance | index', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('Page Layout', function(assert) {
  visit('/');

  andThen(function() {
    assert.expect(15); //making sure all asserts are called

    assert.equal(currentURL(), '/');

    //hero
    var $hero = find('.hero');
    T.exists(assert, $hero, "Missing hero section");
    T.exists(assert, $hero.find("h1"), "Missing hero title");

    var $gettingStarted = find('.getting-started-content');
    T.exists(assert, $gettingStarted, "Missing getting started section");
    T.exists(assert, $gettingStarted.find("h2"), "Missing getting started title");

    var $toolkit =find('.toolkit');
    T.exists(assert, $toolkit, "Missing getting started toolkit section");
    T.exists(assert, $toolkit.find("a"), "Missing getting started toolkit link");
    T.exists(assert, $toolkit.find("p"), "Missing getting started toolkit description");

    var $classroom =find('.classroom');
    T.exists(assert, $classroom, "Missing Stories from the Classroom section");
    T.exists(assert, $classroom.find("a"), "Missing Stories from the Classroom link");
    T.exists(assert, $classroom.find("p"), "Missing Stories from the Classroom description");

    var $events =find('.events');
    T.exists(assert, $events, "Missing Check Out our Events section");
    T.exists(assert, $events.find("a"), "Missing Check Out our Events link");
    T.exists(assert, $events.find("p"), "Missing Check Out our Events description");

    var $eventsIcon =find('.events-icon');
    T.exists(assert, $eventsIcon, "Missing Events Icon");
  });
});
