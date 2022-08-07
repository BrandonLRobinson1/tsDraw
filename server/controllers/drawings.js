const Drawing = require("../models/DrawingModel");

const createNewDrawing = async (req, res) => {
  try {

    const { email, url, viewType, createTime, creationDate, timeToCreate } =
      req.body;

    if (!email)
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

    const result = await Drawing.create({
      email,
      url,
      viewType,
      createTime,
      creationDate,
      timeToCreate,
    });

    console.log(result);

    res.status(201).json({ success: `New user picture created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllDrawings = async (req, res) => {
  const drawings = await Drawing.find();
  if (!drawings) return res.status(204).json({ 'message': 'No drawings found.' });
  res.json(drawings);
}

const deleteDrawing = async (req, res) => {
  if (!req?.body?.id) return res.status(400).json({ 'message': 'Drawing ID required.' });

  const drawing = await Drawing.findOne({ _id: req.body.id }).exec();
  if (!drawing) {
      return res.status(204).json({ "message": `No drawing matches ID ${req.body.id}.` });
  }
  const result = await drawing.deleteOne();
  res.json(result);
}

module.exports = {
  getAllDrawings,
  createNewDrawing,
  deleteDrawing,
}