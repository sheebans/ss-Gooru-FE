import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';
import {KEY_CODES} from "gooru-web/config/config";

moduleForAcceptance('Acceptance | class/analytics/performance/student', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'class-analytics-performance-student-token',
      user: {
        /* Using pochita, but as a student in classes */
        gooruUId: 'pochita'
      }
    });
  }
});

test('Layout', function(assert) {
  visit('/class/class-for-pochita-as-student/analytics/performance/student');

  andThen(function() {
    assert.equal(currentURL(), '/class/class-for-pochita-as-student/analytics/performance/student');

    const $performanceContainer = find(".controller.class .controller.analytics-performance-student");
    T.exists(assert, $performanceContainer, "Missing performance container");

    T.exists(assert, $performanceContainer.find(".navigation .performance"), "Missing performance navigation tab");
    T.exists(assert, $performanceContainer.find(".navigation .mastery"), "Missing mastery navigation tab");
    T.exists(assert, $performanceContainer.find(".student-actions"), "Missing performance actions");
    T.exists(assert, $performanceContainer.find(".student-actions .gru-actions-bar"), "Missing performance actions component");
    T.exists(assert, $performanceContainer.find(".performance-content"), "Missing performance content");

    const $classMenu = find(".controller.class .gru-class-navigation .class-menu");
    T.exists(assert, $classMenu.find(".analytics.selected"), "Missing selected analytics item");
  });
});

test('Navigating from class navigation', function(assert) {
  visit('/class/class-for-pochita-as-student');

  andThen(function() {
    assert.equal(currentURL(), '/class/class-for-pochita-as-student');

    const $overviewMenuItem = find(".navigation .class-menu .analytics");

    click($overviewMenuItem);
    andThen(function() {
      //making sure it goes to the teacher view
      assert.equal(currentURL(), '/class/class-for-pochita-as-student/analytics/performance/student');

    });
  });
});

test('When view by collection option is selected', function(assert) {
  visit('/class/class-for-pochita-as-student/analytics/performance/student');

  andThen(function() {
    assert.equal(currentURL(), '/class/class-for-pochita-as-student/analytics/performance/student');

    const $performanceContainer = find(".controller.class .controller.analytics-performance-student");
    const $collectionViewOption = $performanceContainer.find(".controls .gru-actions-bar .dropdown-menu .collection a");

    click($collectionViewOption);
    andThen(function() {
      assert.equal(currentURL(), '/class/class-for-pochita-as-student/analytics/performance/student?filterBy=collection');

    });
  });
});

test('When filtering by collection is  pre-selected', function(assert) {
  visit('/class/class-for-pochita-as-student/analytics/performance/student?filterBy=collection');

  andThen(function() {
    assert.equal(currentURL(), '/class/class-for-pochita-as-student/analytics/performance/student?filterBy=collection');

    const $performanceContainer = find(".controller.class .controller.analytics-performance-student");
    const $menu = $performanceContainer.find(".controls .gru-actions-bar .drop-menu");
    assert.equal(T.text($menu.find(".selected-filter .text")), 'View Collection', 'Wrong text selected');
  });
});

test('View Full Screen and Exit Full Screen', function(assert) {
  visit('/class/class-for-pochita-as-student/analytics/performance/student');

  andThen(function() {
    assert.equal(currentURL(), '/class/class-for-pochita-as-student/analytics/performance/student');

    const $performanceContainer = find(".controller.class .controller.analytics-performance-student");
    const $viewFullScreen = $performanceContainer.find(".student-actions .gru-actions-bar .full-screen");

    T.exists(assert, $performanceContainer.find(".student-actions .gru-actions-bar button.full-screen.view-full-screen"), "Button should be on view full screen mode");

    click($viewFullScreen); //enter full screen mode
    andThen(function() {
      T.exists(assert, $performanceContainer.find("div.navigation.hide"), "Navigation should be hide");
      const $navigation = find(".analytics-performance-student div.navigation.hide");

      T.exists(assert, $performanceContainer.find(".student-actions .gru-actions-bar button.full-screen.exit-full-screen"), "Button should be on exit full screen mode");
      T.exists(assert, $navigation, "Navigation Menu should be hidden");

      click($viewFullScreen); //exit full screen mode
      andThen(function() {
        T.exists(assert, $performanceContainer.find("div.navigation.show"), "Navigation should be show");
        const $navigation = find(".analytics-performance-student div.navigation.show");
        T.exists(assert, $performanceContainer.find(".student-actions .gru-actions-bar button.full-screen.view-full-screen"), "Button should be on view full screen mode");
        T.exists(assert, $navigation, "Navigation Menu should be visible");
      });
    });
  });
});

