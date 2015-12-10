import DS from "ember-data";
import { validator, buildValidations } from "ember-cp-validations";

// constants
import DEFAULT_USER_PROFILE_IMAGE from "../../config/config";

const UserValidations = buildValidations({
  firstName: [
    validator('presence', true)
  ],

  lastName: [
    validator('presence', true)
  ],

  username: {
    description: 'Username',
    validators: [
      validator('presence', true),
      validator('length', {
        min: 4,
        max: 20
      }),
      validator('format', {
        regex: /^\w+$/,
        message: '{description} cannot use special characters'
      }),
      validator('username')
    ]
  },
  password: [
    validator('presence', true),
    validator('length', {
      min: 5,
      max: 14
    }),
    validator('format', {
      regex: /^\w+$/,
      message: '{description} cannot use special characters'
    })
  ],
  rePassword:[
    validator('presence', true),
    validator('length', {
      min: 5,
      max: 14
    }),
    validator('format', {
      regex: /^\w+$/,
      message: '{description} cannot use special characters'
    }),

    validator(function(value,options,model/* ,attribute*/) {
      return value !== model.get('password') ? `Passwords don't match` : true ;
    })
  ],
  email: [
    validator('presence', true),
    validator('format', {
      type: 'email',
      message: 'Not a valid email'
    }),
    validator('email')
  ],
  dateOfBirth: [
    validator('presence', true)
  ],
  role: [
    validator('presence', true)
  ]
});
/**
 * Model to represent the Users obtained from the end-point
 */
export default DS.Model.extend(UserValidations, {

  // Values used to capture and to read data to/from SignUp end-point
  /**
   * @property {string} firstName
   */
  firstName: DS.attr("string"),
  /**
   * @property {string} lastName
   */
  lastName: DS.attr("string"),
  /**
   * @property {string} username
   */
  username: DS.attr("string"),
  /**
   * @property {string} email
   */
  email: DS.attr("string"),
  /**
   * @property {string} organization
   */
  organization: DS.attr("string"),

  // Values only used to read data from SignUp end-point
  /**
   * @property {string} gooruId
   */
  gooruUId: DS.attr("string"),
  /**
   * @property {string} usernameDispaly
   */
  usernameDisplay: DS.attr("string"),
  /**
   * @property {string} profileImageUrl
   */
  profileImageUrl: DS.attr("string", { defaultValue: DEFAULT_USER_PROFILE_IMAGE }),
  /**
   * @property {string} userRoleSetString
   */
  userRoleSetString: DS.attr("string"),
  /**
   * @property {string} accountCreatedType
   */
  accountCreatedType: DS.attr("string"),
  /**
   * @property {number} accountTypeId
   */
  accountTypeId: DS.attr("number"),
  /**
   * @property {number} active
   */
  active: DS.attr("number"),
  /**
   * @property {number} confirmStatus
   */
  confirmStatus: DS.attr("number"),
  /**
   * @property {string} createdOn
   */
  createdOn: DS.attr("string"),
  /**
   * @property {string} partyUid
   */
  partyUid: DS.attr("string"),
  /**
   * @property {number} viewFlag
   */
  viewFlag: DS.attr("number"),

  // Values only used to capture data to be sent to SignUp end-point
  /**
   * @property {string} gender
   */
  gender: DS.attr("string"),
  /**
   * @property {string} dateOfBirth
   */
  dateOfBirth: DS.attr("string"),
  /**
   * @property {string} password
   */
  password: DS.attr("string"),
  /**
   * @property {string} role
   */
  role: DS.attr("string"),
  /**
   * @property {Meta} metadata
   */
  metadata: DS.belongsTo("meta", { async: true })

});
