import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | student/class/classmates', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'class-classmates-token',
      user: {
        gooruUId: 'id-for-pochita'
      }
    });
  }
});

test('Student Layout', function(assert) {
  visit('/student/class/class-for-pochita-as-student/classmates');

  andThen(function() {
    assert.equal(currentURL(), '/student/class/class-for-pochita-as-student/classmates');

    const $classmatesContainer = find(".student.class .controller.classmates");
    T.exists(assert, $classmatesContainer, "Missing overview container");

    const $teachers =$classmatesContainer.find(".teachers-section");
    T.exists(assert, $teachers.find("h5"), "Missing teachers section");
    T.exists(assert, $teachers.find(".teachers"), "Missing teachers list");
    T.exists(assert, $teachers.find("li.profile-card"), "Missing profile cards for teachers");

    const $students =$classmatesContainer.find(".students-section");
    T.exists(assert, $students.find("h5"), "Missing students section");
    T.exists(assert, $students.find(".students"), "Missing students list");
    T.exists(assert, $students.find("li.profile-card"), "Missing profile cards for students");
  });
});
