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

    const $performanceFilterPanel = $performanceContainer.find('.filter-panel');
    T.exists(assert, $performanceFilterPanel, 'Missing performance filter panel');

    const $performanceFilterPanelHeader = $performanceFilterPanel.find('.header');
    T.exists(assert, $performanceFilterPanelHeader, 'Missing filter header');
    T.exists(assert, $performanceFilterPanelHeader.find('.title'), 'Missing filter header title');
    assert.equal(T.text($performanceFilterPanel.find('.title')), 'Filter', "Wrong header title text");

    const $performanceFilterPanelBody = $performanceFilterPanel.find('.body');
    T.exists(assert, $performanceFilterPanelBody, 'Missing filter body');

    T.exists(assert, $performanceFilterPanelBody.find('.filter-buttons'), 'Missing filter buttons');
    T.exists(assert, $performanceFilterPanelBody.find('.filter-buttons .course'), 'Missing course button');

    const $filterType = $performanceFilterPanelBody.find('.filter-type');
    assert.equal($filterType.length, 3, "Incorrect number of filter Types");

    const $contenPanel = $performanceFilterPanelBody.find('.content-panel');
    assert.equal($contenPanel.length, 3, "Incorrect number of content Panels");

    const $courseContentPanel = $performanceFilterPanelBody.find('.content-panel.course');
    assert.ok($courseContentPanel.hasClass("visible"), "Course content panel is visible by default");

    T.exists(assert, $performanceFilterPanelBody.find('.actions'), 'Missing action buttons');
    T.exists(assert, $performanceFilterPanelBody.find('.update-report'), 'Missing update report button');

    const $performanceContent = $performanceContainer.find('.performance-content ');
    T.exists(assert, $performanceContent, 'Missing performance content');

    const $header = $performanceContent.find('.panel-header');
    T.exists(assert, $header, 'Missing performance header');
    T.exists(assert, $header.find('h1'), 'Missing title');
    T.exists(assert, $header.find('button.download'), 'Missing download button');
    T.exists(assert, $header.find('p'), 'Missing primary text');

    const $filters = $performanceContent.find('.filters');
    T.exists(assert, $filters, 'Missing filters');
    T.exists(assert, $filters.find('.grading-scale-legend'), 'Missing grading-scale-legend component');
    T.exists(assert, $filters.find('.radios-container'), 'Missing radio buttons container');
    assert.equal($filters.find('.radios-container input[type=radio]').length, 2, 'Missing assessment/collection filter radio buttons');
    T.exists(assert, $performanceContent.find('.gru-performance-table'), 'Missing gru-performance-table component');
  });
});

test('Expand/Collapse filter content panel', function(assert) {
  visit('/student/performance');

  andThen(function() {
    assert.equal(currentURL(), '/student/performance');

    const $performanceFilterPanel = find('.student.performance .filter-panel');

    const $courseFilterTypeArrow = $performanceFilterPanel.find('.filter-type.course .arrow');

    const $courseContentPanel = $performanceFilterPanel.find('.content-panel.course');
    assert.ok($courseContentPanel.hasClass("visible"), "Course content panel is visible by default");

    click($courseFilterTypeArrow);
    andThen(function(){
      assert.ok($courseContentPanel.hasClass("hidden"), "Course content panel is hidden");
      click($courseFilterTypeArrow);
      andThen(function(){
        assert.ok($courseContentPanel.hasClass("visible"), "Course content panel is visible");
      });
    });
  });
});
