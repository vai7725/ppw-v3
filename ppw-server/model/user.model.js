import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'email is required'],
      unique: [true, 'email already registered'],
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    username: {
      type: String,
      trim: true,
      unique: [true, 'username must be unique'],
    },
    password: {
      type: String,
      trim: true,
      select: false,
    },
    profession: {
      type: String,
      trim: true,
    },
    university: {
      type: String,
      trim: true,
    },

    course: {
      type: String,
      trim: true,
    },

    role: {
      type: String,
      trim: true,
      enum: ['ADMIN', 'USER'],
      default: 'USER',
    },
    profileCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('findOneAndUpdate', async function (next) {
  try {
    if (!this._update || !this._update.password) {
      return next();
    }
    const hashedPassword = await bcrypt.hash(this._update.password, 10);
    this._update.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods = {
  generateToken: function () {
    return jwt.sign(
      {
        id: this._id,
        username: this.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );
  },
};

export const User = mongoose.model('user', userSchema);
