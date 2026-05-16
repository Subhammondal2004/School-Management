import express from "express";
import { addSchool, listSchools } from "../controllers/school-controller.js";

const router = express.Router();

router.route("/addschool").post(addSchool)
router.route("/listschools").get(listSchools)

export default router;