const express = require("express");
const router = express.Router();
const {
  AnswerOption,
  answerOptionSchema,
  validateAnswerOption,
} = require("../Model/answeroptionModel");

const { Question } = require("../Model/questionModel");

router.use(express.json());

router.get("/", async (req, res) => {
  const answerOptions = await AnswerOption.find().sort({ option: 1 });

  if (!answerOptions && answerOptions.length === 0) {
    return res.status(404).send("answerOption not found....");
  }
  res.status(200).send(answerOptions);
});

router.get("/:id", async (req, res) => {
  const answerOption = await AnswerOption.findById(req.params.id);

  if (!answerOption) {
    return res.status(404).send("answerOption with given id is not found....");
  }
  res.status(200).send(answerOption);
});

router.post("/", async (req, res) => {
  const { error } = validateAnswerOption(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const question = await Question.findById(req.body.questionId);
  if (!question)
    return res.status(404).send("question with given id is not found....");

  const answerOption = new AnswerOption({
    option: req.body.option,
    optionText: req.body.optionText,
    question: {
      _id: question._id,
      questionNumber: question.questionNumber,
      marks: question.marks,
      text: question.text,
    },
    isCorrect: req.body.isCorrect,
  });
  await answerOption.save();

  if (req.body.isCorrect === true) {
    const session = await AnswerOption.startSession();
    session.startTransaction();

    try {
      // const question = await Question.findByIdAndUpdate(req.body.questionId);

      await Question.findByIdAndUpdate(
        req.body.questionId,
        {
          $set: {
            correctOption: {
              _id: answerOption._id,
              option: answerOption.option,
              optionText: answerOption.optionText,
            },
          },
        },
        { new: true, runValidators: true }
      );

      await answerOption.question.save();
    } catch (err) {
      session.abortTransaction();
      throw err;
    }

    session.commitTransaction();
    session.endSession();
  }

  if (!answerOption) {
    return res.status(404).send("answerOption not found....");
  }
  res.status(200).send(answerOption);
});

router.put("/:id", async (req, res) => {
  const { error } = validateAnswerOption(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const question = await Question.findById(req.body.questionId);
  if (!question)
    return res.status(404).send("question with given id is not found....");

  const answerOption = await AnswerOption.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        option: req.body.option,
        optionText: req.body.optionText,
        question: {
          _id: question._id,
          questionNumber: question.questionNumber,
          marks: question.marks,
          text: question.text,
        },
        isCorrect: req.body.isCorrect,
      },
    },
    {
      new: true,
    }
  );

  if (req.body.isCorrect === true) {
    const session = await AnswerOption.startSession();
    session.startTransaction();

    try {
      // const question = await Question.findByIdAndUpdate(req.body.questionId);

      await Question.findByIdAndUpdate(
        req.body.questionId,
        {
          $set: {
            correctOption: {
              _id: answerOption._id,
              option: answerOption.option,
              optionText: answerOption.optionText,
            },
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
  } else {
    const session = await AnswerOption.startSession();
    session.startTransaction();

    try {
      await Question.findByIdAndUpdate(
        req.body.questionId,
        {
          $set: {
            correctOption: null,
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
  }

  if (!answerOption) {
    return res.status(404).send("answerOption not found....");
  }
  res.status(200).send(answerOption);
});

router.delete("/:id", async (req, res) => {
  // const answerOptionFind = await AnswerOption.findById(req.params.id);

  const answerOption = await AnswerOption.findByIdAndDelete(req.params.id);

  // console.log(answerOptionFind.isCorrect === true);

  if (answerOption.isCorrect === true) {
    const session = await AnswerOption.startSession();
    session.startTransaction();

    try {
      await Question.findByIdAndUpdate(
        answerOption.question._id,
        {
          $set: {
            correctOption: null,
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
  }

  if (!answerOption)
    return res.status(404).send("answerOption with given id is not found");

  res.send(answerOption);
});

module.exports = router;
