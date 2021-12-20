const router = require("express").Router();
const { verifyTokenAndAdmin } = require("./verifyToken");

const Comment = require("../models/Comment");

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newComment = new Comment(req.body);

  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json("Comment has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Comment
router.get("/find/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL commentS
router.get("/", async (req, res) => {
  //query to get latest 5
  const qNew = req.query.new;
  //query to get by category
  const qCategory = req.query.category;
  try {
    let comments;

    if (qNew) {
      //query to get latest 5
      comments = await Comment.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      //query to get by category
      comments = await Comment.find({ categories: { $in: [qCategory] } });
    } else {
      comments = await Comment.find();
    }

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
