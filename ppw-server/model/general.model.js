import mongoose from 'mongoose';

const userVisitSchema = new mongoose.Schema(
  {
    visits: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Visits = mongoose.model('visits', userVisitSchema);
export default Visits;
