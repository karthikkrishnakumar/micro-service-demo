import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import bcrypt from 'bcryptjs'

/**
 * Define the quickLink schema
 */
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    // orders: {
    //   type: Array,
    //   required: true,
    // },
  },
  { timestamps: true }
);


//compare the hashed password with the password that the user sends in the request.

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.plugin(mongoosePaginate)
const User = mongoose.model("User", userSchema);


export default User;
