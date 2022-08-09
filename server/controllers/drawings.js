const Drawing = require("../models/DrawingModel");

const createNewDrawing = async (req, res) => {
  try {
    const { url, viewType, createTime, creationDate, timeToCreate } = req.body;

    if (!req.email)
      return res.status(400).json({ message: "Info does not contain email" });

    if (!url)
      return res.status(400).json({ message: "Info does not contain url" });

    if (!viewType)
      return res
        .status(400)
        .json({ message: "Info does not contain view type" });

    if (!createTime)
      return res
        .status(400)
        .json({ message: "Info does not contain creation time" });

    if (!creationDate)
      return res
        .status(400)
        .json({ message: "Info does not contain creation date" });

    if (!timeToCreate)
      return res
        .status(400)
        .json({ message: "Info does not contain time to create" });

    const duplicate = await Drawing.findOne({ url }).exec();

    if (duplicate)
      return res.status(409).json({ message: "This picture already exists" });

    await Drawing.create({
      email: req.email,
      url,
      viewType,
      createTime,
      creationDate,
      timeToCreate,
    });

    res.status(201).json({ success: `New user picture created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyDrawings = async (req, res) => {
  const drawings = await Drawing.find({ email: req.email });
  if (!drawings) return res.status(204).json({ message: "No drawings found." });
  res.json(drawings);
};

const getAllDrawings = async (req, res) => {
  const drawings = await Drawing.find({ viewType: "public" });
  if (!drawings) return res.status(204).json({ message: "No drawings found." });
  res.json(drawings);
};

const deleteDrawing = async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: "Drawing ID required." });

  const drawing = await Drawing.findOne({ _id: id }).exec();
  if (!drawing) {
    return res.status(204).json({ message: `No drawing matches ID ${id}.` });
  }
  const result = await drawing.deleteOne();
  res.json(result);
};

module.exports = {
  getMyDrawings,
  getAllDrawings,
  createNewDrawing,
  deleteDrawing,
};
