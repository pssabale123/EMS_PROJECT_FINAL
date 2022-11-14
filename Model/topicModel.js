const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { subjectSchema } = require("./subjectModel");
const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [4, "minimum length of topic is 4"],
    maxLength: [255, "maximum length of topic is 255"],
    required: true,
  },
  subject: {
    type: subjectSchema,
    required: true,
  },
});

const Topic = mongoose.model("topic", topicSchema);

function validateTopic(topic) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(255).required(),
    subjectId: Joi.objectId(),
  });

  return schema.validate(topic);
}

module.exports = { Topic, topicSchema, validateTopic };
