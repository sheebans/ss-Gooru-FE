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
    assert.equal($sendRequest.text(), "Send Request", "The button should be say Send Request");
    $sendRequest.click();
    andThen(function () {
      assert.equal($container.find('.panel-body .request').text(), "Pending", "The button should be say Send Request");
    });
  });
});
test('Information Layout', function (assert) {
  visit('/content/courses/edit/123');

  andThen(function () {
    assert.equal(currentURL(), '/content/courses/edit/123');

    var $container = find(".controller.content.courses.edit");
    assert.ok($container.find('#information .header h2'), "Missing Information Title");
    assert.ok($container.find('.course-thumbnail .upload-image .library_add'), "Missing Thumbnail Image");
    assert.ok($container.find('.panel-body .title'), "Missing Title Section");
    assert.ok($container.find('.panel-body .title .title'), "Missing Course Title");
    assert.equal($container.find('.panel-body .title .title').text(), "Course Title", "The Course Title should be Course Title");
    assert.ok($container.find('.panel-body .category '), "Missing Category Section");
    assert.ok($container.find('.panel-body .subject'), "Missing Subject Section");
    assert.ok($container.find('.panel-body .audience'), "Missing Audience Section");
    const $edit = $container.find('.actions .edit');
    assert.equal($edit.text(), "Edit", "The button should be say Edit");
    click($edit);
    andThen(function () {
      const $save = $container.find('.actions .save');
      assert.equal($save.text(), "Save", "The button should be say Save");
      const $cancel = $container.find('.actions .cancel');
      assert.equal($cancel.text(), "Cancel", "The button should be say Cancel");
      fillIn($container.find("#course-name"), 'New Course Name');
      $container.find("#course-name").trigger('blur');
      click($cancel);
      andThen(function () {
        assert.equal($container.find('.panel-body .title .title').text(), "Course Title", "The Course Title should be Course Title");
        const $edit = $container.find('.actions .edit');
        click($edit);
        andThen(function () {
          assert.ok($container.find('.course-thumbnail .upload-image .upload'), "Missing Upload Thumbnail Button");
          fillIn($container.find("#course-name"), 'New Title');
          $container.find("#course-name").trigger('blur');
          const $save = $container.find('.actions .save');
          click($save);
          andThen(function () {
            assert.ok($container.find('.actions .edit'), "Missing Edit Button");
            assert.equal($container.find('.panel-body .title span.title').text(), "New Title", "The Course Title should be New Title");
          });
        });
      });
    });
  });
});
