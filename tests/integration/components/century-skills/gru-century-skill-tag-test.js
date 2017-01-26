import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import CenturySkillModel from 'gooru-web/models/century-skill/century-skill';

moduleForComponent('century-skills/gru-century-skill-tag', 'Integration | Component | century-skills/gru century skill tag', {
  integration: true
});

test('it renders a century skill tag correctly', function(assert) {

  var centurySkillTag = CenturySkillModel.create({
    id: 1,
    label: "Problem Formulation",
    hewlettDeepLearningModel:true,
    conleyFourKeysModel: false,
    p21FrameworkModel: true,
    nationalResearchCenterModel:false,
    group: "Key Cognitive Skills and Strategies"
  });

  this.set('centurySkillTag', centurySkillTag);

  this.render(hbs`{{century-skills/gru-century-skill-tag skill=centurySkillTag}}`);

  const $component = this.$('.century-skills.gru-century-skill-tag');

  assert.ok($component.length, 'Component');
  assert.notOk($component.find('button').length, 'Read only class by default, button should no be visible');
  assert.ok($component.find('.content .tag-label').length, 'Tag label');
  assert.equal($component.find('.content .tag-label').text(), 'Problem Formulation', 'Tag label Text');
});

test('if it is not read-only', function(assert) {

  var centurySkillTag = CenturySkillModel.create({
    id: 1,
    label: "Problem Formulation",
    hewlettDeepLearningModel:true,
    conleyFourKeysModel: false,
    p21FrameworkModel: true,
    nationalResearchCenterModel:false,
    group: "Key Cognitive Skills and Strategies"
  });

  this.set('centurySkillTag', centurySkillTag);

  this.render(hbs`{{century-skills/gru-century-skill-tag skill=centurySkillTag isReadOnly=false}}`);

  const $component = this.$('.century-skills.gru-century-skill-tag');

  assert.ok($component.length, 'Component');
  assert.notOk($component.find('.content .tag-label').length, 'Tag label should no be visible');
  assert.ok($component.find('button').length, 'Tag button');
  assert.ok($component.find('button .btn-label').length, 'label button');
  assert.equal($component.find('button .btn-label').text(), 'Problem Formulation', 'Tag button label Text');
  assert.ok($component.find('button .remove-skill').length, 'remove-skill icon');
});

test('it calls an external action when its remove button is clicked', function(assert) {
  assert.expect(2);

  var centurySkillTag = CenturySkillModel.create({
    id: 2,
    label: "Problem Formulation",
    hewlettDeepLearningModel:true,
    conleyFourKeysModel: false,
    p21FrameworkModel: true,
    nationalResearchCenterModel:false,
    group: "Key Cognitive Skills and Strategies"
  });

  this.set('centurySkillTag', centurySkillTag);

  this.on('externalAction', function(skillId) {
    assert.ok(true, 'External action called');
    assert.equal(skillId, 2, 'Action parameter');
  });

  this.render(hbs`{{century-skills/gru-century-skill-tag skill=centurySkillTag isReadOnly=false onRemove=(action 'externalAction')}}`);

  const $component = this.$('.century-skills.gru-century-skill-tag');
  $component.find('button .remove-skill').click();
});
