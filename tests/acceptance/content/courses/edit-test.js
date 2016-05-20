import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';
import {KEY_CODES} from "gooru-web/config/config";

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
  visit('/content/courses/edit/course-123');

  andThen(function () {
    assert.equal(currentURL(), '/content/courses/edit/course-123');

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

test('Click share button and check clipboard functionality', function (assert) {
  visit('/content/courses/edit/course-123');

  andThen(function () {
    assert.equal(currentURL(), '/content/courses/edit/course-123');
    var $shareButton = find(".gru-share-pop-over");

    click($shareButton);
    andThen(function () {
      var $popOverContent = find(".gru-share-pop-over-content");

      T.exists(assert, $popOverContent.find('p'), "Missing share description");
      T.exists(assert, $popOverContent.find('.share-actions #course-popover-input'), "Missing readonly input");
      var $copyBtn = $popOverContent.find('.share-actions .copy-btn');
      T.exists(assert, $copyBtn, "Missing copy button");
    });
  });
});

test('Delete unit', function (assert) {
  visit('/content/courses/edit/course-123');

  andThen(function () {
    assert.equal(currentURL(), '/content/courses/edit/course-123');
    assert.equal(find(".gru-accordion-unit").length,3, 'Should have 3 units');
    var $unit = find(".gru-accordion-unit:eq(0)");
    var $deleteButton = $unit.find(".item-actions .delete-item");
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
                assert.equal(find(".gru-accordion-unit").length,2, 'Should have 2 units');
              });
            });
          });
        });
      });
    });
  });
});
test('Delete lesson', function (assert) {
  visit('/content/courses/edit/course-123');

  andThen(function () {
    assert.equal(currentURL(), '/content/courses/edit/course-123');
    var $unit = find(".gru-accordion-unit:eq(0) .panel strong a");
    click($unit);
    andThen(function () {
      assert.equal(find(".gru-accordion-lesson").length,1, 'Should have 1 lesson');
      var $lesson = find(".gru-accordion-lesson:eq(0)");
      var $deleteButton = $lesson.find(".item-actions .delete-item");
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
                    assert.equal(find(".gru-accordion-lesson").length,0, 'Should have 0 lessons');
                  });
                });
              });
          });
        });
      });
    });
  });
});
test('Delete collection', function (assert) {
  visit('/content/courses/edit/course-123');

  andThen(function () {
    assert.equal(currentURL(), '/content/courses/edit/course-123');
    var $unit = find(".gru-accordion-unit:eq(0) .panel strong a");
    click($unit);
    andThen(function () {
      var $lesson = find(".gru-accordion-lesson:eq(0) .panel strong a");
      click($lesson);
      andThen(function () {
        assert.equal(find(".gru-accordion-lesson-item").length,1, 'Should have 1 collection');
          var $deleteButton = find(".gru-accordion-lesson-item:eq(0) .item-actions .delete-item");
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
                      assert.equal(find(".gru-accordion-lesson-item").length,0, 'Should have 0 collections');
                    });
                  });
                });
              });
            });
        });
      });
    });
  });
});
