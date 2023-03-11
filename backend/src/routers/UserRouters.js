import express from "express";
import { getSingleUser, postUser } from "../model/user/UserModel.js";

const router = express.Router();

//post method
router.post("/", async (req, res, next) => {
  try {
    const result = await postUser(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "New User Created Succesfully",
        })
      : res.json({
          status: "error",
          message: "Unable to register, Please try again",
        });
  } catch (error) {
    next(error);
  }
});

// get methdo
router.get("/", async (req, res, next) => {
  try {
    const result = await getSingleUser(req.body);

    res.json({
      status: "success",
      message: "New User Created Succesfully",
      result,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
