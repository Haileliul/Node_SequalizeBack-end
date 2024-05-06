import { Router } from "express";
import { check, validationResult, query, body } from "express-validator";
import bcrypt from "bcrypt";
import db from "../model/index.mjs";
import { Op } from "sequelize";
import JWT from "jsonwebtoken";

const userInfos = db.userInfos;

const router = Router();

router.post(
  "/signup",
  [
    body("password").notEmpty().withMessage("password cannot  be null"),
    body("phonenumber")
      .isLength({ max: 13, min: 10 })
      .withMessage("Phone number must be at least 10 characters")
      .notEmpty()
      .withMessage("password cannot be null"),
    body("profileimageUrl")
      .isURL()
      .withMessage("password must be an Email")
      .notEmpty()
      .withMessage("password cannot  be null"),
    body("username")
      .isString()
      .withMessage("username must be a string")
      .notEmpty()
      .withMessage("Please enter the username"),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, phonenumber, profileimageUrl, password } = req.body;
      if (!req.timeout) {
        // Check if the user already exists in the database
        const existingUser = await userInfos.findOne({
          where: {
            [Op.or]: [
              { username: req.body.username },
              { phonenumber: req.body.phonenumber },
            ],
          },
        });

        if (existingUser) {
          // If user already exists, send a conflict response
          return res.status(409).send({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        let info = {
          username: username,
          phonenumber: phonenumber,

          profileimageUrl: profileimageUrl,
          password: hashedPassword,
        };

        const userInfo = await userInfos.create(info);
        // Generate JWT token
        const token = JWT.sign(
          {
            username: existingUser.username,
            phonenumber: existingUser.phonenumber,
          },
          "your_secret_key",
          {
            expiresIn: "1h", // Example: Token expires in 1 hour
          }
        );
        return res.status(200).json({ token });
        return res
          .status(200)
          .send({ data: userInfo, message: " You have been Registered" });
        console.log(userInfo);
      } else {
        // Handle timeout error
        return res.status(504).send("Request Timeout");
      }
    } catch (err) {
      // If an error occurs during execution, send a 500 Internal Server Error response
      console.error("Error occurred while adding User:", err);
      return res.status(500).send("Internal Server Error");
    }
  },

  router.post(
    "/signin",
    [
      body("password").notEmpty().withMessage("password cannot  be null"),
      body("phonenumber")
        .isLength({ max: 13, min: 10 })
        .withMessage("Phone number must be at least 10 characters")
        .notEmpty()
        .withMessage("password cannot be null"),
    ],
    async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        const { password, phonenumber } = req.body;
        if (!req.timeout) {
          // Check if the user already exists in the database
          const existingUser = await userInfos.findOne({
            where: {
              phonenumber: phonenumber,
            },
          });

          if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
          }

          // Compare passwords
          const passwordMatch = await bcrypt.compare(
            password,
            existingUser.password
          );

          if (!passwordMatch) {
            return res.status(401).json({ message: "Incorrect password" });
          }
          // Generate JWT token
          const token = JWT.sign(
            {
              username: existingUser.username,
              phonenumber: existingUser.phonenumber,
            },
            "your_secret_key",
            {
              expiresIn: "1h", // Example: Token expires in 1 hour
            }
          );
          return res.status(200).json({ token });
        }
      } catch (err) {
        console.error("Error occurred while signing in:", err);
        return res.status(500).send("Internal Server Error");
      }
    }
  )
);

export default router;
