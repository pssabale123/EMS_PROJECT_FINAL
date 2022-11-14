const express = require("express");
const { Subject } = require("../Model/subjectModel");
const router = express.Router();
router.use(express.json());
const { Paper, paperSchema, validatePaper } = require("../Model/paperModel");

router.get("/", async (req, res) => {
  const papers = await Paper.find();
  if (!papers && papers.length === 0)
    return res.status(404).send("Paper is not found.");
  res.send(papers);
});
router.get("/:id", async (req, res) => {
  const paper = await Paper.findById(req.params.id);
  if (!paper)
    return res.status(404).send("paper with is given id is not found.");
  res.send(paper);
});

router.post("/", async (req, res) => {
  const { error } = validatePaper(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const subject = await Subject.findById(req.body.subjectId);
    if (!subject)
      return res.status(404).send("Subject with given id not found");

    const paper = new Paper({
      name: req.body.name,
      subject: {
        _id: subject._id,
        name: subject.name,
      },
      totalMarks: req.body.totalMarks,
    });

    await paper.save();
    res.send(paper);
  } catch (err) {
    res.send(err);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validatePaper(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const subject = await Subject.findById(req.body.subjectId);
  if (!subject) return res.status(404).send("Subject with given id not found");

  const paper = await Paper.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        subject: {
          _id: subject._id,
          name: subject.name,
        },
        totalMarks: req.body.totalMarks,
      },
    },
    { new: true, runValidators: true }
  );

  if (!paper)
    return res.status(404).send("paper with is given id is not found.");
  res.send(paper);
});

router.delete("/:id", async (req, res) => {
  const paper = await Paper.findById(req.params.id);

  if (!paper) return res.status(404).send("paper with given id is not found");

  await paper.deleteOne({ _id: req.params.id });
  res.status(200).send(paper);
});

module.exports = router;
