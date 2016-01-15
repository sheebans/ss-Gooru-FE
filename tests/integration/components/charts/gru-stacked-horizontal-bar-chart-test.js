import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';
import Ember from 'ember';

moduleForComponent('charts/gru-stacked-horizontal-bar-chart', 'Integration | Component | charts/gru stacked horizontal bar chart', {
  integration: true
});

test('Stacked horizontal bar chart layout', function(assert) {
  assert.expect(3);

  var data= Ember.A([Ember.Object.create({
    color: "#00e100",
    percentage: "20"
  }),Ember.Object.create({
    color: "#ff5a5a",
    percentage: "35"
  })]);

  this.set('data', data);
  this.render(hbs`{{charts/gru-stacked-horizontal-bar-chart data=data}}`);
  const $component = this.$(); //component dom element
  const $horizontalBarChart = $component.find(".gru-stacked-horizontal-bar-chart");

  T.exists(assert, $horizontalBarChart, 'Missing stacked horizontal bar chart component');
  assert.equal($horizontalBarChart.find('.segment:nth-child(1)').attr("style"),"background-color: "+data[0].color+";width: "+data[0].percentage+"%;", "Incorrect width and color for the first segment");
  assert.equal($horizontalBarChart.find('.segment:nth-child(2)').attr("style"),"background-color: "+data[1].color+";width: "+data[1].percentage+"%;", "Incorrect width and color for the second segment");
});
