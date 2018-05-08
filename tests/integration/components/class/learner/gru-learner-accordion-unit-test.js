import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent(
  'class/learner/gru-learner-accordion-unit',
  'Integration | Component | class/learner/gru learner accordion unit',
  {
    integration: true
  }
);

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{class/learner/gru-learner-accordion-unit}}`);

  assert.equal(
    this.$()
      .text()
      .trim(),
    ''
  );

  // Template block usage:
  this.render(hbs`
    {{#class/learner/gru-learner-accordion-unit}}
      template block text
    {{/class/learner/gru-learner-accordion-unit}}
  `);

  assert.equal(
    this.$()
      .text()
      .trim(),
    'template block text'
  );
});
