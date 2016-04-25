import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | class/info', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'class-info-token',
      user: {
        gooruUId: 'pochita'
      }
    });
  }
});

test('Student Layout', function(assert) {
  visit('/class/class-for-pochita-as-student/info');

  andThen(function() {
    assert.equal(currentURL(), '/class/class-for-pochita-as-student/info');

    const $overviewContainer = find(".controller.class .controller.info");
    T.exists(assert, $overviewContainer, "Missing overview container");

    // TODO Remove comment when Subject is supported
    //const $subject =$overviewContainer.find(".subject");
    //T.exists(assert, $subject, "Missing Subject Title");
    //assert.equal(T.text($subject), "Subject: Math", "Incorrect subject");

    // TODO Remove comment when Grade is supported
    //const $grade =$overviewContainer.find(".grade");
    //T.exists(assert, $grade, "Missing Grade Title");
    //assert.equal(T.text($grade), "Grade: K,6,6,7,7,8,8", "Incorrect grade");

    const $descriptionTitle =$overviewContainer.find(".description-legend");
    T.exists(assert, $descriptionTitle, "Missing Description Title");
    assert.equal(T.text($descriptionTitle), "Description", "Incorrect Description");

    const $classCode =$overviewContainer.find(".code");
    T.exists(assert, $classCode, "Missing Class Code Box");
    assert.equal(T.text($classCode.find(".class-code")), "I4BYYQZ", "Incorrect Class Code");

    const $teachers =$overviewContainer.find(".teachers-section");
    T.exists(assert, $teachers.find("h5"), "Missing teachers section");
    T.exists(assert, $teachers.find(".teachers"), "Missing teachers list");
    T.exists(assert, $teachers.find("li.profile-card"), "Missing profile cards for teachers");
    T.exists(assert, $teachers.find("div.invite-collaborator.hide"), "Invite Collaborator button should be hidden");

    const $students =$overviewContainer.find(".students-section");
    T.exists(assert, $students.find("h5"), "Missing students section");
    T.exists(assert, $students.find(".students"), "Missing students list");
    T.exists(assert, $students.find("li.profile-card"), "Missing profile cards for students");
    T.exists(assert, $students.find("div.invite-student.hide"), "Invite Student button should be hidden");

    const $infoButtons =$overviewContainer.find(".info-btns");
    T.exists(assert, $infoButtons.find("div.edit-share-section.hide"), "Edit and Share buttons should be hidden");

  });
});
test('Teacher Layout', function(assert) {
  visit('/class/class-for-pochita-as-teacher/info');

  andThen(function() {
    assert.equal(currentURL(), '/class/class-for-pochita-as-teacher/info');

    const $overviewContainer = find(".controller.class .controller.info");
    T.exists(assert, $overviewContainer, "Missing overview container");

    const $teachers =$overviewContainer.find(".teachers-section");
    T.exists(assert, $teachers.find("div.invite-collaborator.show"), "Should be visible");
    T.exists(assert, $teachers.find("div.invite-collaborator.show button"), "Missing invite collaborator button");

    const $students =$overviewContainer.find(".students-section");
    T.exists(assert, $students.find("div.invite-student.show"), "Should be visible");
    T.exists(assert, $students.find("div.invite-student.show button"), "Missing invite student button");

    const $infoButtons =$overviewContainer.find(".info-btns");
    T.exists(assert, $infoButtons.find("div.edit-share-section.show"), "Edit and Share buttons should be visible");
    T.exists(assert, $infoButtons.find(".edit-btn"), "Missing Edit Button");
    T.exists(assert, $infoButtons.find(".share-btn"), "Missing Share Button");
  });
});
