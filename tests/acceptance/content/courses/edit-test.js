import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | Edit Course', {
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
  visit('/content/courses/edit/123');

  andThen(function () {
    assert.equal(currentURL(), '/content/courses/edit/123');

    var $container = find(".controller.content.courses.edit");
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

test('Settings Layout', function (assert) {
  visit('/content/courses/edit/123');

  andThen(function () {
    assert.equal(currentURL(), '/content/courses/edit/123');

    var $container = find(".controller.content.courses.edit");
    assert.ok($container.find('#settings .header h2'), "Missing Settings Title");
    assert.ok($container.find('.panel h3'), "Missing Content Publishing Subtitle");
    assert.ok($container.find('.panel-body .setting-content:nth-child(0) .icon i.visibility'), "Missing Visibility Icon");
    assert.ok($container.find('.panel-body .setting-content:nth-child(0) .description.publish-to'), "Missing Publish to message");
    assert.ok($container.find('.panel-body .toggle'), "Missing Toggle");
    assert.ok($container.find('.panel-body .setting-content:nth-child(1) .icon i.public'), "Missing Public Icon");
    assert.ok($container.find('.panel-body .setting-content:nth-child(1) .description.request-to'), "Missing Request to message");
    const $sendRequest = $container.find('.panel-body .request');
    assert.ok($container.find('.panel-body .request.btn-send-request'), "The button should be Send Request");
    $sendRequest.click();
    andThen(function () {
      assert.ok($container.find('.panel-body .request.btn-pending'), "The button should be Send Request");
    });
  });
});

test('Edit course information', function (assert) {
  visit('/content/courses/edit/123');

  andThen(function () {
    assert.equal(currentURL(), '/content/courses/edit/123');

    var newTitle = 'New Course Name';

    var $container = find(".controller.content.courses.edit");
    var $headerActions = $container.find("#information .header .actions");
    var $content = $container.find('#information .content');

    assert.equal($content.find('.panel-body .gru-audience  > div > div.btn-empty').length, 0, 'No audience value selected');

    click($headerActions.find('button.edit'));
    andThen(function () {
      var $contentPanel = $content.find('.panel-body');
      var $title = $contentPanel.find('.title input');

      // Change title
      fillIn($title, newTitle);
      // validation.gru-input updates on focus-out
      triggerEvent($title, 'blur');

      // Open audience menu
      $contentPanel.find('.gru-audience button.dropdown-toggle').click();
      click($contentPanel.find('.gru-audience .dropdown-menu li:eq(0) input[type="checkbox"]'));
      click($headerActions.find('button.save'));
      andThen(function () {
        assert.equal($contentPanel.find('.title b').text(), newTitle, 'Course title updated');
        assert.equal($contentPanel.find('.gru-audience  > div > div.btn-empty').length, 1, 'Audience value updated');
      });
    });
  });
});
