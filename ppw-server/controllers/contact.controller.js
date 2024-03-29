import { Contact } from '../model/contact.model.js';

export const contactHandler = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    if (!contact) {
      return res
        .status(500)
        .json({ success: false, msg: 'Internal server error' });
    }

    await contact.save();

    return res
      .status(200)
      .json({ success: true, msg: 'Contact saved suffessfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

export const getContactQueries = async (req, res) => {
  try {
    const contacts = await Contact.find({ resolved: { $ne: true } }).sort({
      _id: 'asc',
    });

    if (!contacts) {
      return res
        .status(204)
        .json({ success: false, msg: 'No contact queries found' });
    }

    return res.status(200).json({ success: true, contacts });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

export const resolveContactQuery = async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findById(contactId);

    if (!contact) {
      return res.status(204).json({
        success: false,
        msg: `No query found with the id ${contactId}`,
      });
    }

    contact.resolved = true;
    await contact.save();

    return res
      .status(200)
      .json({ success: true, msg: 'Query resolved successfully', contactId });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};
