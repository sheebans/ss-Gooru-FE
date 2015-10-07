import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';

moduleForComponent('sign-up-form', 'Integration | Component | sign up form', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{sign-up-form}}`);
  var $component = this.$(); //component dom element

  T.exists(assert, $component.find("div.sign-up-form"), "Root element not found");
});
