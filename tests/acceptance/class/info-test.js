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
        gooruUId: 'class-info-token-user-id'
      }
    });
  }
});

test('Student Layout', function(assert) {
  visit('/class/11111-5d0d-4673-a85d-f93aa0cbddf2/info');

  andThen(function() {
    assert.equal(currentURL(), '/class/11111-5d0d-4673-a85d-f93aa0cbddf2/info');

    const $overviewContainer = find(".controller.class .controller.info");
    T.exists(assert, $overviewContainer, "Missing overview container");

    const $subject =$overviewContainer.find(".subject");
    T.exists(assert, $subject.find("p.title"), "Missing Subject Title");
    assert.equal(T.text($subject.find("p")), "Subject:Math", "Incorrect subject");

    const $grade =$overviewContainer.find(".grade");
    T.exists(assert, $grade.find("p.title"), "Missing Grade Title");
    assert.equal(T.text($grade.find("p")), "Grade:K", "Incorrect grade");

    const $description =$overviewContainer.find(".description");
    T.exists(assert, $description.find("span.title"), "Missing Description Title");
    assert.equal(T.text($description.find("span.title")), "Description:", "Incorrect Description");

    const $classCode =$overviewContainer.find(".code");
    T.exists(assert, $classCode, "Missing Class Code Box");
    assert.equal(T.text($classCode.find("p")), "2WZ8IJA", "Incorrect Class Code");

    const $teachers =$overviewContainer.find(".teachers-section");
    T.exists(assert, $teachers.find("h3"), "Missing teachers section");
    T.exists(assert, $teachers.find(".teachers"), "Missing teachers list");
    T.exists(assert, $teachers.find("li.profile-card"), "Missing profile cards for teachers");

    const $students =$overviewContainer.find(".students-section");
    T.exists(assert, $students.find("h3"), "Missing students section");
    T.exists(assert, $students.find(".students"), "Missing students list");
    T.exists(assert, $students.find("li.profile-card"), "Missing profile cards for students");

  });
});
