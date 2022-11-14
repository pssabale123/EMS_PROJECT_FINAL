const express = require("express");
// const admin = require("../middleware/admin");
// const auth = require("../middleware/auth");
// const validateObjectId = require("../middleware/validateObjectId");
const { Subject } = require("../Model/subjectModel");
const router = express.Router();
router.use(express.json());
const { Topic, validateTopic } = require("../Model/topicModel");

router.get("/", async (req, res) => {
  const topics = await Topic.find();
  if (!topics && topics.length === 0)
    return res.status(404).send("Topic is not found.");
  res.send(topics);
});

router.get("/:id", async (req, res) => {
  const topic = await Topic.findById(req.params.id);
  if (!topic)
    return res.status(404).send("topic with is given id is not found.");
  res.send(topic);
});

router.post("/", async (req, res) => {
  const { error } = validateTopic(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const subject = await Subject.findById(req.body.subjectId);
    if (!subject)
      return res.status(404).send("Subject with given id not found");

    const topic = new Topic({
      name: req.body.name,
      subject: {
        _id: subject._id,
        name: subject.name,
      },
    });

    await topic.save();
    res.send(topic);
  } catch (err) {
    res.send(err);
  }
});

router.put("/:id", async (req, res) => {
  const subject = await Subject.findById(req.body.subjectId);
  if (!subject) return res.status(404).send("Subject with given id not found");

  const topic = await Topic.findByIdAndUpdate(
    req.params.id,

    {
      $set: {
        name: req.body.name,
        subject: {
          _id: subject._id,
          name: subject.name,
        },
      },
    },
    { new: true, runValidators: true }
  );

  if (!topic)
    return res.status(404).send("topic with given id is not found...");

  res.status(200).send(topic);
});

router.delete("/:id", async (req, res) => {
  const topic = await Topic.findByIdAndDelete(req.params.id);
  if (!topic) return res.status(404).send("Topic with given id not found");
  res.status(200).send(topic);
});

module.exports = router;
