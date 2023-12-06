import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
  },
  passwordHashed: {
    type: String,
    required: false,
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
    default: null,
  },
  address: {
    type: String,
    default: null,
  },
  imageProfile: {
    type: String,
    default:
      'https://res.cloudinary.com/dh27sb79z/image/upload/v1701369517/uy7luxxzy0wbwxcysmx6.png',
  },
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
    delete returnedObject.passwordHashed;
  },
});

export const UserModel = mongoose.model('User', userSchema);
