import mongoose from 'mongoose';

const universitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    cover: {
      type: String,
      required: true,
      trim: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const courseSchema = new mongoose.Schema(
  {
    universityId: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    duration_years: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const paperSchema = new mongoose.Schema(
  {
    universityId: {
      type: String,
      required: true,
      trim: true,
    },
    courseId: {
      type: String,
      required: true,
      trim: true,
    },
    subject_title: {
      type: String,
      required: true,
      trim: true,
    },
    exam_year: {
      type: Number,
      required: true,
      trim: true,
    },
    paper_year: {
      type: Number,
      required: true,
      trim: true,
    },
    file_link: {
      type: String,
      required: true,
      unique: [true, 'File link must be unique'],
      trim: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const University = mongoose.model('university', universitySchema);
export const Course = mongoose.model('course', courseSchema);
export const Paper = mongoose.model('paper', paperSchema);
