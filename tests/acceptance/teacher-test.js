import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | Teacher Landing page', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      'token-api3': 'user-token',
      user: {
        gooruUId: 'id-for-pochita'
      }
    });
  }
});

test('Layout', function(assert) {
  visit('/teacher');

  andThen(function() {
    assert.equal(currentURL(), '/teacher');

    T.exists(assert, find("header.gru-header"), "Header component not found");

    const $userContainer = find(".controller.teacher-landing");
    T.exists(assert, $userContainer, "Missing teacher container");
    const $leftUserContainer = $userContainer.find(".teacher-left-panel");
    T.exists(assert, $userContainer.find(".greetings"), "Missing teacher greetings");
    const $navigatorContainer = $leftUserContainer.find(".teacher-navigator");
    T.exists(assert, $navigatorContainer, "Missing teacher navigator");
    T.exists(assert, $navigatorContainer.find(".actions .create-class-cta"), "Missing create class button");
    assert.ok($("#active-classes").hasClass("active"), "Active classes should be visible");
    const $tabContent = $leftUserContainer.find(".tab-content");
    assert.equal($tabContent.find('.gru-class-card').length, 13 ,"Wrong number of class cards");
    const $rightUserContainer = $userContainer.find(".teacher-right-panel");
    assert.equal($rightUserContainer.find('.box-info').length, 4 ,"Wrong number of info boxes");
  });
});