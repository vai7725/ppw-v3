import mongoose from 'mongoose';

const contributionSchema = new mongoose.Schema(
  {
    university: {
      type: String,
      required: [true, 'University name is required'],
      trim: true,
    },
    course: {
      type: String,
      required: [true, 'Course name is required'],
      trim: true,
    },
    subject: {
      type: String,
      required: [true, 'Subject name is required'],
      trim: true,
    },
    exam_year: {
      type: Number,
      required: [true, 'Exam year is required'],
      trim: true,
    },
    paper_year: {
      type: Number,
      required: [true, 'Paper year is required'],
      trim: true,
    },
    file: {
      type: String,
      required: [true, 'File is required'],
      trim: true,
    },
    uploaded_by: {
      type: String,
      trim: true,
      default: undefined,
    },
    agree_with_terms: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Contribution = mongoose.model('contributions', contributionSchema);
