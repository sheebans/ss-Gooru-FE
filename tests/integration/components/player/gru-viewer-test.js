import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('player/gru-viewer', 'Integration | Component | player/gru viewer', {
  integration: true
});

test('it renders', function(assert) {

  // TODO: write tests

  assert.expect(0);
  //
  //// Set any properties with this.set('myProperty', 'value');
  //// Handle any actions with this.on('myAction', function(val) { ... });
  //
  this.render(hbs`{{player/gru-viewer}}`);
  //
  //assert.equal(this.$().text().trim(), '');
  //
  //// Template block usage:
  //this.render(hbs`
  //  {{#player/gru-viewer}}
  //    template block text
  //  {{/player/gru-viewer}}
  //`);
  //
  //assert.equal(this.$().text().trim(), 'template block text');
});
