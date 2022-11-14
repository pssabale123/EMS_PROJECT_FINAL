const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
Joi.objectid = require("joi-objectid");
const { paperQuestionSchema } = require("./paperQuestionModel");

const studentAnswerSchema = new Schema({
  student: {
    // type: mongoose.Schema.Types.ObjectId,
    type: new Schema({
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    }),
    required: true,
  },
  paperQuestion: {
    // type: mongoose.Schema.Types.ObjectId,
    type: paperQuestionSchema,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
});

const StudentAnswer = mongoose.model("studentAnswer", studentAnswerSchema);

function validateStudentAnswer(studentAnswer) {
  const schema = Joi.object({
    studentId: Joi.objectId(),
    paperQuestionId: Joi.objectId(),
    answer: Joi.string().required(),
    isCorrect: Joi.boolean(),
  });
  return schema.validate(studentAnswer);
}

module.exports = { StudentAnswer, studentAnswerSchema, validateStudentAnswer };
