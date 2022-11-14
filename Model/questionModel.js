const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { topicSchema } = require("./topicModel");

const questionSchema = new Schema({
  questionNumber: {
    type: Number,
    min: [1, "Atleast 1 question number enter"],
    // required: true,
  },
  text: {
    type: String,
    minLength: [5, "Question text minimum 5 characters"],
    required: true,
  },
  topic: {
    type: topicSchema,
    required: true,
  },
  marks: {
    type: Number,
    min: [0, "Marks should not less than zero"],
    max: [100, "Marks should not greater than hundred"],
    required: true,
  },
  complexityLevel: {
    type: String,
    enum: {
      values: ["easy", "medium", "difficult"],
      message: "{value} value is not supported",
    },
    required: true,
  },
  correctOption: {
    // type: mongoose.Types.ObjectId,
    type:
      null ||
      new Schema({
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
      }),

    default: null,

    // required: true,
  },
  isActive: {
    type: Boolean,
    // required: true,
    default: false,
  },
});

const Question = mongoose.model("question", questionSchema);

function validateQuestion(question) {
  const schema = Joi.object({
    questionNumber: Joi.number(),
    text: Joi.string().min(5).required(),
    topicId: Joi.objectId().required(),
    marks: Joi.number().required(),
    complexityLevel: Joi.string().required(),
    correctOptionId: Joi.objectId().allow(null),
    isActive: Joi.boolean().default(false),
  });

  return schema.validate(question);
}

module.exports = { Question, questionSchema, validateQuestion };
