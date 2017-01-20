import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import CenturySkillModel from 'gooru-web/models/century-skill/century-skill';
import Ember from "ember";
import DS from 'ember-data';

const centurySkillServiceStub = Ember.Service.extend({

  findCenturySkills() {
    var promiseResponse;
    var response = [
      CenturySkillModel.create({
        id: 1,
        label: "Problem Formulation",
        hewlettDeepLearningModel:true,
        conleyFourKeysModel: false,
        p21FrameworkModel: true,
        nationalResearchCenterModel:false,
        group: "Key Cognitive Skills and Strategies"}),
      CenturySkillModel.create({
        id: 2,
        label: "Research: Access and Evaluate Information",
        hewlettDeepLearningModel:true,
        conleyFourKeysModel: false,
        p21FrameworkModel: true,
        nationalResearchCenterModel:false,
        group: "Key Cognitive Skills and Strategies"})
    ];

    promiseResponse = new Ember.RSVP.Promise(function (resolve) {
      Ember.run.next(this, function () {
        resolve(response);
      });
    });

    return DS.PromiseArray.create({
      promise: promiseResponse
    });
  }
});



moduleForComponent('gru-century-skills', 'Integration | Component | gru century skills', {
  integration: true,
  beforeEach: function () {
    this.inject.service('i18n');
    this.register('service:century-skill', centurySkillServiceStub);
    this.inject.service('century-skill');
  }
});

test('Century skills Layout', function(assert) {

  this.render(hbs`{{century-skills/modals/gru-century-skills}}`);

  const $component = this.$(".gru-century-skills");
  assert.ok($component, 'Missing Component');
  assert.ok($component.find('h4.modal-title'), 'Missing Title');
  assert.equal($component.find('h4.modal-title').text(), this.get('i18n').t('common.add-century-skills').string, 'Incorrect Title');
  assert.ok($component.find('.gru-century-skills-legend'), 'Missing gru-century-skills-legend component');
  assert.ok($component.find('.gru-century-skills-content'), 'Missing gru-century-skills-content component');
});
