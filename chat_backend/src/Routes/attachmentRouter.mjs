import attachmentController from "../controller/attachmentController.mjs";

import { Router } from "express";
import { check, validationResult, query, body } from "express-validator";

const router = Router();

router.post(
  "/addattachment",
  [
    // check("messageId", "Please provide valid messageId").isNumeric(),
    // check("attachmentType", "Please provide valid attachmentType").isString(),
    check("messageId")
      .isNumeric()
      .withMessage("MessageId must be Number")
      .notEmpty()
      .withMessage("MessageId cannot  be null"),
    check("attachmentType")
      .notEmpty()
      .withMessage("attachmentType cannot be null")
      .isString()
      .withMessage("AttachmentType must be String"),
    check("attachmentUrl")
      .notEmpty()
      .withMessage("AttachmentUrl cannot be null")
      .isURL()
      .withMessage("Pleace Enter valid attachmentUrl"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("this is me from cendors");
    await attachmentController.addAttachment(req, res);
  }
);

router.get("/allattachments", async (req, res) => {
  await attachmentController.getAllAttachments(req, res);
});

router.get("/:id", async (req, res) => {
  await attachmentController.getOneAttachment(req, res);
});

router.put(
  "/:id",
  /*  [
    body("messageId")
      .isNumeric()
      .withMessage("MessageId must be Number")
      .notEmpty()
      .withMessage("MessageId cannot  be null"),
    body("attachmentType")
      .notEmpty()
      .withMessage("attachmentType cannot be null")
      .isString()
      .withMessage("AttachmentType must be String"),
    body("attachmentUrl")
      .notEmpty()
      .withMessage("AttachmentUrl cannot be null")
      .isURL()
      .withMessage("Pleace Enter valid attachmentUrl"),
  ],
 */ async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    await attachmentController.UpdateOneAttachment(req, res);
  }
);

router.delete("/delete/:id", async (req, res) => {
  await attachmentController.deletOneAttachment(req, res);
});

export default router;
