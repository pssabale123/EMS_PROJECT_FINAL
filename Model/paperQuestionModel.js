const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectid = require("joi-objectid");
const { paperSchema } = require("./paperModel");
// const { questionSchema } = require("./questionModel");
const { topicSchema } = require("./topicModel");

const Schema = mongoose.Schema;

const paperQuestionSchema = new Schema({
  paper: {
    type: paperSchema,
    required: true,
  },
  serialNumber: {
    type: Number,

    min: 1,
  },
  question: {
    type: new Schema({
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
    }),
    required: true,
  },
});

const PaperQuestion = mongoose.model("paperQuestion", paperQuestionSchema);

function validatePaperQuestion(paperQuestion) {
  const schema = Joi.object({
    paperId: Joi.objectId().required(),
    serialNumber: Joi.number().min(1),
    questionId: Joi.objectId().required(),
  });

  return schema.validate(paperQuestion);
}

module.exports = { PaperQuestion, paperQuestionSchema, validatePaperQuestion };
