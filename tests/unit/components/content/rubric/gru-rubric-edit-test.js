import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import RubricModel from 'gooru-web/models/rubric/rubric';


moduleForComponent('content/rubric/gru-rubric-edit', 'Unit | Component | content/rubric/gru rubric edit', {
  unit: true
});

test('setFeedBack', function(assert) {
  let component = this.subject({
    rubric: RubricModel.create({})
  });
  assert.equal(component.get('rubric.requiresFeedback'),false,'Feedback is not required');
  component.send('setFeedBack');
  assert.equal(component.get('rubric.requiresFeedback'),true,'Feedback should be required');
});
