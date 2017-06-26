import Ember from "ember";
import { moduleForComponent, test } from 'ember-qunit';
import Collection from 'gooru-web/models/content/collection';


moduleForComponent('content/modals/gru-add-to-classroom', 'Unit | Component | content/modals/ gru add to classroom', {
  integration: false
});

test('selectClassroom', function(assert) {
  let component = this.subject({});
  assert.notOk(component.get('selectedClassroom'), 'Wrong value of non selected classroom');

  component.send('selectClassroom', 'class');
  assert.equal(component.get('selectedClassroom'),'class', 'Incorrect selected class');

});


test('addTo - Daily Class Activities', function(assert) {
  let collection =  Collection.create({
    id:'collection-id',
    title: 'Collection Title',
    questionCount:4,
    isCollection:true,
    standards:Ember.A([Ember.Object.create({
      description:'Use proportional relationships to solve multistep ratio and percent problems. Examples: simple interest, tax, markups and markdowns, gratuities and commissions, fees, percent increase and decrease, percent error.',
      code:'CCSS.Math.Content.7.RP.A.3'
    }),Ember.Object.create({
      description:'Explain patterns in the number of zeros of the product when multiplying a number by powers of 10, and explain patterns in the placement of the decimal point when a decimal is multiplied or divided by a power of 10. Use whole-number exponents to denote powers of 10.',
      code:'CCSS.Math.Content.5.NBT.A.2'
    })]),
    owner: Ember.Object.create({
      id: 'owner-id',
      username: 'dara.weiner',
      avatarUrl: 'avatar-url'
    }),
    course: 'Any course title',
    remixedBy:['James','Andrea','Patric'],
    isVisibleOnProfile:false
  });

  let component = this.subject({
    classActivityService: {
      addActivityToClass: (classId,contentId,contentType,context) => {
        assert.equal(classId, 'class-id', 'Class id should match');
        assert.equal(contentId, 'collection-id', 'Collection id should match');
        assert.equal(contentType, 'collection', 'Should be a collection');
        assert.equal(context, null, 'Should not have context');
        return Ember.RSVP.resolve({});
      }
    },
    model:{
      content: collection,
      classActivity:true

    },
    selectedClassroom:Ember.Object.create({id:'class-id'})
  });

  component.send('addTo');
});