test('Exit Full Screen by pressing Esc', function(assert) {
  visit('/class/class-for-pochita-as-student/analytics/performance/student');

  andThen(function() {
    assert.equal(currentURL(), '/class/class-for-pochita-as-student/analytics/performance/student');

    const $performanceContainer = find(".controller.class .controller.analytics-performance-student");
    const $viewFullScreen = $performanceContainer.find(".student-actions .gru-actions-bar .full-screen");

    click($viewFullScreen); //enter full screen mode
    andThen(function() {
      T.exists(assert, $performanceContainer.find("div.navigation.hide"), "Navigation should be hide");
      var $navigation = find(".analytics-performance-student div.navigation.hide");

      T.exists(assert, $performanceContainer.find(".student-actions .gru-actions-bar button.full-screen.exit-full-screen"), "Button should be on exit full screen mode");
      T.exists(assert, $navigation, "Navigation Menu should be hidden");

      keyEvent($performanceContainer, 'keyup', KEY_CODES.ESCAPE); //exit full screen by pressing ESC
      andThen(function() {
        T.exists(assert, $performanceContainer.find("div.navigation.show"), "Navigation should be show");
        $navigation = find(".analytics-performance-student div.navigation.show");
        T.exists(assert, $performanceContainer.find(".student-actions .gru-actions-bar button.full-screen.view-full-screen"), "Button should be on view full screen mode");
        T.exists(assert, $navigation, "Navigation Menu should be show");
      });
    });
  });
});

test('Transition to a collection or assessment', function(assert) {
  visit('/class/class-for-pochita-as-student/analytics/performance/student');

  andThen(function() {
    assert.equal(currentURL(), '/class/class-for-pochita-as-student/analytics/performance/student');

    const $performanceContainer = find(".performance-content");
    T.exists(assert, $performanceContainer, "No performance container");

    const $firstUnitContainer = $performanceContainer.find("div.gru-unit-performance-container:nth-child(2)");
    T.exists(assert, $firstUnitContainer, "No first unit container");

    const $viewFirstUnitLessons = $firstUnitContainer.find("a");
    T.exists(assert, $viewFirstUnitLessons, "No unit anchor to display lessons");

    click($viewFirstUnitLessons);
    andThen(function() {
      assert.equal(currentURL(), '/class/class-for-pochita-as-student/analytics/performance/student?unitId=31886eac-f998-493c-aa42-016f53e9fa88');
      T.exists(assert, $firstUnitContainer.find(".in"), "Lessons container should be open");

      const $firstLessonContainer = $firstUnitContainer.find(".gru-lesson-performance-container:first-child");

      const $viewFirstLessonCollections = $firstLessonContainer.find(">a");

      click($viewFirstLessonCollections);
      andThen(function() {
        assert.equal(currentURL(), '/class/class-for-pochita-as-student/analytics/performance/student?lessonId=fbd76aed-1b8d-4c2c-a9c6-c7603eef347c&unitId=31886eac-f998-493c-aa42-016f53e9fa88');
        T.exists(assert, $firstLessonContainer.find(".in"), "Collections for the first lesson should be showing");

        const $viewCollectionInPlayer = $firstLessonContainer.find(" div.collections-container div:nth-child(2) button.collection-study-button");

        T.exists(assert, $viewCollectionInPlayer, "study button should show");

        click($viewCollectionInPlayer);

        andThen(function() {
          assert.equal(currentURL(), '/player/class/class-for-pochita-as-student/course/75366215-f9d5-424c-8a90-2cabdfeb3ffa/unit/31886eac-f998-493c-aa42-016f53e9fa88/lesson/fbd76aed-1b8d-4c2c-a9c6-c7603eef347c/collection/363d3cc2-f2ac-490d-a870-42167f204c97?resourceId=f86f874c-efc9-4100-9cf7-55eb86ec95ae');
        });
      });
    });
  });
});

