import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | Create Class', {
  beforeEach: function () {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'profile-token',
      user: {
        gooruUId: 'pochita'
      }
    });
  }
});

test('Layout', function (assert) {
  visit('/content/classes/create');

  andThen(function () {
    assert.equal(currentURL(), '/content/classes/create');

    let $container = find(".controller.create-class");
    assert.ok($container.length, "Container");
    assert.ok($container.find('.modal-header').length, "Header is missing");
    assert.ok($container.find('.modal-body').length, "Body is missing");
    assert.ok($container.find('.modal-footer').length, "Footer is missing");


    const $classNameInput = $container.find('.class-name-input');
    assert.ok($classNameInput.length, "Class name input container missing");
    assert.ok($classNameInput.find('.form-control#class-name-input').length, "Missing class name input");

    const $conditionPrompt = $container.find('.condition-prompt');
    assert.ok($conditionPrompt.length, "Missing condition prompt container");
    assert.equal($container.find('.conditions label').length, 2, "Number of edit sections");

    assert.ok($container.find('a.cancel-button').length, "Cancel button is missing");
    assert.ok($container.find('button.get-started').length, "Get started button is missing");

  });
});
