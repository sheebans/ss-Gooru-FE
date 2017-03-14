import { moduleForComponent, test } from 'ember-qunit';


moduleForComponent('content/rubric/gru-scoring-levels', 'Unit | Component | content/rubric/gru scoring levels', {
  unit: true
});

test('deleteLevel', function(assert) {
  let component = this.subject();
  let level = {name:'level-test',score:9};
  component.set('scoringLevels',[level]);
  assert.equal(component.get('scoringLevels').length,1,'Scoring levels should has one level');
  component.send('deleteLevel',level);
  assert.equal(component.get('scoringLevels').length,0,'Scoring levels should not has levels');
});
test('addLevel', function(assert) {
  let component = this.subject();
  assert.equal(component.get('scoringLevels').length,4,'Scoring levels should has 4 level');
  component.send('addLevel');
  assert.equal(component.get('scoringLevels').length,5,'Scoring levels should has 5 levels');
});
