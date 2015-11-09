import DS from "ember-data";
import ValidationMixin from '../mixins/validation';
/**
 * Model to represent the Users obtained from the end-point
 */
export default DS.Model.extend(ValidationMixin,{

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
  profileImageUrl: DS.attr("string"),
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
