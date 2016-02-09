import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | Class Assessment Report', {
  beforeEach: function () {
    authenticateSession(this.application, {
      isAnonymous: true,
      token: 'player-token',
      user: {
        gooruUId: 'player-token-user-id'
      }
    });
  }
});

test('Question Detail modal test', function(assert) {

  visit('/framework/class-assessment');
  andThen(function() {

    assert.equal(currentURL(), '/framework/class-assessment');

    var $xBarChart = find('.gru-questions-summary ol li:nth-child(1) a');

    click($xBarChart);

    andThen(function() {

      const $modal =  find(".gru-modal.gru-questions-detail-modal");

      assert.ok($modal.find('gru-questions-detail'), "Modal should be visible");

      var $closeButton = find('.gru-questions-detail .modal-header button');

      click($closeButton);

      andThen(function() {
        T.notExists(assert, $modal.find('gru-questions-detail'), "Modal should not be visible");

        var $questionHeader = find('.gru-two-tier-header-table .first-tier th:nth-child(2)');
        click($questionHeader);
        andThen(function() {
          assert.ok($modal.find('gru-questions-detail'), "Modal should be visible");
          click($closeButton);
          andThen(function() {
            T.notExists(assert, $modal.find('gru-questions-detail'), "Modal should not be visible");
            var $viewButton = find(".gru-view-layout-picker .thumbnails");
            click($viewButton);
            andThen(function() {
              var $studentPerformanceBox = find(".gru-student-performance-box .questions span:nth-child(1)");
              click($studentPerformanceBox);
              andThen(function() {
                assert.ok($modal.find('gru-questions-detail'), "Modal should be visible");
                click($closeButton);
              });
            });
          });
        });
      });
    });
  });
});
