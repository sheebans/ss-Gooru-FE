import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | class/overview', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'class-overview-token',
      user: {
        gooruUId: 'pochita'
      }
    });
  }
});

test('Layout as a student', function (assert) {
  visit('/class/class-for-pochita-as-student/overview');
  andThen(function() {
    assert.equal(currentURL(), '/class/class-for-pochita-as-student/overview');

    const $overviewContainer = find(".controller.class .controller.overview");
    assert.ok($overviewContainer.length, 'Missing overview container');

    const $overviewOption = find(".class-menu");
    assert.ok($overviewOption.find(".list-group .list-group-item.class-menu-item.overview.selected"), 'Overview option should be selected');

    const $overviewHeader = find(".overview-header", $overviewContainer);
    assert.ok($overviewHeader.length, 'Missing overview header');

    assert.ok($overviewHeader.find("h5").length, 'Missing title');
    assert.ok($overviewHeader.find("button.locate").length, 'Missing locate button');
    assert.ok(!$overviewHeader.find("button.edit-content").length, 'Edit Content button should not be present');

    // The course map should be expanded all the way to the resource of the user's current location
    // Per /app/services/api-sdk/course-location#findOneByUser,
    // the user current location is: second unit, first lesson, second resource
    const $expandedUnits = find(".gru-accordion-unit.expanded", $overviewContainer);
    assert.equal($expandedUnits.length, 1, 'Wrong number of unit accordions expanded');

    const $expandedLessons = find(".gru-accordion-lesson.expanded", $overviewContainer);
    assert.equal($expandedLessons.length, 1, 'Wrong number of lesson accordions expanded');

    var $accordion = find(".gru-accordion-unit:eq(1)", $overviewContainer);
    assert.ok($accordion.hasClass('expanded'), 'Second unit should be expanded');

    $accordion = find(".gru-accordion-lesson:eq(0)", $accordion);
    assert.ok($accordion.hasClass('expanded'), 'First lesson in the second unit should be expanded');

    var $resource = find(".collections .panel:eq(1)", $accordion);
    assert.ok($resource.hasClass('selected'), 'Second resource should be marked as selected');
  });
});

// TODO: Test opening the accordions using the Locate button

test('Layout as a teacher', function (assert) {
  visit('/class/class-for-pochita-as-teacher/overview');
  andThen(function () {
    assert.equal(currentURL(), '/class/class-for-pochita-as-teacher/overview');

    const $overviewContainer = find(".controller.class .controller.overview");
    assert.ok($overviewContainer.length, 'Missing overview container');

    const $overviewHeader = find(".overview-header", $overviewContainer);
    assert.ok($overviewHeader.length, 'Missing overview header');

    assert.ok($overviewHeader.find("h5").length, 'Missing title');
    assert.ok($overviewHeader.find("button.edit-content").length, 'Missing edit content button');
    assert.ok(!$overviewHeader.find("button.locate").length, 'Locate button should not be present');

    const $expandedUnits = find(".gru-accordion-unit.expanded", $overviewContainer);
    assert.ok(!$expandedUnits.length, 'None of the unit accordions should be expanded');
  });
});

test('Clicking on a collection in the accordions should open the player with said collection', function (assert) {
  visit('/class/class-10/overview');
  andThen(function () {

    assert.equal(currentURL(), '/class/class-10/overview');
    const $unitAccordions = find('.gru-accordion-course .gru-accordion-unit');

    // Click on the last unit
    click($unitAccordions.last().find('.panel-title a'));
    andThen(() => {

      const $lessonAccordions = find('.gru-accordion-lesson', $unitAccordions.last());

      // Click on the last lesson
      click($lessonAccordions.last().find('.panel-title a'));
      andThen(() => {

        const $collections = find('.collections .collection', $lessonAccordions.last());

        //Click on the first collection
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

test('Clicking on an assessment in the accordions should open the player with said assessment', function (assert) {
  visit('/class/class-10/overview');
  andThen(function() {

    assert.equal(currentURL(), '/class/class-10/overview');
    const $unitAccordions = find('.gru-accordion-course .gru-accordion-unit');

    // Click on the last unit
    click($unitAccordions.last().find('.panel-title a'));
    andThen(() => {

      const $lessonAccordions = find('.gru-accordion-lesson', $unitAccordions.last());

      //Click on the last lesson
      click($lessonAccordions.last().find('.panel-title a'));
      andThen(() => {

        const $assessments = find('.collections .assessment', $lessonAccordions.last());
        click($assessments.first().find('.panel-title a'));
        andThen(() => {
          var pathName = currentURL().split('?')[0];

          assert.equal(currentRouteName(), 'player');
          assert.equal(pathName, '/player/522f6827-f7dd-486f-8631-eba497e2d425', 'Incorrect path name');
        });
      });
    });
  });
});
