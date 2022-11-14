const express = require("express");
const {
  PaperQuestion,
  validatePaperQuestion,
} = require("../Model/paperQuestionModel");

const { Paper } = require("../Model/paperModel");
const { Question, questionSchema } = require("../Model/questionModel");
const router = express.Router();

router.use(express.json());

router.get("/", async (req, res) => {
  const paperQuestions = await PaperQuestion.find();
  if (!paperQuestions && paperQuestions.length === 0) {
    return res.status(404).send("paperQuestions is not found...");
  }
  res.status(200).send(paperQuestions);
});

router.get("/:id", async (req, res) => {
  const paperQuestion = await PaperQuestion.findById(req.params.id);

  if (!paperQuestion)
    return res.status(404).send("paperQuestion is not found with given id...");

  res.status(200).send(paperQuestion);
});

router.post("/byPaper", async (req, res) => {
  console.log(req.body.paper);
  if (!req.body.paper) return res.status(404).send([]);

  const paperQuestions = await PaperQuestion.find({
    "paper._id": req.body.paper,
  });

  res.status(200).send(paperQuestions);
});

router.post("/", async (req, res) => {
  const { error } = validatePaperQuestion(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // try {
  const paper = await Paper.findById(req.body.paperId);
  if (!paper) {
    return res.status(404).send("paper with given id is not found...");
  }

  const question = await Question.findById(req.body.questionId);

  if (!question)
    return res.status(404).send("question with given id is not found...");

  // if (question.isActive === false) {
  const session = await PaperQuestion.startSession();
  session.startTransaction();

  const paperQuestion = new PaperQuestion({
    paper: {
      _id: paper._id,
      name: paper.name,
      subject: paper.subject,
      totalMarks: paper.totalMarks,
    },
    serialNumber: req.body.serialNumber,
    question: {
      _id: question._id,
      questionNumber: question.questionNumber,
      text: question.text,
      marks: question.marks,
      topic: question.topic,
      complexityLevel: question.complexityLevel,
      correctOption: question.correctOption,
      isActive: true,
    },
  });

  try {
    await paperQuestion.save();

    await Question.findByIdAndUpdate(
      question._id,
      {
        $set: {
          isActive: true,
        },
      },
      { new: true, runValidators: true }
    );
  } catch (err) {
    session.abortTransaction();
    throw err;
  }

  session.commitTransaction();
  session.endSession();

  res.status(200).send(paperQuestion);
  // } catch (err) {
  //   res.send(err);
  // }
});

router.put("/:id", async (req, res) => {
  const { error } = validatePaperQuestion(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const paper = await Paper.findById(req.body.paperId);
  if (!paper) {
    return res.status(404).send("paper with given id is not found...");
  }

  const question = await Question.findById(req.body.questionId);

  if (!question)
    return res.status(404).send("question with given id is not found...");

  const paperQuestion = await PaperQuestion.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        paper: {
          _id: paper._id,
          name: paper.name,
          subject: paper.subject,
          totalMarks: paper.totalMarks,
        },
        serialNumber: req.body.serialNumber,
        question: {
          _id: question._id,
          questionNumber: question.questionNumber,
          text: question.text,
          marks: question.marks,
          topic: question.topic,
          complexityLevel: question.complexityLevel,
          correctOption: question.correctOption,
          isActive: question.isActive,
        },
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!paperQuestion)
    return res.status(404).send("paperQuestion is not found with given id...");

  res.status(200).send(paperQuestion);
});

router.delete("/:id", async (req, res) => {
  const paperQuestion = await PaperQuestion.findById(req.params.id);

  // console.log(paperQuestion.question.isActive);

  // if (paperQuestion.question.isActive === true) {
  const session = await PaperQuestion.startSession();
  session.startTransaction();

  const paperQuestions = await PaperQuestion.findById(req.params.id);

  try {
    // const question = await Question.findByIdAndUpdate(req.body.questionId);

    await Question.findByIdAndUpdate(
      paperQuestion.question._id,
      {
        $set: {
          isActive: false,
        },
      },
      { new: true, runValidators: true }
    );

    paperQuestions.question.isActive = false;
    await paperQuestions.save();
  } catch (err) {
    session.abortTransaction();
    throw err;
  }

  session.commitTransaction();
  session.endSession();
  // }

  // console.log("p", paperQuestion.question);

  const paperQuestionFilter = await PaperQuestion.findByIdAndDelete(
    req.params.id
  );

  if (!paperQuestionFilter)
    return res.status(404).send("paperQuestion is not found with given id...");

  res.status(200).send(paperQuestionFilter);
});

module.exports = router;
