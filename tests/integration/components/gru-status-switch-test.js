import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

moduleForComponent(
  'gru-status-switch',
  'Integration | Component | gru status switch',
  {
    integration: true,
    beforeEach: function() {
      this.container.lookup('service:i18n').set('locale', 'en');
    }
  }
);

test('Switch', function(assert) {
  assert.expect(3);

  this.render(hbs`{{gru-status-switch  onOptionSwitch='parentAction'}}`);

  const $component = this.$(); //component dom element
  const $switchComponent = $component.find('.gru-status-switch');
  var counter = 0;

  this.on('parentAction', function(option) {
    if (counter === 0) {
      assert.equal(true, option);
    } else {
      assert.equal(false, option);
    }
    counter += 1;
  });
  let $disabled = $switchComponent.find('input').prop('disabled');
  assert.equal($disabled, false, 'Switch should not be disabled');
  $switchComponent
    .find('input')
    .prop('checked', true)
    .change();
  return wait().then(function() {
    $switchComponent
      .find('input')
      .prop('checked', false)
      .change();
    return wait();
  });
});
test('Switch Disabled', function(assert) {
  assert.expect(1);

  this.set('disabled', true);

  this.render(hbs`{{gru-status-switch  disabled=disabled}}`);

  const $component = this.$(); //component dom element
  const $switchComponent = $component.find('.gru-status-switch');
  let $disabled = $switchComponent.find('input').prop('disabled');
  assert.equal($disabled, true, 'Switch should be disabled');
});
