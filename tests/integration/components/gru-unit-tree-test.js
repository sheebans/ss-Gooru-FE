import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';
import Ember from 'ember';

moduleForComponent('gru-unit-tree', 'Integration | Component | gru unit tree', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('Unit Tree Layout', function(assert) {
  assert.expect(4);
  const unit = Ember.Object.create(
    {
      "id": 10,
      "title": "Unit 1",
      "visibility":true
    });
  this.set('unit', unit);

  this.render(hbs`{{gru-unit-tree unit=unit}}`);

  var $component = this.$(); //component dom element
  T.exists(assert, $component.find("div.gru-unit-tree"), "Unit tree not found");

  var $title =$component.find('h6.title');
  T.exists(assert, $title, "Missing unit title");
  assert.equal(T.text($title), "Unit 1", "Incorrect  title");


  var $users =$component.find('.users');
  T.exists(assert, $users, "Missing  users section");

});
