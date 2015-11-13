import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('player/questions/gru-multiple-choice', 'Integration | Component | player/questions/gru multiple choice', {
  integration: true
});

test('it renders', function(assert) {

  // TODO: write tests

  assert.expect(0);
  //
  //// Set any properties with this.set('myProperty', 'value');
  //// Handle any actions with this.on('myAction', function(val) { ... });
  //
  this.render(hbs`{{player/questions/gru-multiple-choice}}`);
  //
  //assert.equal(this.$().text().trim(), '');
  //
  //// Template block usage:
  //this.render(hbs`
  //  {{#player/questions/gru-multiple-choice}}
  //    template block text
  //  {{/player/questions/gru-multiple-choice}}
  //`);
  //
  //assert.equal(this.$().text().trim(), 'template block text');
});
