import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | reports/study-student-collection', {
  beforeEach: function () {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'player-token',
      user: {
        gooruUId: 'player-token-user-id'
      }
    });
  }
});

test('Layout', function (assert) {
  assert.expect(3);
  visit('/reports/study-student-collection?classId=just-a-class&collectionId=all-question-types-assessment-id&role=student&type=assessment');

  let done = assert.async();
  andThen(function () {
    assert.equal(currentURL(), '/reports/study-student-collection?classId=just-a-class&collectionId=all-question-types-assessment-id&role=student&type=assessment');

    const $playerHeader = find('.gru-study-header');
    T.exists(assert, $playerHeader, 'Missing study player header');

    const $reportContainer = find('.reports.qz-student-report');
    T.exists(assert, $reportContainer, 'Missing quizzes reports component');
    done();
  });
});
