import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';
import Ember from 'ember';

moduleForComponent('cards/gru-resource-card', 'Integration | Component | cards/gru resource card', {
  integration: true
});

test('Resource Card Layout', function(assert) {
  var resource = Ember.Object.create({
    title: "Resource Title",
    isQuestion:false,
    resourceFormat:"video",
    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    owner:Ember.Object.create({
      name:"Publisher"
    }),
    standards:Ember.A([Ember.Object.create({
      description:"Use proportional relationships to solve multistep ratio and percent problems. Examples: simple interest, tax, markups and markdowns, gratuities and commissions, fees, percent increase and decrease, percent error.",
      name:"CCSS.Math.Content.7.RP.A.3"
    }),Ember.Object.create({
      description:"Explain patterns in the number of zeros of the product when multiplying a number by powers of 10, and explain patterns in the placement of the decimal point when a decimal is multiplied or divided by a power of 10. Use whole-number exponents to denote powers of 10.",
      name:"CCSS.Math.Content.5.NBT.A.2"
    })])
  });

  this.set('resource', resource);
  this.render(hbs`{{cards/gru-resource-card resource=resource}}`);
  var $component = this.$(); //component dom element
  const $resourceCard = $component.find(".gru-resource-card");
  T.exists(assert, $resourceCard.find(".panel-heading h6.title"), "Missing Title");
  //T.exists(assert, $resourceCard.find(".panel-heading i."+resource.resourceFormat+"-icon"), "Missing Resource Icon");
  //assert.equal(T.text($resourceCard.find(".panel-heading .resource-type span")), "Video", "Incorrect  resource type");
  T.exists(assert, $resourceCard.find(".panel-body .standards"), "Missing standards");
  T.exists(assert, $resourceCard.find(".panel-body .publisher img"), "Missing Publisher Image");
  T.exists(assert, $resourceCard.find(".panel-body .publisher .publisher-name a"), "Missing Publisher Name");
  T.exists(assert, $resourceCard.find(".panel-body .description p"), "Missing Description");
  //T.exists(assert, $resourceCard.find(".panel-body button.add-to-btn"), "Missing Add to Button");
});
//test('Question Card Layout', function(assert) {
//  var question = Ember.Object.create({
//    title: "Question Title",
//    isQuestion:true,
//    questionType:"MC",
//    text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//    owner:Ember.Object.create({
//      name:"Publisher"
//    }),
//    standards:Ember.A([Ember.Object.create({
//      description:"Use proportional relationships to solve multistep ratio and percent problems. Examples: simple interest, tax, markups and markdowns, gratuities and commissions, fees, percent increase and decrease, percent error.",
//      name:"CCSS.Math.Content.7.RP.A.3"
//    }),Ember.Object.create({
//      description:"Explain patterns in the number of zeros of the product when multiplying a number by powers of 10, and explain patterns in the placement of the decimal point when a decimal is multiplied or divided by a power of 10. Use whole-number exponents to denote powers of 10.",
//      name:"CCSS.Math.Content.5.NBT.A.2"
//    })])
//  });
//
//  this.set('question', question);
//  this.render(hbs`{{cards/gru-resource-card resource=question}}`);
//  var $component = this.$(); //component dom element
//  const $resourceCard = $component.find(".gru-resource-card");
//  T.exists(assert, $resourceCard.find(".panel-heading h6.title"), "Missing Title");
//  T.exists(assert, $resourceCard.find(".panel-heading i.question-icon"), "Missing Question Icon");
//  assert.equal(T.text($resourceCard.find(".panel-heading .question-type span")), "Multiple Choice", "Incorrect  question type");
//  T.exists(assert, $resourceCard.find(".panel-body .standards"), "Missing standards");
//  T.exists(assert, $resourceCard.find(".panel-body .publisher img"), "Missing Publisher Image");
//  T.exists(assert, $resourceCard.find(".panel-body .publisher .publisher-name a"), "Missing Publisher Name");
//  T.exists(assert, $resourceCard.find(".panel-body .description p"), "Missing Description");
//  T.exists(assert, $resourceCard.find(".panel-body button.remix-btn"), "Missing Remix Button");
//
//});
