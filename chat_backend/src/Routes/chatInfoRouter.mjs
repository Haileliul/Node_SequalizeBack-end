import db from "../model/index.mjs";
import { Op } from "sequelize";

const ChatInfos = db.chatInfos;

// 1 . creating an Attachment
const addAttachment = async (req, res) => {
  try {
    if (!req.timeout) {
      let info = {
        userid: req.ChatInfos.userid,
        groupChat: req.ChatInfos.groupChat,
        lastmessageTimestamp: req.ChatInfos.lastmessageTimestamp,
        unreadMessageCount: req.ChatInfos.unreadMessageCount,
        archived: req.ChatInfos.archived,
      };
      const existingatachment = await ChatInfos.findOne({
        where: {
          [Op.and]: [
            { attachmentType: req.body.attachmentType },
            { attachmentUrl: req.body.attachmentUrl },
          ],
        },
      });

      if (existingatachment) {
        // If user already exists, send a conflict response
        return res.status(409).send(" The Chat already exists");
      }

      const attachment = await ChatInfos.create(info);
      return res.status(200).send({
        data: attachment,
        message: "The Chat has been added successfully",
      });
      console.log(attachment);
    } else {
      // Handle timeout error
      res.status(504).send("Request Timeout");
    }
  } catch (err) {
    // If an error occurs during execution, send a 500 Internal Server Error response
    console.error("Error occurred while adding Chat:", err);
    res.status(500).send("Internal Server Error");
  }
};
