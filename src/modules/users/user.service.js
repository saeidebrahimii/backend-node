const userModel = require("./user.model");

class UserService {
  constructor() {
    autoBind(this);
  }
  async getById(id) {
    const user = await userModel.findById(id);
    return user;
  }
  async getByEmail(email) {
    const user = await userModel.findOne({ email });
    return user;
  }
  async create({ firstName, lastName, email, mobile, password }) {
    const user = await userModel.create({
      firstName,
      lastName,
      email,
      mobile,
      password,
    });
    return user;
  }
  async update(id, updates) {
    const updatedUser = await userModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    return updatedUser;
  }
}
module.exports = new UserService();
