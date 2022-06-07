import express from "express";
import {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getAllRooms,
} from "../controllers/roomController.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE

router.post("/:hotelId", verifyAdmin, createRoom);

//UPDATE

router.put("/:id", verifyAdmin, updateRoom);

//DELETE

router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

//GET
router.get("/:id", getRoom);

//GETALL

router.get("/", getAllRooms);

export default router;
