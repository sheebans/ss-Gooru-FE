import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const courseServiceStub = Ember.Service.extend({
  deleteCourse(id) {
    return new Ember.RSVP.Promise(function (resolve, reject) {
      if (!id) {
        reject({status: 500});
      } else {
        resolve(id);
      }
    });
  }

});

moduleForComponent('content/modals/gru-delete-content', 'Integration | Component | content/modals/gru delete content', {
  integration: true,
  beforeEach: function () {
    this.i18n = this.container.lookup('service:i18n');
    this.i18n.set("locale","en");
    this.register('service:api-sdk/course', courseServiceStub);
    this.inject.service('api-sdk/course');
  }
});

test('Delete content layout', function(assert) {
  const model ={
    content:{
      title:"Course Title"
    },
    type: 'course',
    callback: null,
  };
  this.set('model',model);

  this.render(hbs`{{content/modals/gru-delete-content model=model}}`);
  const $component = this.$(".gru-delete-content");
  assert.ok($component.length, 'Missing Component');
  assert.ok($component.find('h4.modal-title').length, 'Missing Title');
  assert.equal($component.find('h4.modal-title').text(), this.get('i18n').t('common.delete').string +" "+this.get('i18n').t('common.'+model.type).string, 'Incorrect Title');
  assert.ok($component.find('p.legend').length, 'Missing Delete Course Legend');
  assert.equal($component.find('p.legend').text(), this.get('i18n').t('content.modals.delete-content.legend').string+ " "+model.content.title, 'Incorrect legend');
  assert.ok($component.find('.delete-info').length, 'Missing Delete Information');
  assert.equal($component.find('.delete-info ul li:eq(0) label span').text(), this.get('i18n').t('content.modals.delete-content.delete-instructions.links-inaccessible').string, 'Incorrect links inaccessible check');
  assert.equal($component.find('.delete-info ul li:eq(1) label span').text(), this.get('i18n').t('content.modals.delete-content.delete-instructions.content-inaccessible').string, 'Incorrect content inaccessible check');
  assert.equal($component.find('.delete-info ul li:eq(2) label span').text(), this.get('i18n').t('content.modals.delete-content.delete-instructions.course-deleted').string, 'Incorrect course deleted check');
  assert.ok($component.find('p.confirmation').length, 'Missing Delete Confirmation');
  assert.equal($component.find('p.confirmation').text(), this.get('i18n').t('content.modals.delete-content.confirmation').string, 'Incorrect Confirmation Text');
  assert.ok($component.find('.delete-input').length, 'Missing Delete Input');
  assert.ok($component.find('.actions .cancel').length, 'Missing Cancel Button');
  assert.ok($component.find('.actions .delete').length, 'Missing Delete Button');
  assert.equal($component.find('.actions .delete').prop('disabled'),true, 'Delete Button Should be disabled');
});

test('Enable delete button', function(assert) {
  const model ={
    content:{
      title:"Course Title"
    },
    type: 'course',
    callback: null,
  };

  const validator = Ember.Object.create({
    confirm:"delete",
    check1:true,
    check2:true,
    check3:true
  });

  this.set('model',model);
  this.set('validator',validator);

  this.render(hbs`{{content/modals/gru-delete-content model=model validator=validator}}`);
  const $component = this.$(".gru-delete-content");
  assert.equal($component.find('.actions .delete').prop('disabled'),false, 'Delete Button Should be enabled');
});

test('Delete Course', function(assert) {
  assert.expect(2);

  const model ={
    content:{
      id:"123456",
      title:"Course Title"
    },
    type: 'course',
    deleteMethod:this.get('api-sdk/course').deleteCourse.bind(this.get('api-sdk/course')),
    redirect:{
      route:'profile.content',
      params:{
        id:'23399056'
      }
    },
    callback: null,
  };

  const validator = Ember.Object.create({
    confirm:"delete",
    check1:true,
    check2:true,
    check3:true
  });

  const router = {
    transitionTo: function (route,id) {
      assert.ok(route,"Should have route");
      assert.ok(id,"Should have id");
    }
  };

  this.set('model',model);
  this.set('validator',validator);
  this.set('router',router);

  this.render(hbs`{{content/modals/gru-delete-content model=model validator=validator router=router}}`);
  const $component = this.$(".gru-delete-content");
  $component.find('.actions .delete').click();
});
