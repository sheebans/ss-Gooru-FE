import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | Manage Goals page', {
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
  visit('/goals/manage');

  andThen(function() {
    assert.equal(currentURL(), '/goals/manage');

    T.exists(assert, find("header.gru-header"), "Header component not found");

    const $userContainer = find(".controller.manage-goals");
    T.exists(assert, $userContainer, "Missing manage goals container");

    T.exists(assert, $userContainer.find(".greetings"), "Missing title");

    const $goalsNavigator = $userContainer.find(".goals-navigator");
    T.exists(assert, $goalsNavigator, "Missing navigator");
    T.exists(assert, $goalsNavigator.find(".add-goal"), "Missing Add Goal button");

    const $goalsList = $userContainer.find(".list-goals");
    T.exists(assert, $goalsList, "Missing list of goals");

    const cards = $goalsList.find(".gru-goal-card");
    assert.equal(cards.length, 2, "Missing cards");

    click($goalsNavigator.find(".add-goal"));
    andThen(function() {
      const $goalsContainer = $userContainer.find(".form-goal-container");
      T.exists(assert, $goalsContainer, "Missing form goal container");

      const $formComponent= $goalsContainer.find(".gru-goal-form");
      T.exists(assert, $formComponent, "Missing create goal form component");
    });

  });

});
