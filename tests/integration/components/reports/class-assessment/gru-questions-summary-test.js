import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { GRADING_SCALE } from 'gooru-web/config/config';

moduleForComponent('reports/class-assessment/gru-questions-summary', 'Integration | Component | reports/class assessment/gru questions summary', {
  integration: true
});

test('it renders all charts', function (assert) {

  var questionsData = [
    {
      id: 1,
      correct: 3,
      incorrect: 4,
      total: 12
    },
    {
      id: 2,
      correct: 6,
      incorrect: 2,
      total: 12
    },
    {
      id: 3,
      correct: 4,
      incorrect: 5,
      total: 12
    }
  ];

  this.set('questionsData', questionsData);

  this.render(hbs`{{reports/class-assessment/gru-questions-summary data=questionsData}}`);

  const $component = this.$('.reports.class-assessment.gru-questions-summary');
  assert.ok($component.length, 'Component has component classes');
  assert.equal($component.find('ol li').length, 3, 'Component shows all charts');
  assert.ok(!$component.find('> a').length, 'Button to view more charts is not visible');

});

test('\'view more\' button works when only some of the charts are visible', function (assert) {

  var questionsData = [
    {
      id: 1,
      correct: 3,
      incorrect: 4,
      total: 12
    },
    {
      id: 2,
      correct: 6,
      incorrect: 2,
      total: 12
    },
    {
      id: 3,
      correct: 4,
      incorrect: 5,
      total: 12
    }
  ];

  this.set('questionsData', questionsData);

  // The minimum width of the items will be that of the container which means that
  // only one column will be shown
  this.set('itemMinWidth', $('#ember-testing').css('width').split('px')[0]);

  // Show 2 items per column
  this.set('numItems', 2);

  this.render(hbs`{{reports/class-assessment/gru-questions-summary
    data=questionsData
    itemsPerColumn=numItems
    itemMinWidth=itemMinWidth }}`);

  const $component = this.$('.reports.class-assessment.gru-questions-summary');
  assert.equal($component.find('ol li').length, 2, 'Component shows the correct number of items');

  const $viewMoreButton = $component.find('> a');
  assert.ok($viewMoreButton.length, 'Button to view more charts is visible');
  assert.ok($viewMoreButton.hasClass('expand'), 'Button has the class to expand');

  $viewMoreButton.click();
  assert.equal($component.find('ol li').length, 3, 'Component shows all columns');
  assert.ok($viewMoreButton.hasClass('collapse'), 'Button has the class to collapse');

  // Clicking on the button again, restores to the original state
  $viewMoreButton.click();
  assert.equal($component.find('ol li').length, 2, 'Component correctly reduces the number of items visible');
  assert.ok($viewMoreButton.hasClass('expand'), 'Button has the class to expand again');
});

test('it renders the charts correctly', function (assert) {

  var questionsData = [
    {
      id: 1,
      correct: 5,
      incorrect: 5,
      total: 10
    },
    {
      id: 2,
      correct: 6,
      incorrect: 3,
      total: 10
    }
  ];

  this.set('questionsData', questionsData);

  this.render(hbs`{{reports/class-assessment/gru-questions-summary data=questionsData}}`);

  const $component = this.$('.reports.class-assessment.gru-questions-summary');

  const $lastItem = $component.find('li:last');
  assert.equal($lastItem.find('.index').text(), '2', 'Last item has the right index number');

  const $incorrectBar = $lastItem.find('.gru-x-bar-chart .segment:first');
  assert.ok($incorrectBar.attr('style').split(';')[0].indexOf(GRADING_SCALE[0].COLOR) > 0, 'The incorrect segment in the chart has the fail color per the grading scale');
  assert.ok($incorrectBar.attr('style').split(';')[1].indexOf('30%') > 0, 'The incorrect segment in the chart shows the right percentage');

  const $correctBar = $lastItem.find('.gru-x-bar-chart .segment:last');
  assert.ok($correctBar.attr('style').split(';')[0].indexOf(GRADING_SCALE[GRADING_SCALE.length - 1].COLOR) > 0, 'The correct segment in the chart has the correct color per the grading scale');
  assert.ok($correctBar.attr('style').split(';')[1].indexOf('60%') > 0, 'The correct segment in the chart shows the right percentage');

  const $ratio = $lastItem.find('.ratio');
  assert.equal($ratio.find('em:first').text(), '9', 'Wrong number of students that have completed the question');
  assert.equal($ratio.find('em:last').text(), '10', 'Wrong number of total students');
});
