import Visits from '../model/general.model.js';

export const handleVisitUpdates = async (req, res) => {
  try {
    const visit = await Visits.findById(process.env.VISIT_COLLECTION_ID);
    visit.visits += 1;
    await visit.save();
    return res
      .status(200)
      .json({ success: true, msg: 'visit updated successfully' });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
