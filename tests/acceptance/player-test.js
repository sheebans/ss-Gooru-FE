import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | player', {
  beforeEach: function () {
    authenticateSession(this.application, {
      isAnonymous: true,
      token: 'player-token',
      user: {
        gooruUId: 'player-token-user-id'
      }
    });
  }
});

test('Layout', function (assert) {
  assert.expect(4);
  visit('/player/76cb53df-1f6a-41f2-a31d-c75876c6bcf9');

  andThen(function () {
    const $playerContainer = find(".controller.player");
    T.exists(assert, $playerContainer, "Missing player");
    T.exists(assert, $playerContainer.find(".main .gru-navigation"), "Missing player navigation");
    T.exists(assert, $playerContainer.find(".main .gru-viewer"), "Missing player viewer");
    T.exists(assert, $playerContainer.find(".aside .gru-navigator"), "Missing player navigator");
  });
});

test('Navigate to all resources types', function (assert) {
  assert.expect(10);
  visit('/player/76cb53df-1f6a-41f2-a31d-c75876c6bcf9'); //visit all resource types collection

  andThen(function () {
    const $playerContainer = find(".controller.player");

    //last visited resource is displayed
    assert.equal(currentURL(), '/player/76cb53df-1f6a-41f2-a31d-c75876c6bcf9');
    T.exists(assert, $playerContainer.find('.gru-viewer .gru-url-resource'), "Missing url resource component");

    click($playerContainer.find(".gru-navigator .list-group-item:eq(5)")); // navigating to image resource
    andThen(function () {
      assert.equal(currentURL(), '/player/76cb53df-1f6a-41f2-a31d-c75876c6bcf9?resourceId=d603b284-850f-47cd-9c85-34794a8f5636');
      T.exists(assert, $playerContainer.find('.gru-viewer .gru-image-resource'), "Missing image resource component");

      click($playerContainer.find(".gru-navigator .list-group-item:eq(6)")); // navigating to text/pdf resource
      andThen(function () {
        assert.equal(currentURL(), '/player/76cb53df-1f6a-41f2-a31d-c75876c6bcf9?resourceId=8f1ff8bf-da5b-4303-ad69-9b12f3a97fe8');
        T.exists(assert, $playerContainer.find('.gru-viewer .gru-pdf-resource'), "Missing text/pdf resource component");

        click($playerContainer.find(".gru-navigator .list-group-item:eq(7)")); // navigating to youtube resource
        andThen(function () {
          assert.equal(currentURL(), '/player/76cb53df-1f6a-41f2-a31d-c75876c6bcf9?resourceId=6ec0c16c-fa1d-4d56-81e9-26c8666e2321');
          T.exists(assert, $playerContainer.find('.gru-viewer .gru-youtube-resource'), "Missing youtube resource component");

          click($playerContainer.find(".gru-navigator .list-group-item:eq(8)")); // navigating to vimeo resource
          andThen(function () {
            assert.equal(currentURL(), '/player/76cb53df-1f6a-41f2-a31d-c75876c6bcf9?resourceId=26d785b8-b041-4de8-9e5b-4b0b2842d1c9');
            T.exists(assert, $playerContainer.find('.gru-viewer .gru-vimeo-resource'), "Missing vimeo resource component");
          });
        });
      });
    });
  });
});

