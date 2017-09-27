import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | class/analytics/performance/teacher/lesson', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'class-analytics-performance-teacher-lesson-token',
      user: {
        /* using a pochita, @see classes/class-for-pochita-as-teacher-200-response.js */
        gooruUId: 'id-for-pochita'
      }
    });
  }
});
