import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

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
        // TODO: add support for saving audience
        // assert.equal($contentPanel.find('.gru-audience  > div > div.btn-empty').length, 1, 'Audience value updated');
      });
    });
  });
});

test('Click share button', function (assert) {
  visit('/content/courses/edit/123');

  andThen(function () {
    assert.equal(currentURL(), '/content/courses/edit/123');
    var $shareButton = find(".gru-share-pop-over");

    click($shareButton);
    andThen(function () {
      var $popOverContent = find(".gru-share-pop-over-content");

      T.exists(assert, $popOverContent.find('p'), "Missing share title");
      T.exists(assert, $popOverContent.find('.share-actions #course-popover-input'), "Missing readonly input");
      var $copyBtn = $popOverContent.find('.share-actions .copy-btn');
      T.exists(assert, $copyBtn, "Missing copy button");

      //Is there a way to check the clipboards contents?
      /*click($copyBtn);
      andThen(function () {
        assert.equal($contentPanel.find('.title b').text(), newTitle, 'Course title updated');
        // TODO: add support for saving audience
        // assert.equal($contentPanel.find('.gru-audience  > div > div.btn-empty').length, 1, 'Audience value updated');
      });*/
    });
  });
});
