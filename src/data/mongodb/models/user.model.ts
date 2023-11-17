import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
  },
  passwordHashed: {
    type: String,
    required: [true, 'Password is required'],
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  lastname: {
    type: String,
    required: [true, 'Lastname is required'],
  },
  phone: {
    type: Number,
    required: [true, 'Phone is required'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  incomes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Income',
    },
  ],

  expenses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Expense',
    },
  ],
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
    // delete returnedObject.passwordHashed;
  },
});

export const UserModel = mongoose.model('User', userSchema);
