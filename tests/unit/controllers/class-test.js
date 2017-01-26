import Ember from "ember";
import { moduleFor, test } from 'ember-qunit';
import {KEY_CODES} from "gooru-web/config/config";
import { jwt_decode } from 'ember-cli-jwt-decode';
import moduleForService from 'gooru-web/tests/helpers/module-for-service';
import UserModel from 'gooru-web/models/profile/profile';

moduleForService('service:api-sdk/session', 'Unit | Service | api-sdk/session', {});

moduleFor('controller:class', {
  // Specify the other units that are required for this test.
  needs: ['service:api-sdk/session','model:class/class',]
});


test('test firebase messaging', function(assert) {

	assert.expect(2);
	const ctrl = this.subject();
	assert.ok(ctrl,'controller initialized');
	//get controller properties channels
	assert.ok(ctrl.channels,'channels ok');
});