//import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
//import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | Edit Question', {
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
/*
test('Click share button and check clipboard functionality', function (assert) {
  visit('/content/questions/edit/123');

  andThen(function () {
    assert.equal(currentURL(), '/content/questions/edit/123');
    var $shareButton = find(".gru-share-pop-over");

    click($shareButton);
    andThen(function () {
      var $popOverContent = find(".gru-share-pop-over-content");

      T.exists(assert, $popOverContent.find('p'), "Missing share description");
      T.exists(assert, $popOverContent.find('.share-actions #question-popover-input'), "Missing readonly input");
      var $copyBtn = $popOverContent.find('.share-actions .copy-btn');
      T.exists(assert, $copyBtn, "Missing copy button");
    });
  });
});
*/
test('Delete Question', function (assert) {
  visit('/content/assessments/edit/50484e74-ad95-44d5-981a-c18411260233');
  andThen(function () {
    assert.equal(currentURL(), '/content/assessments/edit/50484e74-ad95-44d5-981a-c18411260233');
    var $deleteButton = find("header .actions .delete");
    click($deleteButton);
    andThen(function () {
      var $deleteContentModal = find(".gru-modal .gru-delete-content");
      var $check1 = $deleteContentModal.find("ul li:eq(0) input");
      click($check1);
      andThen(function () {
        var $check2 = $deleteContentModal.find("ul li:eq(1) input");
        click($check2);
        andThen(function () {
          var $check3 = $deleteContentModal.find("ul li:eq(2) input");
          click($check3);
          andThen(function () {
            var $input = $deleteContentModal.find(".delete-input");
            $input.val('delete');
            $input.blur();
            keyEvent($input, 'keyup', KEY_CODES.ENTER);
            andThen(function () {
              var $deleteButton = $deleteContentModal.find("button.delete");
              click($deleteButton);
              andThen(function () {
                assert.equal(currentURL(), '/pochita/content/courses');
              });
            });
          });
        });
      });
    });
  });
});
