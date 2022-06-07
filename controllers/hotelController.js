import Hotel from "../models/Hotels.js";

export const createHotel = async (req, res, next) => {
  const hotel = new Hotel(req.body);
  try {
    const savedHotel = await hotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

export const updateHotel = async (req, res, next) => {
  const id = req.params.id;
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
};

export const deleteHotel = async (req, res, next) => {
  const id = req.params.id;
  try {
    const updatedHotel = await Hotel.findByIdAndDelete(id);
    res.status(200).json("Hotel has been deleted");
  } catch (error) {
    next(error);
  }
};

export const getHotel = async (req, res, next) => {
  const id = req.params.id;
  try {
    const hotel = await Hotel.findById(id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

export const getAllHotels = async (req, res, next) => {
  const id = req.params.id;
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};
