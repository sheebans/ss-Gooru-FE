import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | Edit Assessment', {
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
  visit('/content/assessments/edit/123');

  andThen(function () {
    assert.equal(currentURL(), '/content/assessments/edit/123');

    var $container = find(".controller.content.assessments.edit");
    assert.ok($container.length, "Container");
    assert.ok($container.find('> article').length, "Article");
    assert.ok($container.find('> aside').length, "Aside");

    $container = $container.find('> article');

    const $header = $container.find('> header');
    assert.ok($header.length, "Header");
    assert.ok($header.find('> .actions').length, "Header actions");
    assert.equal($header.find('> .actions > button').length, 5, "Number of header actions");
    assert.ok($header.find('> nav').length, "Header navigation");
    assert.equal($header.find('> nav > a').length, 3, "Number of header navigation links");

    assert.equal($container.find('> section').length, 3, "Number of edit sections");
    assert.ok($container.find('> section#information').length, "Information section");
    assert.ok($container.find('> section#builder').length, "Builder section");
    assert.ok($container.find('> section#settings').length, "Settings section");
  });
});
