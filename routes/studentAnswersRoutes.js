const express = require("express");
const router = express.Router();
router.use(express.json());
const { PaperQuestion } = require("../Model/paperQuestionModel");
const {
  StudentAnswer,
  validateStudentAnswer,
} = require("../Model/studentAnswersModel");
const { User } = require("../Model/userModel");

// const jwt_decode = require("jwt-decode");

router.get("/", async (req, res) => {
  const studentAnswers = await StudentAnswer.find();

  if (!studentAnswers)
    return res.status(404).send("studentAnswer with given id is not found....");

  res.status(200).send(studentAnswers);
});

router.get("/:id", async (req, res) => {
  const studentAnswer = await StudentAnswer.findById(req.params.id);

  if (!studentAnswer)
    return res.status(404).send("studentAnswer with given id is not found....");

  res.status(200).send(studentAnswer);
});

router.post("/", async (req, res) => {
  const { error } = validateStudentAnswer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const paperQuestion = await PaperQuestion.findById(req.body.paperQuestionId);

  // console.log(req.body.paperQuestionId);

  if (!paperQuestion)
    return res.status(404).send("paperQuestion withgiven id is not found...");

  const student = await User.findById(req.body.studentId);

  if (!student)
    return res.status(404).send("student is not found by given id..");

  const studentAnswer = new StudentAnswer({
    student: {
      _id: student._id,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
    },
    paperQuestion: {
      _id: paperQuestion._id,
      paper: paperQuestion.paper,
      serialNumber: paperQuestion.serialNumber,
      question: paperQuestion.question,
    },
    answer: req.body.answer,
    isCorrect: req.body.isCorrect,
  });

  await studentAnswer.save();
  res.status(200).send(studentAnswer);
  // } catch (err) {
  //   res.send(err);
  // }
});

router.put("/:id", async (req, res) => {
  const { error } = validateStudentAnswer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const paperQuestion = await PaperQuestion.findById(req.body.paperQuestionId);

  if (!paperQuestion)
    return res.status(404).send("paperQuestion withgiven id is not found...");

  const student = await User.findById(req.body.studentId);

  if (!student)
    return res.status(404).send("student is not found by given id..");

  const studentAnswer = await StudentAnswer.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        student: {
          _id: student._id,
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
        },
        paperQuestion: {
          _id: paperQuestion._id,
          paper: paperQuestion.paper,
          serialNumber: paperQuestion.serialNumber,
          question: paperQuestion.question,
        },
        answer: req.body.answer,
        isCorrect: req.body.isCorrect,
      },
    },
    { new: true }
  );

  if (!studentAnswer)
    return res.status(404).send("studentAnswer with given id is not found....");

  res.status(200).send(studentAnswer);
});

router.delete("/:id", async (req, res) => {
  const studentAnswer = await StudentAnswer.findByIdAndDelete(req.params.id);

  if (!studentAnswer)
    return res.status(404).send("studentAnswer with given id is not found....");

  res.status(200).send(studentAnswer);
});

// router.patch("/:id", async (req, res) => {

// });

module.exports = router;
