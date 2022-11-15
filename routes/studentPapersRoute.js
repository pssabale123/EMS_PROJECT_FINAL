const express = require("express");
const {
  StudentPaper,
  validateStudentPaper,
} = require("../Model/studentPaperModel");
const { User } = require("../Model/userModel");
const { Paper } = require("../Model/paperModel");
const { StudentAnswer } = require("../Model/studentAnswersModel");
const router = express.Router();

router.use(express.json());

router.get("/", async (req, res) => {
  const studentPapers = await StudentPaper.find();

  if (studentPapers && studentPapers.length === 0) {
    return res.status(404).send("studentPaper is not found....");
  }

  res.status(200).send(studentPapers);
});

router.get("/:id", async (req, res) => {
  const studentPaper = await StudentPaper.findById(req.params.id);
  if (!studentPaper) {
    return res.status(404).send("studentPaper with given id is not found....");
  }

  res.status(200).send(studentPaper);
});

// router.post("/getResult", async (req, res) => {
//   const { totalAttempts, totalCorrects, paperId, studentId } = req.body;

//   const studentPapers = await StudentPaper.find({
//     "paper._id": paperId,
//     "student._id": studentId,
//   });

//   console.log(studentPapers);

//   // const studentPaper = studentPapers[0];
//   // const studentAnswers = await StudentAnswer.find({
//   //   "student._id": req.body.studentId,
//   // });
//   // let totalCorrect = 0;
//   // let totalAttemptd = 0;
//   // let obtainMarks = 0;

//   // totalAttemptd = studentAnswers.length;

//   // studentAnswers.map((studentAnswer) => {
//   //   if (studentAnswer.isCorrect) {
//   //     totalCorrect += 1;
//   //     obtainMarks += studentAnswer.paperQuestion.question.marks;
//   //   }
//   // });

//   // studentPaper.totalCorrect = totalCorrect;
//   // studentPaper.totalAttemptd = totalAttemptd;
//   // studentPaper.obtainMarks = obtainMarks;

//   // const session = await StudentPaper.startSession();

//   // session.startTransaction();

//   try {
//     await studentPaper.save();
//     await StudentAnswer.deleteMany({ "student._id": req.body.studentId });

//     res.status(200).send(studentPaper);
//   } catch (err) {
//     session.abortTransaction();
//     throw err;
//   }
//   session.commitTransaction();
//   session.endSession();
// });

router.post("/", async (req, res) => {
  const { error } = validateStudentPaper(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const student = await User.findById(req.body.studentId);
  if (!student)
    return res.status(404).send("student with given id is not found...");

  const paper = await Paper.findById(req.body.paperId);
  if (!paper)
    return res.status(404).send("paper with given id is not found...");

  const studentPaper = new StudentPaper({
    student: {
      _id: student._id,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
    },
    paper: {
      _id: paper._id,
      name: paper.name,
      subject: paper.subject,
      totalMarks: paper.totalMarks,
    },
    status: req.body.status,
    totalAttempt: req.body.totalAttempt,
    obtainMarks: req.body.obtainMarks,
    totalCorrect: req.body.totalCorrect,
  });

  await studentPaper.save();
  res.status(200).send(studentPaper);
});

router.put("/:id", async (req, res) => {
  const { error } = validateStudentPaper(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const student = await User.findById(req.body.studentId);
  if (!student)
    return res.status(404).send("student with given id is not found...");

  const paper = await Paper.findById(req.body.paperId);
  if (!paper)
    return res.status(404).send("paper with given id is not found...");

  const studentPaper = await StudentPaper.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        student: {
          _id: student._id,
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
        },
        paper: {
          _id: paper._id,
          name: paper.name,
          subject: paper.subject,
          totalMarks: paper.totalMarks,
        },
        status: req.body.status,
        totalAttempt: req.body.totalAttempt,
        obtainMarks: req.body.obtainMarks,
        totalCorrect: req.body.totalCorrect,
      },
    },
    { new: true }
  );

  //

  const session = await StudentPaper.startSession();

  session.startTransaction();

  try {
    await studentPaper.save();

    if (studentPaper.status == "assigned") {
      await StudentAnswer.deleteMany({
        "student._id": req.body.studentId,
        "paperQuestion.paper._id": req.body.paperId,
      });
    }

    res.status(200).send(studentPaper);
  } catch (err) {
    session.abortTransaction();
    throw err;
  }
  session.commitTransaction();
  session.endSession();

  //

  // if (!studentPaper) {
  //   return res.status(404).send("studentPaper with given id is not found....");
  // }

  // res.status(200).send(studentPaper);
});

router.delete("/:id", async (req, res) => {
  const studentPaper = await StudentPaper.findByIdAndDelete(req.params.id);

  if (!studentPaper) {
    return res.status(404).send("studentPaper with given id is not found...");
  }

  res.status(200).send(studentPaper);
});
router.patch("/:id", async (req, res) => {
  const { totalAttempt, totalCorrect, obtainMarks, status } = req.body;

  // console.log("Action",);

  const studentPaper = await StudentPaper.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        totalAttempt: totalAttempt,
        totalCorrect: totalCorrect,
        obtainMarks: obtainMarks,
        status: status,
      },
    },
    { new: true }
  );

  if (!studentPaper) return res.status(400).send("Unbale to Update");
  return res.status(200).send(studentPaper);
});

module.exports = router;