test('Transition to a collection or assessment in the player on xsmall', function(assert) {
  visit('/class/class-for-pochita-as-student/analytics/performance/student?lessonId=27f0bc24-c2b5-40d8-bb8f-e6ec939ad553&unitId=31886eac-f998-493c-aa42-016f53e9fa88');

  andThen(function() {
    assert.equal(currentURL(), '/class/class-for-pochita-as-student/analytics/performance/student?lessonId=27f0bc24-c2b5-40d8-bb8f-e6ec939ad553&unitId=31886eac-f998-493c-aa42-016f53e9fa88');

    const $performanceContainer = find(".performance-content");
    T.exists(assert, $performanceContainer, "No performance container");

    const $studyAnchor = $performanceContainer.find("#fbd76aed-1b8d-4c2c-a9c6-c7603eef347c .collection-performance .collection-performance-content .gru-performance-summary li.title div button");
    T.exists(assert, $studyAnchor, "No anchor on completion column");

    click($studyAnchor);
    andThen(function() {
      assert.equal(currentURL(), '/player/class/class-for-pochita-as-student/course/75366215-f9d5-424c-8a90-2cabdfeb3ffa/unit/31886eac-f998-493c-aa42-016f53e9fa88/lesson/fbd76aed-1b8d-4c2c-a9c6-c7603eef347c/collection/363d3cc2-f2ac-490d-a870-42167f204c97?resourceId=f86f874c-efc9-4100-9cf7-55eb86ec95ae');
    });
  });
});

//it looks like something was changed with how the URL is managed.
test('Transition to a collection or assessment directly', function(assert) {
  visit('/class/class-for-pochita-as-student/analytics/performance/student?lessonId=fbd76aed-1b8d-4c2c-a9c6-c7603eef347c&unitId=31886eac-f998-493c-aa42-016f53e9fa88');

  andThen(function() {
    assert.equal(currentURL(), '/class/class-for-pochita-as-student/analytics/performance/student?lessonId=fbd76aed-1b8d-4c2c-a9c6-c7603eef347c&unitId=31886eac-f998-493c-aa42-016f53e9fa88');

    const $performanceContainer = find(".performance-content");
    T.exists(assert, $performanceContainer, "No performance container");

    const $firstUnitContainer = $performanceContainer.find("div.gru-unit-performance-container:first-child");
    T.exists(assert, $firstUnitContainer, "No first unit container");

    const $firstUnitLessonsContainer = $firstUnitContainer.find("div.lessons-container");
    T.exists(assert, $firstUnitLessonsContainer, "No first unit lessons container selected");
    assert.ok($firstUnitLessonsContainer.hasClass("in"), "Missing lesson container 'in' class.");

    const $firstLesson = $firstUnitLessonsContainer.find(".gru-lesson-performance-container:first-child");
    T.exists(assert, $firstLesson, "No first lesson container");

    const $firstLessonCollectionsContainer = $firstLesson.find("div.collections-container");
    T.exists(assert, $firstLessonCollectionsContainer, "No first lesson collections container");
    assert.ok($firstLessonCollectionsContainer.hasClass('in'), "Missing collection container 'in' class.");
  });
});

test('Transition to a closed unit when a unit with lessons is opened', function(assert) {
  visit('/class/class-for-pochita-as-student/analytics/performance/student?lessonId=2cd0cb03-91f6-4a8f-b799-2f04039e02c5&unitId=0619777a-45fa-4bfe-b800-40b2ab158c7a');

  andThen(function() {
    assert.equal(currentURL(), '/class/class-for-pochita-as-student/analytics/performance/student?lessonId=2cd0cb03-91f6-4a8f-b799-2f04039e02c5&unitId=0619777a-45fa-4bfe-b800-40b2ab158c7a');

    const $performanceContainer = find(".performance-content");
    T.exists(assert, $performanceContainer, "No performance container");

    const $secondUnitContainer = $performanceContainer.find("div.gru-unit-performance-container:nth-child(2)");
    T.exists(assert, $secondUnitContainer, "No second unit container");

    const $viewSecondUnitLessons = $secondUnitContainer.find("a");
    T.exists(assert, $viewSecondUnitLessons, "No unit anchor to display lessons");

    click($viewSecondUnitLessons);
    andThen(function() {
      assert.equal(currentURL(), '/class/class-for-pochita-as-student/analytics/performance/student?unitId=7deebd55-1976-40a2-8e46-3b8ec5b6d388');
    });
  });
});
