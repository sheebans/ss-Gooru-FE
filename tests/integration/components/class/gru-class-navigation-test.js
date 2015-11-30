import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import T from 'gooru-web/tests/helpers/assert';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('class/gru-class-navigation', 'Integration | Component | class/gru class navigation', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('Class Navigation', function(assert) {
  assert.expect(2);

  const classMock = Ember.Object.create({
    id: '1',
    name: 'Class A1',
    code: 'ABCDEF',
    greetings: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    startDate: '9.2.2015',
    endDate: '12.15.2015'
  });

  this.set('class', classMock);

  this.on('itemSelected', function(item) {
    assert.equal(item, 'information', "Incorrect selected menu class item");
  });

  this.render(hbs`{{class.gru-class-navigation class=class selectedMenuItem='information' onItemSelected='itemSelected'}}`);

  var $component = this.$(); //component dom element
  const $navigation = $component.find(".gru-class-navigation");
  T.exists(assert, $navigation, "Missing class navigation section");
  T.exists(assert, $navigation.find("h3"), "Missing class title");

});
