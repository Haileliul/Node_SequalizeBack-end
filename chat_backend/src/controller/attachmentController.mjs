import db from "../model/index.mjs";
import { Op } from "sequelize";

const Attachment = db.attachments;

// 1 . creating an Attachment
const addAttachment = async (req, res) => {
  try {
    if (!req.timeout) {
      let info = {
        messageId: req.body.messageId,
        attachmentType: req.body.attachmentType,
        attachmentUrl: req.body.attachmentUrl,
      };
      const existingatachment = await Attachment.findOne({
        where: {
          [Op.and]: [
            { attachmentType: req.body.attachmentType },
            { attachmentUrl: req.body.attachmentUrl },
          ],
        },
      });

      if (existingatachment) {
        // If user already exists, send a conflict response
        return res.status(409).send("An Attachment  already exists");
      }

      const attachment = await Attachment.create(info);
      return res.status(200).send({
        data: attachment,
        message: "An attachment has been added successfully",
      });
      console.log(attachment);
    } else {
      // Handle timeout error
      res.status(504).send("Request Timeout");
    }
  } catch (err) {
    // If an error occurs during execution, send a 500 Internal Server Error response
    console.error("Error occurred while adding attachment:", err);
    res.status(500).send("Internal Server Error");
  }
};

// 2 . get All attachments
const getAllAttachments = async (req, res) => {
  try {
    if (!req.timeout) {
      let attachments = await Attachment.findAll({
        /* attributes: [
                            'title',
                            'price'
                        ] */
      });
      // If no attachments are found, send a 404 Not Found response
      if (!attachments || attachments.length === 0) {
        return res.status(404).send("No attachments found");
      }
      res.status(200).send(attachments);
    } else {
      // Handle timeout error
      return res.status(504).send("Request Timeout");
    }
  } catch (error) {
    // If an error occurs during execution, send a 500 Internal Server Error response
    console.error("Error occurred while fetching attachments:", error);
    return res.status(500).send("Internal Server Error");
  }
};

// 3. get One Attachment

const getOneAttachment = async (req, res) => {
  try {
    if (!req.timeout) {
      let id = req.params.attachmentId;
      let attachment = await Attachment.findone({
        where: { attachmentId: id },
      });
      // If no attachments are found, send a 404 Not Found response
      if (!attachment) {
        return res.status(404).send("No attachments found");
      }
      res.status(200).send(attachment);
    } else {
      // Handle timeout error
      res.status(504).send("Request Timeout");
    }
  } catch (error) {
    // If an error occurs during execution, send a 500 Internal Server Error response
    console.error("Error occurred while fetching attachments:", error);
    res.status(500).send("Internal Server Error");
  }
};

// 4. Update a Single Attachment

const UpdateOneAttachment = async (req, res) => {
  try {
    if (!req.timeout) {
      let id = req.params.attachmentId;
      let attachment = await Attachment.update(req.body, {
        where: { attachmentId: id },
      });
      res.status(200).send(attachment);
    } else {
      // Handle timeout error
      res.status(504).send("Request Timeout");
    }
  } catch (error) {
    // If an error occurs during execution, send a 500 Internal Server Error response
    console.error("Error occurred while fetching attachments:", error);
    res.status(500).send("Internal Server Error");
  }
};

// 5. Delete a Single Attachment

const deletOneAttachment = async (req, res) => {
  try {
    if (!req.timeout) {
      let id = req.params.attachmentId;
      await Attachment.destroy({ where: { attachmentId: id } });
      res.status(200).send("attachment has been deleted");
    } else {
      // Handle timeout error
      res.status(504).send("Request Timeout");
    }
  } catch (error) {
    // If an error occurs during execution, send a 500 Internal Server Error response
    console.error("Error occurred while fetching attachments:", error);
    res.status(500).send("Internal Server Error");
  }
};

export default {
  addAttachment,
  getAllAttachments,
  getOneAttachment,
  UpdateOneAttachment,
  deletOneAttachment,
};
