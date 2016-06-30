import Ember from "ember";
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('class/gru-class-navigation', 'Unit | Component | class/gru class navigation', {
  integration: false
});

test('resourceComponentSelected for non valid resource type', function (assert) {
  assert.expect(1);

  var component = this.subject({
    class: Ember.Object.create({
      id: "any-id"
    }),
    session: Ember.Object.create({
      token:'any-token'
    })
  });

  assert.equal(component.get('teamsURL'),'https://teams.gooru.org/integration/gooru?token=any-token&classId=any-id', 'Incorect URL');
});
