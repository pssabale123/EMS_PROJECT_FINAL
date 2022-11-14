const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { subjectSchema } = require("./subjectModel");

const paperSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "paper name length must be greater than or equal to 3 "],
    maxLength: [50, "paper name length must be less than or equal to 50 "],
    required: true,
  },
  subject: {
    type: subjectSchema,
    required: true,
  },
  totalMarks: {
    type: Number,
    min: [10, "totalMarks is must be grater than or equal to 10"],
    max: [100, "totalMarks is less than or equal to 100"],
    required: true,
  },
});

const Paper = mongoose.model("paper", paperSchema);

function validatePaper(paper) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    subjectId: Joi.objectId(),
    totalMarks: Joi.number().min(10).max(100).required(),
  });

  return schema.validate(paper);
}

module.exports = { Paper, paperSchema, validatePaper };
