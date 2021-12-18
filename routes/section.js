const router = require("express").Router();
const { verifyTokenAndAdmin } = require("./verifyToken");

const Section = require("../models/Section");

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newSection = new Section(req.body);

  try {
    const savedSection = await newSection.save();
    res.status(200).json(savedSection);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedSection = await Section.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedSection);
  } catch (error) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Section.findByIdAndDelete(req.params.id);
    res.status(200).json("Section has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET SECTION
router.get("/find/:id", async (req, res) => {
  try {
    const section = await Section.findById(req.params.id);

    res.status(200).json(section);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL sectionS
router.get("/", async (req, res) => {
  //query to get latest 5
  const qNew = req.query.new;
  //query to get by category
  const qCategory = req.query.category;
  try {
    let sections;

    if (qNew) {
      //query to get latest 5
      sections = await Section.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      //query to get by category
      sections = await Section.find({ categories: { $in: [qCategory] } });
    } else {
      sections = await Section.find();
    }

    res.status(200).json(sections);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
