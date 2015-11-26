import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('player/resources/gru-vimeo-resource', 'Unit | Component | player/resources/ gru vimeo resource', {
  integration: false
});

test('getVimeoID https://vimeo.com/11590751', function (assert) {
  assert.expect(1);

  var component = this.subject();

  var id = component.getVimeoID("https://vimeo.com/11590751");
  assert.equal(id, 11590751, "Incorrect ID");

});
test('getVimeoID http://vimeo.com/11590751', function (assert) {
  assert.expect(1);

  var component = this.subject();

  var id = component.getVimeoID("http://vimeo.com/11590751");
  assert.equal(id, 11590751, "Incorrect ID");

});
test('getVimeoID http://12vimeo.com/11590751', function (assert) {
  assert.expect(1);

  var component = this.subject();

  var id = component.getVimeoID("http://12vimeo.com/11590751");
  assert.equal(id, 11590751, "Incorrect ID");

});
test('getVimeoID http://12vimeo.com/11590751', function (assert) {
  assert.expect(1);

  var component = this.subject();

  var id = component.getVimeoID("https://vimeo.com/");
  assert.equal(id, "", "Should be empty");

});
