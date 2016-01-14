import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';

moduleForComponent('charts/gru-pie-chart', 'Integration | Component | charts/gru pie chart', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('Pie Chart Layout', function(assert) {
  assert.expect(2);

  const width =100;
  this.set('width', width);

  const height =100;
  this.set('height', height);

  const pie =[{
    color: "#00e100",
    value: "20"
  },{
    color: "#ff5a5a",
    value: "35"
  },
    {
      color: "#885aff",
      value: "20"
    },{
      color: "#ff860a",
      value: "30"
    }];
  this.set('pie', pie);

  this.render(hbs`{{charts/gru-pie-chart pie=pie width=width height=height}}`);
  const $component = this.$(); //component dom element
  const $pieChart = $component.find(".gru-pie-chart");

  T.exists(assert, $pieChart, 'Missing pie chart component');
  T.exists(assert, $pieChart.find('.chart'), 'Missing pie chart');

});
