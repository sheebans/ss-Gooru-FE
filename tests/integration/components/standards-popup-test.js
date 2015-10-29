import { moduleForComponent, test } from 'ember-qunit';
import T from 'gooru-web/tests/helpers/assert';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('standards-popup', 'Integration | Component | search filter', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('standards-popup', function(assert) {
  assert.expect(5);

  var standards = Ember.A();

  standards.addObject(Ember.Object.create({ name: "CCSS.ELA-Literacy.RI.9-10.6", description: "Determine an author’s point of view or purpose in a text and analyze how an author uses rhetoric to advance that point of view or purpose."}));

  this.set('standards', standards);

  this.render(hbs`{{standards-popup standards=standards}}`);
  var $component = this.$(); //component dom element

  var $standardsPopupSection = $component.find(".standards-popup");
  T.exists(assert, $standardsPopupSection, "Missing standards popup");
  T.exists(assert, $standardsPopupSection.find(".standard-title"), "Missing standard title");
  assert.equal(T.text($standardsPopupSection.find('span')), "CCSS.ELA-Literacy.RI.9-10.6", "Incorrect standard title");

  T.exists(assert, $standardsPopupSection.find(".standard-description"), "Missing standard description");
  assert.equal(T.text($standardsPopupSection.find('p')), "Determine an author’s point of view or purpose in a text and analyze how an author uses rhetoric to advance that point of view or purpose.");
});
