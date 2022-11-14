const mongoose = require("mongoose");
const Joi = require("joi");
const { questionSchema } = require("./questionModel");
Joi.objectId = require("joi-objectid")(Joi);

const Schema = mongoose.Schema;

const answerOptionSchema = new Schema({
  option: {
    type: String,
    required: true,
    minLength: [1, "option length is greter than  0 characters"],
    maxLength: [1, "option length is less than 1 characters"],
    required: true,
  },
  optionText: {
    type: String,
    minLength: [1, "option text lenght greter than 1 characters"],
    maxLength: [1024, "option text length less than 1024 characters"],
    required: true,
  },
  question: {
    type: new Schema({
      // questionNumber: {
      //   type: Number,
      //   min: [1, "Atleast 1 question number enter"],
      //   required: true,
      // },
      text: {
        type: String,
        minLength: [5, "Question text minimum 5 characters"],
        required: true,
      },
      marks: {
        type: Number,
        min: [0, "Marks should not less than zero"],
        max: [100, "Marks should not greater than hundred"],
        required: true,
      },
    }),
    required: true,
  },
  isCorrect: {
    type: Boolean,
    default: false,
    require: true,
  },
});

const AnswerOption = mongoose.model("answerOption", answerOptionSchema);

function validateAnswerOption(answerOption) {
  const schema = Joi.object({
    option: Joi.string().min(1).max(1).required(),
    optionText: Joi.string().min(1).max(1024).required(),
    questionId: Joi.objectId().required(),
    isCorrect: Joi.boolean().default(false),
  });

  return schema.validate(answerOption);
}

module.exports = { AnswerOption, answerOptionSchema, validateAnswerOption };
