import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | class/overview', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'class-overview-token',
      user: {
        gooruUId: 'class-overview-token-user-id'
      }
    });
  }
});

test('Layout', function(assert) {
  visit('/class/class-10/overview'); //@todo create stubs

  andThen(function() {
    assert.equal(currentURL(), '/class/class-10/overview');

    const $overviewContainer = find(".controller.class .controller.overview");
    T.exists(assert, $overviewContainer, "Missing overview container");
    T.exists(assert, $overviewContainer.find(".overview-header"), "Missing overview header");
    T.exists(assert, $overviewContainer.find(".overview-header h5"), "Missing title");
    T.exists(assert, $overviewContainer.find(".locate-me"), "Missing locate me button");
  });
});

test('Accordions open/close functionality', function(assert) {
  visit('/class/class-10/overview'); //@todo create stubs for calls to course-location service
  andThen(function() {

    assert.equal(currentURL(), '/class/class-10/overview');

    const $unitAccordions = find('.gru-accordion-course .gru-accordion-unit');
    assert.equal($unitAccordions.length, 5, 'Wrong number of units listed');

    var $openUnitAccordions = find('.gru-accordion-course .gru-accordion-unit.expanded');
    assert.ok(!$openUnitAccordions.length, 'No unit accordions should appear expanded');

    const $firstUnit = $unitAccordions.first();

    // Click on the first unit
    click($firstUnit.find('.panel-title a'));
    andThen(() => {

      var $lessonAccordions = find('.gru-accordion-lesson', $firstUnit);
      var $openLessonAccordions = find('.gru-accordion-lesson.expanded', $firstUnit);

      assert.ok($firstUnit.hasClass('expanded'), 'The first unit accordion should have expanded');
      assert.equal($lessonAccordions.length, 2, 'Wrong number of lesson accordions listed');
      assert.ok(!$openLessonAccordions.length, 'No lesson accordions should appear expanded');

      // Click on the first lesson
      var $firstLesson = $lessonAccordions.first();
      click($firstLesson.find('.panel-title a'));
      andThen(() => {

        const $lastUnit = $unitAccordions.last();
        var $lessonItems = find('.collections .panel', $firstLesson);

        assert.ok($firstLesson.hasClass('expanded'), 'The first lesson accordion should have expanded');
        assert.equal($lessonItems.length, 4, 'Wrong number of lesson items listed');

        // Click on the last unit
        click($lastUnit.find('.panel-title a'));
        andThen(() => {
          $lessonAccordions = find('.gru-accordion-lesson', $lastUnit);
          $openLessonAccordions = find('.gru-accordion-lesson.expanded', $lastUnit);

          assert.ok(!$firstUnit.hasClass('expanded'), 'The fist unit accordion should have collapsed');
          assert.ok($lastUnit.hasClass('expanded'), 'The last unit accordion should have expanded');
          assert.equal($lessonAccordions.length, 2, 'Wrong number of lesson accordions listed');
          assert.ok(!$openLessonAccordions.length, 'No lesson accordions should appear expanded');

          // Click on the last lesson
          var $lastLesson = $lessonAccordions.last();
          click($lastLesson.find('.panel-title a'));
          andThen(() => {
            $lessonItems = find('.collections .panel', $lastLesson);

            assert.ok($lastLesson.hasClass('expanded'), 'The last lesson accordion should have expanded');
            assert.equal($lessonItems.length, 4, 'Wrong number of lesson items listed');
          });
        });
      });
    });
  });
});

test('Clicking on a collection in the accordions should open the player with said collection', function(assert) {
  visit('/class/class-10/overview');
  andThen(function() {

    assert.equal(currentURL(), '/class/class-10/overview');
    const $unitAccordions = find('.gru-accordion-course .gru-accordion-unit');

    // Click on the first unit
    click($unitAccordions.first().find('.panel-title a'));
    andThen(() => {

      const $lessonAccordions = find('.gru-accordion-lesson', $unitAccordions.first());

      //Click on the first lesson
      click($lessonAccordions.first().find('.panel-title a'));
      andThen(() => {

        const $collections = find('.collections .collection', $lessonAccordions.first());
        click($collections.first().find('.panel-title a'));
        andThen(() => {
          var pathName = currentURL().split('?')[0];

          assert.equal(currentRouteName(), 'player');
          assert.equal(pathName, '/player/76cb53df-1f6a-41f2-a31d-c75876c6bcf9', 'Incorrect path name');
        });
      });
    });
  });
});

test('Clicking on an assessment in the accordions should open the player with said assessment', function(assert) {
  visit('/class/class-10/overview');
  andThen(function() {

    assert.equal(currentURL(), '/class/class-10/overview');
    const $unitAccordions = find('.gru-accordion-course .gru-accordion-unit');

    // Click on the first unit
    click($unitAccordions.first().find('.panel-title a'));
    andThen(() => {

      const $lessonAccordions = find('.gru-accordion-lesson', $unitAccordions.first());

      //Click on the first lesson
      click($lessonAccordions.first().find('.panel-title a'));
      andThen(() => {

        const $collections = find('.collections .assessment', $lessonAccordions.first());
        click($collections.first().find('.panel-title a'));
        andThen(() => {
          var pathName = currentURL().split('?')[0];

          assert.equal(currentRouteName(), 'player');
          assert.equal(pathName, '/player/522f6827-f7dd-486f-8631-eba497e2d425', 'Incorrect path name');
        });
      });
    });
  });
});
