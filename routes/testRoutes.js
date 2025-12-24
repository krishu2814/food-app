import express from "express";
import testUserController from "../controllers/testControllers.js";

// router oblect
const router = express.Router();

// test routes -> router
// router -> GET / POST / UPDATE / DELETE
router.get("/test-user", testUserController);

// export
export default router;
