import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent(
  'grading/gru-rubric-panel',
  'Integration | Component | grading/gru rubric panel',
  {
    integration: true
  }
);

test('Show full rubric', function(assert) {
  this.set('showFullRubric', false);
  this.render(hbs`{{grading/gru-rubric-panel showFullRubric=showFullRubric}}`);

  let $component = this.$();
  let $panel = $component.find('.gru-rubric-panel');
  let $header = $component.find('.rubric-information .header');

  assert.notOk(this.get('showFullRubric'), 'Wrong value of showFullRubric');
  assert.notOk(
    $panel.hasClass('full-rubric'),
    'The component must not have the class full-rubric'
  );
  $header.click();
  assert.ok(this.get('showFullRubric'), 'Wrong value of showFullRubric');
  assert.ok(
    $panel.hasClass('full-rubric'),
    'The component must have the class full-rubric'
  );
});
