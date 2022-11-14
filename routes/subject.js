const express = require("express");
const router = express.Router();
router.use(express.json());

const { Subject, validateSubject } = require("../Model/subjectModel");

router.get("/", async (req, res) => {
  const subjects = await Subject.find({});

  if (subjects && subjects.length === 0) {
    res.status(404).send("subjects not found with given condition ");
    return;
  }
  res.status(200).send(subjects);
});

//read specific item
router.get("/:id", async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  if (!subject) {
    res.status(404).send("subject with given id not found....");
    return;
  }
  res.status(200).send(subject);
});

//create
router.post("/", async (req, res) => {
  let { error } = validateSubject(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const subject = new Subject({
    name: req.body.name,
  });
  await subject.save();
  res.status(200).send(subject);
});

//update
router.put("/:id", async (req, res) => {
  let { error } = validateSubject(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const subject = await Subject.findByIdAndUpdate(
    req.params.id,
    {
      $set: { name: req.body.name },
    },
    {
      new: true,
      runvalidators: true,
    }
  );

  if (!subject) return res.status(404).send("subject with given id not found");
  res.status(200).send(subject);
});

//delete specific item
router.delete("/:id", async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  if (!subject) {
    res.status(404).send("subject not found with specific Id....");
    return;
  }
  await Subject.deleteOne({ _id: req.params.id });

  res.status(200).send(subject);
});

module.exports = router;
    