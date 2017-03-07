import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('qz-modal', 'Integration | Component | qz modal', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set('locale','en');
  }
});

test('it renders', function(assert) {

  this.render(hbs`{{qz-modal}}`);

  var $component = this.$(); //component dom element
  var $rootElement = $component.find('.qz-modal');
  assert.ok($rootElement, 'Root element not found');
  assert.ok($rootElement.hasClass('modal'), 'Component should have class to identify it as a modal');

});
