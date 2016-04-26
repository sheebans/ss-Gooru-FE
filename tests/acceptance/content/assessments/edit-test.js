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

test('Edit assessment information', function (assert) {
  visit('/content/assessments/edit/123');

  andThen(function () {
    assert.equal(currentURL(), '/content/assessments/edit/123');

    var newTitle = 'New Assessment Name';
    var newLearningObjectives = 'Learning objectives ...';

    var $container = find(".controller.content.assessments.edit");
    var $headerActions = $container.find("#information .header .actions");
    var $content = $container.find('#information .content');

    assert.equal($content.find('.panel-body .title b').text(), 'Assessment Title', 'Title');
    assert.equal($content.find('.panel-body .learning-objectives b').text(), '', 'Learning objectives');

    click($headerActions.find('button.edit'));
    andThen(function () {
      var $contentPanel = $content.find('.panel-body');
      var $title = $contentPanel.find('.title input');
      var $objectives = $contentPanel.find('.learning-objectives .ember-text-area');

      fillIn($title, '');
      triggerEvent($title, 'blur');

      click($headerActions.find('button.save'));
      andThen(function () {

        var $errorMessage = $contentPanel.find('.validation.title .error');

        assert.equal($errorMessage.text().trim(), 'Please enter the assessment title.', 'Validation message missing');

        fillIn($title, newTitle);
        fillIn($objectives, newLearningObjectives);
        // validations update on focus-out
        triggerEvent($title, 'blur');
        triggerEvent($objectives, 'blur');

        click($headerActions.find('button.save'));
        andThen(function () {
          assert.equal($contentPanel.find('.title b').text(), newTitle, 'Title updated');
          assert.equal($contentPanel.find('.learning-objectives b').text(), newLearningObjectives, 'Learning objectives updated');
        });
      });
    });
  });
});
