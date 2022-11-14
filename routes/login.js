const express = require("express");

const { User, userSchema } = require("../Model/userModel");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const router = express.Router();

router.use(express.json());

router.post("/", async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ userName: req.body.username });
  if (!user) return res.status(404).send("Invalid userName");

  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(400).send("Invalid email or passwaord");

  let token = user.getAuthToken();
  res.status(200).send(token);
  console.log(token);
});

function validateLogin(data) {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(data);
}

module.exports = router;
