import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';

moduleForComponent('app-footer', 'Integration | Component | app footer', {
  // needs: ['component:foo', 'helper:bar']
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('footer layout', function(assert) {
  assert.expect(1); //making sure all asserts are called

  this.render(hbs`{{app-footer}}`); //render the component
  var $component = this.$(); //component dom element

  T.exists(assert, $component.find("footer.app-footer"), "Footer root element not found");
});
