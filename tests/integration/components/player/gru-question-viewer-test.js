import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('player/gru-question-viewer', 'Integration | Component | player/gru question viewer', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }

});

test('it renders', function(assert) {

  // TODO: write tests

  assert.expect(0);
  //
  //// Set any properties with this.set('myProperty', 'value');
  //// Handle any actions with this.on('myAction', function(val) { ... });
  //
  this.render(hbs`{{player/gru-question-viewer}}`);
  //
  //assert.equal(this.$().text().trim(), '');
  //
  //// Template block usage:
  //this.render(hbs`
  //  {{#player/gru-question-viewer}}
  //    template block text
  //  {{/player/gru-question-viewer}}
  //`);
  //
  //assert.equal(this.$().text().trim(), 'template block text');
});
