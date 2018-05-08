import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent(
  'class/learner/gru-learner-accordion-lesson',
  'Integration | Component | class/learner/gru learner accordion lesson',
  {
    integration: true
  }
);

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{class/learner/gru-learner-accordion-lesson}}`);

  assert.equal(
    this.$()
      .text()
      .trim(),
    ''
  );

  // Template block usage:
  this.render(hbs`
    {{#class/learner/gru-learner-accordion-lesson}}
      template block text
    {{/class/learner/gru-learner-accordion-lesson}}
  `);

  assert.equal(
    this.$()
      .text()
      .trim(),
    'template block text'
  );
});
