import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import T from 'gooru-web/tests/helpers/assert';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | index', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: true,
      token: 'token-value'
    });
  }
});

test('load: Layout', function(assert) {
  visit('/');

  andThen(function() {
    assert.expect(48); //making sure all asserts are called

    assert.equal(currentURL(), '/');

    //hero
    var $hero = find('.hero');
    T.exists(assert, $hero, "Missing hero section");
    T.exists(assert, $hero.find("h1"), "Missing hero title");

    var $browseContent = find('.browse-content');
    T.exists(assert, $browseContent, "Missing browse content section");
    T.exists(assert, $browseContent.find('.title'), "Missing browse content title");

    var $browseContentDropdowns =find('.browse-content-dropdowns');
    T.exists(assert, $browseContentDropdowns.find('.lookingFor'), "Missing I am looking for text");
    T.exists(assert, $browseContentDropdowns.find('.grade'), "Missing grade dropdown");
    T.exists(assert, $browseContentDropdowns.find('.learningMaterials'), "Missing learning materials in text");
    T.exists(assert, $browseContentDropdowns.find('.subject'), "Missing subject dropdown");
    T.exists(assert, $browseContentDropdowns.find('.or'), "Missing or text");
    T.exists(assert, $browseContentDropdowns.find('.browse-content-button'), "Missing browse content button");
    T.exists(assert, $browseContentDropdowns.find('.standard'), "Missing standard dropdown");

    var $browseContentFooter = find('.browse-content-footer');
    T.exists(assert, $browseContentFooter, "Missing footer section");
    T.exists(assert, $browseContentFooter.find("p"), "Missing footer contect");


    var $gettingStarted = find('.getting-started-content');
    T.exists(assert, $gettingStarted, "Missing getting started section");
    T.exists(assert, $gettingStarted.find("h2"), "Missing getting started title");

    var $toolkit =find('.toolkit');
    T.exists(assert, $toolkit, "Missing getting started toolkit section");
    T.exists(assert, $toolkit.find("a"), "Missing getting started toolkit link");
    T.exists(assert, $toolkit.find("p"), "Missing getting started toolkit description");

    var $classroom =find('.classroom');
    T.exists(assert, $classroom, "Missing Stories from the Classroom section");
    T.exists(assert, $classroom.find("a"), "Missing Stories from the Classroom link");
    T.exists(assert, $classroom.find("p"), "Missing Stories from the Classroom description");

    var $events =find('.events');
    T.exists(assert, $events, "Missing Check Out our Events section");
    T.exists(assert, $events.find("a"), "Missing Check Out our Events link");
    T.exists(assert, $events.find("p"), "Missing Check Out our Events description");

    var $eventsIcon =find('.events-icon');
    T.exists(assert, $eventsIcon, "Missing Events Icon");

    var $empowerStudents  = find('.empowerStudents');
    T.exists(assert, $empowerStudents, "Missing empower students section");
    T.exists(assert, $empowerStudents.find("h3"), "Missing empower students title");

    var $empowerStudentsFind  = find('.find');
    T.exists(assert, $empowerStudentsFind, "Missing empower students find section");
    T.exists(assert, $empowerStudentsFind.find("h3"), "Missing empower students find title");
    T.exists(assert, $empowerStudentsFind.find('.findImg'), "Missing empower students find image");
    T.exists(assert, $empowerStudentsFind.find("p"), "Missing empower students find description");

    var $empowerStudentsRemix  = find('.remix');
    T.exists(assert, $empowerStudentsRemix, "Missing empower students remix section");
    T.exists(assert, $empowerStudentsRemix.find("h3"), "Missing empower students remix title");
    T.exists(assert, $empowerStudentsRemix.find('.remixImg'), "Missing empower students remix image");
    T.exists(assert, $empowerStudentsRemix.find("p"), "Missing empower students remix description");

    var $empowerStudentsShare  = find('.share');
    T.exists(assert, $empowerStudentsShare, "Missing empower students share section");
    T.exists(assert, $empowerStudentsShare.find("h3"), "Missing empower students share title");
    T.exists(assert, $empowerStudentsShare.find('.shareImg'), "Missing empower students share image");
    T.exists(assert, $empowerStudentsShare.find("p"), "Missing empower students share description");

    var $empowerStudentsMonitor  = find('.monitor');
    T.exists(assert, $empowerStudentsMonitor, "Missing empower students monitor section");
    T.exists(assert, $empowerStudentsMonitor.find("h3"), "Missing empower students monitor title");
    T.exists(assert, $empowerStudentsMonitor.find('.monitorImg'), "Missing empower students monitor image");
    T.exists(assert, $empowerStudentsMonitor.find("p"), "Missing empower students monitor description");

    var $freeAndOpen = find('.free_and_open');
    T.exists(assert, $freeAndOpen, "Missing free and open section");
    T.exists(assert, $freeAndOpen.find("h1"), "Missing free and open  title");
    T.exists(assert,$freeAndOpen.find('.free_and_open_descrip'),"Missing free and open description");
    T.exists(assert,$freeAndOpen.find('.free_and_open_button button'),"Missing free and open button");

  });
});
