import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | class/edit', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'class-edit-token',
      user: {
        gooruUId: 'pochita'
      }
    });
  }
});

test('Teacher Layout', function(assert) {
  visit('/class/class-for-pochita-as-teacher/edit');

  andThen(function() {
    assert.equal(currentURL(), '/class/class-for-pochita-as-teacher/edit');

    const $editContainer = find(".controller.class .controller.edit");
    T.exists(assert, $editContainer, "Missing edit container");

    const $editDescription =$editContainer.find(".class-edit h3");
    T.exists(assert, $editDescription, "Edit Description should be visible");

    const $editButtons =$editContainer.find(".edit-btns");
    T.exists(assert, $editButtons.find("div.edit-save-section.show"), "Cancel and Save buttons should be visible");
    T.exists(assert, $editButtons.find(".cancel"), "Missing Cancel Link");
    T.exists(assert, $editButtons.find(".save-btn"), "Missing Save Button");

    const $editPanel =$editContainer.find(".panel");
    T.exists(assert, $editPanel.find(".gru-input.name"), "Missing name field");
    T.exists(assert, $editPanel.find("textarea#greetings"), "Missing greetings textarea");
  });
});
