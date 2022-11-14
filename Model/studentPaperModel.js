const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { subjectSchema } = require("./subjectModel");

const studentPaperSchema = new mongoose.Schema({
  student: {
    // type: mongoose.Schema.Types.ObjectId,
    type: new mongoose.Schema({
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
  paper: {
    name: {
      type: String,
      required: true,
    },
    subject: {
      type: subjectSchema,
      required: true,
    },
    totalMarks: {
      type: Number,
      required: true,
    },
    _id: {
      type: mongoose.Types.ObjectId,
    },
  },
  status: {
    type: String,
    enum: {
      values: ["assigned", "inProgress", "submitted", "checked"],
      message: "{values} is not allowed",
    },
    default: "assigned",
    // required: true,
  },
  totalAttempt: {
    type: Number,
    min: [0, "attempt should be positive"],
    default: 0,
  },
  totalCorrect: {
    type: Number,
    min: [0, "totalCorrect should be positive"],
    default: 0,
  },
  obtainMarks: {
    type: Number,
    min: [0, "obtainMarks should be positive"],
    default: 0,
  },
});

const StudentPaper = mongoose.model("studentPaper", studentPaperSchema);

function validateStudentPaper(studentPaper) {
  const schema = new Joi.object({
    studentId: Joi.objectId().required(),
    paperId: Joi.objectId().required(),
    status: Joi.string(),
    totalAttempt: Joi.number(),
    totalCorrect: Joi.number(),
    obtainMarks: Joi.number(),
  });

  return schema.validate(studentPaper);
}

module.exports = { StudentPaper, studentPaperSchema, validateStudentPaper };
