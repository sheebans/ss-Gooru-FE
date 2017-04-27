import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | teacher/class/class-management', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'teacher-token',
      user: {
        gooruUId: 'id-for-pochita'
      }
    });
  }
});

test('Layout', function (assert) {
  visit('/teacher/class/class-for-pochita-as-teacher/class-management');
  andThen(function() {

    assert.equal(currentURL(), '/teacher/class/class-for-pochita-as-teacher/class-management');

    const $container = find(".teacher.class .controller.teacher.class.class-management");
    assert.ok($container.length, 'Missing class management tab container');

    assert.ok($container.find('.class-panel').length, 'Missing class panel');
    assert.ok($container.find('.course-panel').length, 'Missing course panel');

    const $classPanel = $container.find('.class-panel');
    const $classPanelHeader = $classPanel.find(".panel-header");

    assert.ok($classPanelHeader.find('h5').length, 'Missing class information title');
    assert.ok($classPanelHeader.find('.actions').length, 'Missing class actions panel');
    assert.ok($classPanelHeader.find('.actions .delete-btn').length, 'Missing delete btn');
    assert.ok($classPanelHeader.find('.actions .archive-btn').length, 'Missing archive btn');

    const $classPanelBody = $classPanel.find(".panel-body");
    assert.ok($classPanelBody.find('.class-name p').length, 'Missing class name label');
    assert.ok($classPanelBody.find('.class-name .edit-text span').length, 'Missing class title to edit');
    assert.ok($classPanelBody.find('.class-name .edit-text i').length, 'Missing class title edit icon');

    assert.ok($classPanelBody.find('.class-code p').length, 'Missing class code label');
    assert.ok($classPanelBody.find('.class-code .gru-copy-value').length, 'Missing class code copy component');
    assert.ok($classPanelBody.find('.class-code .gru-switch').length, 'Missing attend class switch component');

    const $coursePanel = $container.find('.course-panel');
    const $coursePanelHeader = $coursePanel.find(".panel-header");

    assert.ok(coursePanelHeader.find('h5').length, 'Missing course information title');

    const $coursePanelBody = $coursePanel.find(".panel-body");
    assert.ok($coursePanelBody.find('.course-information p').length, 'Missing course information label');
    assert.ok($coursePanelBody.find('.course-information .gru-course-card.small').length, 'Missing small course card');
    assert.ok($coursePanelBody.find('.assessment-min-score p').length, 'Missing course assessment-min-score label');
    assert.ok($coursePanelBody.find('.assessment-min-score .edit-text span').length, 'Missing assessment min score to edit');
    assert.ok($coursePanelBody.find('.assessment-min-score .edit-text i').length, 'Missing assessment min score edit icon');

    const $studentsPanel = $container.find('.students-panel');
    assert.ok($studentsPanel.find('.panel-heading').length, 'Missing student panel heading');
    assert.equal($studentsPanel.find('.panel-heading div[class*="col-"]').length, 5, 'The student panel must have 5 columns');
    assert.ok($studentsPanel.find('.panel-body').length, 'Missing student panel body');
    assert.equal($studentsPanel.find('.panel-body .row').length, 7, 'The students panel must have 7 students');
  });
});
