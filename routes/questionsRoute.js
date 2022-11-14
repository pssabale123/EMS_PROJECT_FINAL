const express = require("express");
const router = express.Router();
const { Question, validateQuestion } = require("../Model/questionModel");
const { AnswerOption } = require("../Model/answeroptionModel");
const { Topic } = require("../Model/topicModel");
// const { Schema, Mongoose } = require("mongoose");
const { ObjectId } = require("mongodb");
var mongoose = require("mongoose");
const { Subject } = require("../Model/subjectModel");
const { Paper } = require("../Model/paperModel");

router.use(express.json());

router.get("/", async (req, res) => {
  let query = {};

  const questions = await Question.find();
  if (!questions) return res.status(404).send("Question is not found...");
  res.send(questions);
});

router.get("/:id", async (req, res) => {
  const question = await Question.findById(req.params.id);
  if (!question) {
    return res.status(404).send("Question with given id is not found...");
  }
  res.status(200).send(question);
});

router.post("/pfs", async (req, res) => {
  // const subjectId = mongoose.Types.ObjectId(req.body.subjectId);
  let subjectId = req.body.subjectId;

  let query = {};

  // console.log("sub", subjectId);

  const paper = await Paper.findById(subjectId);

  // console.log("subj", paper.subject);

  if (subjectId) {
    query["topic.subject"] = paper.subject;
  }

  const questions = await Question.find(query);

  console.log("question", questions);

  res.status(200).send(questions);
});

router.post("/bySubject", async (req, res) => {
  let subjectId = ObjectId(req.body.subjectId);
  let topicId = ObjectId(req.body.topicId);

  let query = {};

  // console.log("sub", topicId);

  if (subjectId) {
    query["topic.subject._id"] = subjectId;
  }

  // if (topicId) {
  //   query["topic._id"] = topicId;
  // }

  const questions = await Question.find(query);

  console.log("question", questions);

  res.status(200).send(questions);
});

router.post("/byTopic", async (req, res) => {
  let topicId = ObjectId(req.body.topicId);

  let query = {};

  // console.log("sub", topicId);

  if (topicId) {
    query["topic._id"] = topicId;
  }

  const questions = await Question.find(query);

  console.log("question", questions);

  res.status(200).send(questions);
});

router.post("/", async (req, res) => {
  const { error } = validateQuestion(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const topic = await Topic.findById(req.body.topicId);

    if (!topic) {
      return res.status(404).send("topic with given id is not found...");
    }

    const question = new Question({
      questionNumber: req.body.questionNumber,
      text: req.body.text,
      topic: {
        _id: topic._id,
        name: topic.name,
        subject: topic.subject,
      },
      marks: req.body.marks,
      complexityLevel: req.body.complexityLevel,
      correctOption: req.body.correctOption,
      isActive: req.body.isActive,
    });

    await question.save();
    res.status(200).send(question);
  } catch (err) {
    res.send(err);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validateQuestion(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const topic = await Topic.findById(req.body.topicId);
  if (!topic) return res.status(404).send("topic with given id is not found");

  let answerOption;
  if (req.body.correctOptionId) {
    answerOption = await AnswerOption.findById(req.body.correctOptionId);
    if (!answerOption)
      return res.status(404).send("answerOption with given id is not found");
  }

  const question = await Question.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        questionNumber: req.body.questionNumber,
        text: req.body.text,
        topic,
        marks: req.body.marks,
        complexityLevel: req.body.complexityLevel,
        // correctOption: req.body.correctOption,
        correctOption: req.body.correctOptionId
          ? {
              _id: answerOption._id,
              option: answerOption.option,
              optionText: answerOption.optionText,
            }
          : req.body.correctOptionId,
        isActive: req.body.isActive,
      },
    },
    { new: true, runValidators: true }
  );

  if (!question)
    return res.status(404).send("question with given id is not found...");

  res.status(200).send(question);
});

router.delete("/:id", async (req, res) => {
  const questionId = req.params.id;
  const question = await Question.findByIdAndDelete(req.params.id);
  if (!question)
    return res.status(404).send("question with given id is not found");

  if (question) {
    const session = await Question.startSession();
    session.startTransaction();

    try {
      const answerOptions = await AnswerOption.find();

      answerOptions.map(async (a) => {
        // console.log(a.question._id + "  " + questionId);
        // console.log(a.question._id == questionId);
        if (a.question._id == questionId) {
          // console.log("a", a);
          await AnswerOption.findByIdAndDelete(a._id);
        }
      });
    } catch (err) {
      session.abortTransaction();
      throw err;
    }

    session.commitTransaction();
    session.endSession();
  }

  res.send(question);
});

// router.patch("/:id", async (req, res) => {
//   const option = await AnswerOption.findById(req.body.correctOptionId);
//   if (!option) return res.status(404).send("option with given id is not found");

//   const question = await Question.findByIdAndUpdate(
//     req.params.id,
//     {
//       $set: {
//         correctOption: {
//           _id: option._id,
//           option: option.option,
//           optionText: option.optionText,
//         },
//       },
//     },
//     { new: true }
//   );
//   if (!question) return res.status(400).send("Unbale to Patch/update...");
//   return res.status(200).send(question);
// });

module.exports = router;
