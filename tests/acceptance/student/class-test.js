import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | student class', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'student-token',
      user: {
        gooruUId: 'id-for-pochita'
      }
    });
  }
});

test('Layout', function(assert) {
  visit('/student/class/class-for-pochita-as-student');

  andThen(function() {
    assert.equal(currentURL(), '/student/class/class-for-pochita-as-student');

    const $classContainer = find('.student.class');
    T.exists(assert, $classContainer, 'Missing class container');

    const $classHeader = $classContainer.find('.header');
    T.exists(assert, $classHeader, 'Missing class header');
    T.exists(assert, $classHeader.find('h1'), 'Missing class title');
    assert.equal(T.text($classHeader.find('h1')), 'Pochita As Student - With Course', 'Incorrect class title text');
    T.exists(assert, $classHeader.find('.code'), 'Missing class code');
    assert.equal(T.text($classHeader.find('.code')), 'I4BYYQZ', 'Incorrect class code text');
    const $headerBoxes = $classHeader.find('.boxes');
    assert.equal($headerBoxes.find('> .box').length, 3, 'Number of header boxes');
    T.exists(assert, $headerBoxes.find('> .box.completed'), 'Missing completed box');
    T.exists(assert, $headerBoxes.find('> .box.performance'), 'Missing performance box');
    T.exists(assert, $headerBoxes.find('> .box.performance .gru-bubble-chart'), 'Missing performance gru-bubble-chart component');
    T.exists(assert, $headerBoxes.find('> .box.performance .legend'), 'Missing performance legend');
    T.exists(assert, $headerBoxes.find('> .box.improvement'), 'Missing improvement box');
    T.exists(assert, $classContainer.find('> .class-navigator'), 'Missing class navigator');
    assert.equal($classContainer.find('> .class-navigator .nav a').length, 4, 'Number of class navigator links');
    T.exists(assert, $classContainer.find('> .class-navigator .nav .activity-list'), 'Missing activity list link');
    T.exists(assert, $classContainer.find('> .class-navigator .nav .performance'), 'Missing performance link');
    T.exists(assert, $classContainer.find('> .class-navigator .nav .classmates'), 'Missing classmates link');
    T.exists(assert, $classContainer.find('> .class-navigator .nav .content-map'), 'Missing content map link');
    T.exists(assert, $classContainer.find('> .content'), 'Missing class content');
  });
});
