import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('content/gru-settings-edit', 'Integration | Component | gru settings edit', {
  integration: true,
  beforeEach: function () {
    this.inject.service('i18n');
  }
});

test('Layout of settings component', function (assert) {
  this.render(hbs`{{content/gru-settings-edit id="settings" isChecked=false}}`);

  var $settingsComponent = this.$();
  assert.ok($settingsComponent.find('.header h2').length, "Section title");
  assert.ok($settingsComponent.find('.panel-heading h3').length, "Panel subtitle");
  assert.ok($settingsComponent.find('.panel-body .setting.publish-to i.visibility').length, "Visibility icon");
  assert.ok($settingsComponent.find('.panel-body .setting.publish-to i.visibility + span').length, "Visibility label");
  assert.ok($settingsComponent.find('.panel-body .gru-switch .toggle').length, "Profile toggle button");
  assert.ok($settingsComponent.find('.panel-body .setting.request-to i.public').length, "Public icon");
  assert.ok($settingsComponent.find('.panel-body .setting.request-to i.public + span').length, "Public label");
});

test('External action gets called on switch change', function(assert) {
  assert.expect(3);
  this.on('externalAction', function () {
    assert.ok(true);
  });

  this.render(hbs`{{content/gru-settings-edit id="settings" action='externalAction' isChecked=false}}`);

  var $toggle = this.$().find('.panel-body .gru-switch .toggle');
  assert.ok($toggle.hasClass('off'), 'Toggle off by default');
  Ember.run(() => {
    $toggle.click();
  });
  assert.notOk($toggle.hasClass('off'), 'Toggle on after clicked');
});