import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | Student Landing page', {
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
  visit('/student');

  andThen(function() {
    assert.equal(currentURL(), '/student');

    T.exists(assert, find('header.gru-header'), 'Header component not found');
    T.exists(assert, find('.announcements'),'Missing announcements panel');
    T.exists(assert, find('.announcements .warning i'),'Missing warning icon');
    T.exists(assert, find('.announcements .warning span.announcements-lead'),'Missing warning announcements lead');
    assert.equal(find('.announcements .classes-announcements ul li').length,5,'Missing announcements lust');
    T.exists(assert, find('.more-classes'),'Missing more classes indetifier');

    const $userContainer = find('.controller.student-landing');
    T.exists(assert, $userContainer, 'Missing student container');

    const $leftUserContainer = $userContainer.find('.student-left-panel');
    T.exists(assert, $leftUserContainer.find('.greetings'), 'Missing student greetings');

    const $navigatorContainer = $leftUserContainer.find('.student-navigator');
    T.exists(assert, $navigatorContainer, 'Missing student navigator');
    T.exists(assert, $navigatorContainer.find('.actions .join-class-cta'), 'Missing join class button');
    T.exists(assert, $navigatorContainer.find('.actions .manage-goals-cta'), 'Missing manage goals button');

    assert.ok($('#active-classes').hasClass('active'), 'Active classes should be visible');

    const $tabContent = $leftUserContainer.find('.tab-content');
    assert.equal($tabContent.find('.gru-class-card').length, 7 ,'Wrong number of class cards');
  });
});

test('Go to manage goals page', function(assert) {
  visit('/student');

  andThen(function() {
    assert.equal(currentURL(), '/student');

    const $userContainer = find('.controller.student-landing');
    const $leftUserContainer = $userContainer.find('.student-left-panel');
    const $navigatorContainer = $leftUserContainer.find('.student-navigator');

    click($navigatorContainer.find('.actions .manage-goals-cta'));
    andThen(function() {
      assert.equal(currentURL(), '/goals/manage', 'Wrong route');
    });
  });
});

test('Go to course map from announcement', function(assert) {
  visit('/student');

  andThen(function() {
    assert.equal(currentURL(), '/student');
    const $announcement = find('.announcements .classes-announcements ul li:nth-child(1) a');
    click($announcement);
    andThen(function() {
      assert.equal(currentURL(), '/class/class-for-pochita-as-student/overview?location=first-unit-id%2Bfirst-lesson-id%2Bfirst-assessment-id', 'Wrong route');
    });
  });

});
