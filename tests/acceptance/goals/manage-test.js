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

    const $goalsContainer = $userContainer.find(".goals-container");
    T.exists(assert, $goalsContainer, "Missing container");

    click($goalsNavigator.find(".add-goal"));
    andThen(function() {
      const $newGoalContainer = $goalsContainer.find(".new-goal");

      var $createGoalForm = $newGoalContainer.find("#createGoalForm");
      T.exists(assert, $createGoalForm, "Missing create goal form");

      T.exists(assert, $createGoalForm.find(".gru-input.title"), "Missing goal title field");
      assert.ok($createGoalForm.find(".gru-datepicker").length, 2,"Missing 2 date picker components");
      assert.ok($createGoalForm.find(".gru-select").length, 2,"Missing 2 select components");
      T.exists(assert, $createGoalForm.find(".gru-input.reflection"), "Missing reflection field");
      T.exists(assert, $createGoalForm.find(".create-goal"), "Missing create goal button");
    });

  });

});
