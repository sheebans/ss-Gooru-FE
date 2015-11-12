import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('player/gru-navigation', 'Integration | Component | player/gru navigation', {
  integration: true
});

test('it renders', function(assert) {

  // TODO: write tests

  assert.expect(0);
  //
  //// Set any properties with this.set('myProperty', 'value');
  //// Handle any actions with this.on('myAction', function(val) { ... });
  //
  this.render(hbs`{{player/gru-navigation}}`);
  //
  //assert.equal(this.$().text().trim(), '');
  //
  //// Template block usage:
  //this.render(hbs`
  //  {{#player/gru-navigation}}
  //    template block text
  //  {{/player/gru-navigation}}
  //`);
  //
  //assert.equal(this.$().text().trim(), 'template block text');
});
