import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent(
  'reports/pull-up/open-ended-summary-pull-up',
  'Integration | Component | reports/pull up/open ended summary pull up',
  {
    integration: true
  }
);

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{reports/pull-up/open-ended-summary-pull-up}}`);

  assert.equal(
    this.$()
      .text()
      .trim(),
    ''
  );

  // Template block usage:
  this.render(hbs`
    {{#reports/pull-up/open-ended-summary-pull-up}}
      template block text
    {{/reports/pull-up/open-ended-summary-pull-up}}
  `);

  assert.equal(
    this.$()
      .text()
      .trim(),
    'template block text'
  );
});
