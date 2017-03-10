import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | student performance', {
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
  visit('/student/performance');

  andThen(function() {
    assert.equal(currentURL(), '/student/performance');

    const $performanceContainer = find('.student.performance');
    T.exists(assert, $performanceContainer, 'Missing performance container');

    const $header = $performanceContainer.find('.panel-header');
    T.exists(assert, $header, 'Missing performance header');
    T.exists(assert, $header.find('h1'), 'Missing title');
    T.exists(assert, $header.find('button.download'), 'Missing download button');
    T.exists(assert, $header.find('p'), 'Missing primary text');

    const $filters = $performanceContainer.find('.filters');
    T.exists(assert, $filters, 'Missing filters');
    T.exists(assert, $filters.find('.grading-scale-legend'), 'Missing grading-scale-legend component');
    T.exists(assert, $filters.find('.radios-container'), 'Missing radio buttons container');
    assert.equal($filters.find('.radios-container .gru-radio').length, 2, 'Wrong number of radio buttons');
    T.exists(assert, $performanceContainer.find('.gru-performance-table'), 'Missing gru-performance-table component');

  });
});