test('Navigate to all question types', function (assert) {
  assert.expect(18);
  visit('/player/522f6827-f7dd-486f-8631-eba497e2d425'); //visit all question types collection

  andThen(function () {
    const $playerContainer = find(".controller.player");

    //checking that the last visited resource is displayed
    assert.equal(currentURL(), '/player/522f6827-f7dd-486f-8631-eba497e2d425');
    T.exists(assert, $playerContainer.find('.gru-question-viewer .gru-open-ended'), "Missing open ended component");

    click($playerContainer.find(".gru-navigator .list-group-item:eq(1)")); // navigating to multiple choice question
    andThen(function () {
      assert.equal(currentURL(), '/player/522f6827-f7dd-486f-8631-eba497e2d425?resourceId=0a255924-b887-4200-9e82-fb1e73cd45a9');
      T.exists(assert, $playerContainer.find('.gru-question-viewer .gru-multiple-choice'), "Missing multiple choice component");

      click($playerContainer.find(".gru-navigator .list-group-item:eq(2)")); // navigating to multiple answer question
      andThen(function () {
        assert.equal(currentURL(), '/player/522f6827-f7dd-486f-8631-eba497e2d425?resourceId=62da7af6-90c4-49d6-9b5a-d7ac8117b571');
        T.exists(assert, $playerContainer.find('.gru-question-viewer .gru-multiple-answer'), "Missing multiple answer component");

        click($playerContainer.find(".gru-navigator .list-group-item:eq(3)")); // navigating to true/false question
        andThen(function () {
          assert.equal(currentURL(), '/player/522f6827-f7dd-486f-8631-eba497e2d425?resourceId=58db5003-9a1e-423d-8fcc-de3506034173');
          T.exists(assert, $playerContainer.find('.gru-question-viewer .gru-true-false'), "Missing true/false component");

          click($playerContainer.find(".gru-navigator .list-group-item:eq(4)")); // navigating to fib question
          andThen(function () {
            assert.equal(currentURL(), '/player/522f6827-f7dd-486f-8631-eba497e2d425?resourceId=60a20e19-e122-4e49-8da7-9556b2ad8bd3');
            T.exists(assert, $playerContainer.find('.gru-question-viewer .gru-fib'), "Missing fib component");

            click($playerContainer.find(".gru-navigator .list-group-item:eq(5)")); // navigating to reorder question
            andThen(function () {
              assert.equal(currentURL(), '/player/522f6827-f7dd-486f-8631-eba497e2d425?resourceId=dd82de53-a258-43bf-987d-09adf06f1518');
              T.exists(assert, $playerContainer.find('.gru-question-viewer .gru-reorder'), "Missing reorder component");

              click($playerContainer.find(".gru-navigator .list-group-item:eq(6)")); // navigating to hot text highlight question
              andThen(function () {
                assert.equal(currentURL(), '/player/522f6827-f7dd-486f-8631-eba497e2d425?resourceId=c2694b45-205f-4fad-9abf-ffc342aff205');
                T.exists(assert, $playerContainer.find('.gru-question-viewer .gru-hot-text-highlight'), "Missing hot text highlight component");

                click($playerContainer.find(".gru-navigator .list-group-item:eq(7)")); // navigating to hot spot image question
                andThen(function () {
                  assert.equal(currentURL(), '/player/522f6827-f7dd-486f-8631-eba497e2d425?resourceId=19ffe6fb-d184-4e4e-a159-7844f11ee44a');
                  T.exists(assert, $playerContainer.find('.gru-question-viewer .gru-hs-image'), "Missing hot spot image component");

                  click($playerContainer.find(".gru-navigator .list-group-item:eq(8)")); // navigating to hot spot text question
                  andThen(function () {
                    assert.equal(currentURL(), '/player/522f6827-f7dd-486f-8631-eba497e2d425?resourceId=524c3970-db05-4eec-8a82-013f27f1a1a6');
                    T.exists(assert, $playerContainer.find('.gru-question-viewer .gru-hs-text'), "Missing hot spot text component");
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

test('closePlayer: If navigating directly to the player, closing the player should return the user to the home page', function(assert) {
  visit('/player/76cb53df-1f6a-41f2-a31d-c75876c6bcf9');
  andThen(function() {

    const playerCloseButton = $('.gru-navigator #item_back');
    assert.equal(currentRouteName(), 'player', 'Incorrect route name');
    click(playerCloseButton);
    andThen(function() {

      assert.equal(currentURL(), '/', 'Redirected to an incorrect url');
    });
  });
});

test('closePlayer: Return to search after closing the player', function(assert) {
  visit('/search/collections?term=water');
  andThen(function() {

    const collectionCardLink = find(".collection-card:eq(0) .collection-desc a");
    click(collectionCardLink);
    andThen(function() {

      const secondResource = $('.list-group-item').eq(1);
      assert.equal(currentRouteName(), 'player', 'Incorrect route name');
      click(secondResource);
      andThen(function() {

        // Second resource (with iframe) should have been selected
        const playerCloseButton = $('.gru-navigator #item_back');
        click(playerCloseButton);
        andThen(function() {

          const url = currentURL();
          assert.equal('/search/collections?term=water', url, 'Redirected to an incorrect url');
        });
      });
    });
  });
});

test('submitQuestion: When submitting the question', function (assert) {
  assert.expect(5);
  visit('/player/522f6827-f7dd-486f-8631-eba497e2d425?resourceId=46d4a6d4-991b-4c51-a656-f694e037dd68');
  andThen(function () {
    const $playerContainer = find(".controller.player");
    T.exists(assert, $playerContainer, "Missing player");

    var $answerPanel = $playerContainer.find(".gru-question-viewer .answers-panel");
    assert.ok($answerPanel.find(".actions button.save").attr("disabled"), "Button should be disabled");

    var $openEndedComponent = $answerPanel.find(".gru-open-ended");
    T.exists(assert, $openEndedComponent.find("textarea"), "Missing open ended text area");

    fillIn($openEndedComponent.find("textarea"), "test");
    andThen(function () {
      assert.ok(!$answerPanel.find(".actions button.save").attr("disabled"), "Button should not be disabled");
      click($answerPanel.find(".actions button.save"));
      andThen(function () {
        //it moves to the next question
        assert.equal(currentURL(), '/player/522f6827-f7dd-486f-8631-eba497e2d425?resourceId=0a255924-b887-4200-9e82-fb1e73cd45a9');
      });
    });
  });
});

test('selectNavigatorItem: When moving to another resource', function (assert) {
  assert.expect(2);
  visit('/player/76cb53df-1f6a-41f2-a31d-c75876c6bcf9');
  andThen(function () {
    const $playerContainer = find(".controller.player");
    T.exists(assert, $playerContainer, "Missing player");
    click($playerContainer.find(".gru-navigator .list-group-item:eq(3)"));
    andThen(function () {
      //it navigates to specific resource
      assert.equal(currentURL(), '/player/76cb53df-1f6a-41f2-a31d-c75876c6bcf9?resourceId=c058d02d-c5bf-44e2-af70-62ea1c9dfed1');
    });
  });
});

test('selectNavigatorItem & closeNavigator: When moving to another resource the navigator should be closed', function (assert) {
  assert.expect(7);
  visit('/player/76cb53df-1f6a-41f2-a31d-c75876c6bcf9');
  andThen(function () {
    const $playerContainer = find(".controller.player");
    const $appContainer = find(".app-container");

    T.exists(assert, $playerContainer, "Missing player");
    T.exists(assert, $appContainer, "Missing app container");

    assert.ok(!$appContainer.hasClass("navigator-on"), "Shouldn't have navigator-on class");
    T.exists(assert, $playerContainer.find(".gru-navigation .hamburger-icon"), "Missing navigation hamburger icon");

    click($playerContainer.find(".gru-navigation .hamburger-icon"));

    andThen(function () {
      assert.ok($appContainer.hasClass("navigator-on"), "Should have navigator-on class");
      click($playerContainer.find(".gru-navigator .list-group-item:eq(3)"));
      andThen(function () {
        //it navigates to specific resource
        assert.equal(currentURL(), '/player/76cb53df-1f6a-41f2-a31d-c75876c6bcf9?resourceId=c058d02d-c5bf-44e2-af70-62ea1c9dfed1');
        andThen(function () {
          assert.ok(!$appContainer.hasClass("navigator-on"), "Shouldn't have navigator-on class");
        });
      });
    });
  });
});

test('openNavigator & closeNavigator: When opening and closing the navigator', function (assert) {
  assert.expect(6);
  visit('/player/76cb53df-1f6a-41f2-a31d-c75876c6bcf9');
  andThen(function () {
    const $appContainer = find(".app-container"),
      $playerContainer = find(".controller.player");
    T.exists(assert, $appContainer, "Missing app container");
    assert.ok(!$appContainer.hasClass("navigation-on"), "Shouldn't have navigator-on class");
    T.exists(assert, $playerContainer, "Missing player");

    //open navigator
    T.exists(assert, $playerContainer.find(".gru-navigation .hamburger-icon"), "Missing navigation hamburger icon");
    click($playerContainer.find(".gru-navigation .hamburger-icon"));
    andThen(function () {
      assert.ok($appContainer.hasClass("navigator-on"), "Should have navigator-on class");

      //close navigator
      click($playerContainer.find(".gru-navigator .hamburger-icon"));
      andThen(function () {
        assert.ok(!$appContainer.hasClass("navigator-on"), "Shouldn't have navigator-on class");
      });
    });
  });
});

