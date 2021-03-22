export class UserModel {
  constructor() {}

  getFirstName() {
    return this.firstName;
  }

  setFirstName(firstName) {
    this.firstName = firstName;
  }

  getLastName() {
    return this.lastName;
  }

  setLastName(lastName) {
    this.lastName = lastName;
  }

  getPhone() {
    return this.phone;
  }

  setPhone(phone) {
    this.phone = phone;
  }

  getEmail() {
    return this.email;
  }

  setEmail(email) {
    this.email = email;
  }

  getNotifyOnPolicyRenewal() {
    return this.notifyOnPolicyRenewal;
  }

  setNotifyOnPolicyRenewal(notifyOnPolicyRenewal) {
    this.notifyOnPolicyRenewal = notifyOnPolicyRenewal;
  }

  getNotifyOnNewsAndUpdates() {
    return this.notifyOnNewsAndUpdates;
  }

  setNotifyOnNewsAndUpdates(notifyOnNewsAndUpdates) {
    this.notifyOnNewsAndUpdates = notifyOnNewsAndUpdates;
  }

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  getActivationCode() {
    return this.activationCode;
  }

  setActivationCode(activationCode) {
    this.activationCode = activationCode;
  }

  getCodeExpireAt() {
    return this.codeExpireAt;
  }

  setCodeExpireAt(codeExpireAt) {
    this.codeExpireAt = codeExpireAt;
  }

  getProfilePicLink() {
    return this.profilePicLink;
  }

  setProfilePicLink(profilePicLink) {
    this.profilePicLink = profilePicLink;
  }

  getFullName() {
    return this.fullName;
  }

  setFullName(fullName) {
    this.fullName = fullName;
  }
}
