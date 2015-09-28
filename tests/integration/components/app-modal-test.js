import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';

moduleForComponent('app-modal', 'Integration | Component | app modal', {
  // needs: ['component:foo', 'helper:bar']
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('app-modal full layout', function(assert) {
  assert.expect(9); //making sure all asserts are called

  this.render(hbs`{{#app-modal title="My Classes" footer=true}} <div class="app-content">Test</div> {{/app-modal}}`);

  var $component = this.$(); //component dom element

  T.exists(assert, $component.find(".modal.fade.app-modal"), "Modal root element not found");

  var $body = $component.find(".modal-body");
  T.exists(assert, $body, 'Missing body');
  T.exists(assert, $body.find("div.app-content"), "Missing body content");

  var $header = $component.find(".modal-dialog > .modal-content > .modal-header");
  T.exists(assert, $header, 'Missing header');
  T.exists(assert, $header.find("button.close"), "Missing close button");
  T.exists(assert, $header.find("h4.modal-title"), "Missing title");
  assert.equal(T.text($header.find("h4.modal-title")), 'My Classes', "Wrong title");

  var $footer = $component.find(".modal-footer");
  T.exists(assert, $footer, 'Missing footer');
  T.exists(assert, $footer.find("button.close-button"), "Missing close button");
});

test('app-modal layout - no footer', function(assert) {
  assert.expect(1); //making sure all asserts are called

  this.render(hbs`{{#app-modal title="My Classes" footer=false}} <div class="app-content">Test</div> {{/app-modal}}`);

  var $component = this.$(); //component dom element

  var $footer = $component.find(".modal-footer");
  T.notExists(assert, $footer, 'Missing footer');
});

test('app-modal close action', function(assert) {
  assert.expect(3); //making sure all asserts are called

  //setting context
  this.on('myCloseAction', function(){
    assert.ok(!arguments.length, "Callback should be called without parameters");
  });

  this.render(hbs`{{#app-modal title="My Classes" footer=true onCloseAction='myCloseAction'}} <div class="app-content">Test</div> {{/app-modal}}`);

  var $component = this.$(); //component dom element

  var $footer = $component.find(".modal-footer");
  T.exists(assert, $footer, 'Missing footer');

  var $button = $footer.find('button.close-button');
  T.exists(assert, $button, "Missing close button");

  $button.click();
});

test('app-modal close action not provided', function(assert) {
  assert.expect(2); //making sure all asserts are called

  //setting context
  this.on('myCloseAction', function(){
    assert.ok(false, "Callback should not be called");
  });

  this.render(hbs`{{#app-modal title="My Classes" footer=true}} <div class="app-content">Test</div> {{/app-modal}}`);

  var $component = this.$(); //component dom element

  var $footer = $component.find(".modal-footer");
  T.exists(assert, $footer, 'Missing footer');

  var $button = $footer.find('button.close-button');
  T.exists(assert, $button, "Missing close button");

  $button.click();
});
