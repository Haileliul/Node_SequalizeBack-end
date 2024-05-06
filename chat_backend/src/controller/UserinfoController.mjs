import bcrypt from "bcrypt";
import db from "../model/index.mjs";
import { Op } from "sequelize";

const userInfos = db.userInfos;

// 1 . creating a User
const addUser = async (req, res) => {
  try {
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
      const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is the salt rounds

      let info = {
        userId: req.body.userId,
        username: req.body.username,
        phonenumber: req.body.phonenumber,
        password: hashedPassword,
        profileimageUrl: req.body.profileimageUrl,
        lastSeen: req.body.lastSeen,
        onlineStatus: req.body.onlineStatus,
      };

      const userInfo = await userInfos.create(info);
      return res
        .status(200)
        .send({ data: userInfo, message: " A User has been Registered" });
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
};

// 2 . get All Users
const getAllUsers = async (req, res) => {
  try {
    if (!req.timeout) {
      let users = await userInfos.findAll({
        /* attributes: [
                            'title',
                            'price'
                        ] */
      });
      // If no attachments are found, send a 404 Not Found response
      if (!users || users.length === 0) {
        return res.status(404).send("No User found");
      }
      res.status(200).send({ data: users, message: "usrs found" });
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

// 3. get One User

const getOneUser = async (req, res) => {
  try {
    if (!req.timeout) {
      let id = req.params.userId;
      let User = await userInfos.findone({
        where: { userId: id },
      });
      // If no attachments are found, send a 404 Not Found response
      if (!User) {
        return res.status(404).send("No User found");
      }
      return res.status(200).send({ data: User, message: "User found" });
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

// 4. Update a Single User

const UpdateOneUser = async (req, res) => {
  try {
    if (!req.timeout) {
      let id = req.params.userId;
      let User = await userInfos.update(req.body, {
        where: { userId: id },
      });
      return res
        .status(200)
        .send({ data: User, message: "User has been Updated  successfully" });
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

// 5. Delete a Single User

const deletOneUser = async (req, res) => {
  try {
    if (!req.timeout) {
      let id = req.params.userId;
      await userInfos.destroy({ where: { userId: id } });
      return res.status(200).send("attachment has been deleted");
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

export default {
  addUser,
};
