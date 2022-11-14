const express = require("express");
const router = express.Router();
router.use(express.json());

const { User, validateUser } = require("../Model/userModel");

router.get("/", async (req, res) => {
  const users = await User.find({});

  if (users && users.length === 0) {
    res.status(404).send("users not found with given condition ");
    return;
  }
  res.status(200).send(users);
});

//read specific item
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404).send("user with given id not found....");
    return;
  }
  res.status(200).send(user);
});

const bcrypt = require("bcrypt");
const lodash = require("lodash");

router.post("/", async (req, res) => {
  let { error } = validateUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  let userExist = await User.findOne({ email: req.body.email });
  if (userExist) {
    return res.status(400).send("User already Registered..");
  }
  const user = new User({
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    userName: req.body.username,
    password: req.body.password,
    role: req.body.role,
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);

  await user.save();

  res
    .status(200)
    .send(
      lodash.pick(user, [
        "firstName",
        "lastName",
        "_id",
        "email",
        "phone",
        "userName",
        "role",
      ])
    );
});

//create
// router.post("/", async (req, res) => {
//   let { error } = validateUser(req.body);
//   if (error) {
//     res.status(400).send(error.details[0].message);
//     return;
//   }
//   const user = new User({
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     phone: req.body.phone,
//     userName: req.body.userName,
//     password: req.body.password,
//     role: req.body.role,
//   });
//   await user.save();
//   res.status(200).send(user);
// });

router.put("/:id", async (req, res) => {
  let { error } = validateUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const salt = await bcrypt.genSalt(10);
  encryptedPassword = await bcrypt.hash(req.body.password, salt);

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        userName: req.body.username,
        role: req.body.role,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!user) {
    res.status(404).send("user with specific id not found");
    return;
  }

  res
    .status(200)
    .send(
      lodash.pick(user, [
        "_id",
        "firstName",
        "lastName",
        "email",
        "phone",
        "userName",
        "role",
      ])
    );
});

//update
// router.put("/:id", async (req, res) => {
//   let { error } = validateUser(req.body);
//   if (error) {
//     res.status(400).send(error.details[0].message);
//     return;
//   }

//   const user = await User.findByIdAndUpdate(
//     req.params.id,
//     {
//       $set: {
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         email: req.body.email,
//         phone: req.body.phone,
//         userName: req.body.userName,
//         password: req.body.password,
//         role: req.body.role,
//       },
//     },
//     {
//       new: true,
//       runvalidators: true,
//     }
//   );

//   if (!user) return res.status(404).send("user with given id not found");
//   res.status(200).send(user);
// });

router.delete("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404).send("User not exist....");
    return;
  }
  const result = await User.findByIdAndDelete(req.params.id);
  if (!result) {
    res.status(400).send("User not deleted..");
    return;
  }
  res
    .status(200)
    .send(
      lodash.pick(user, [
        "firstName",
        "lastName",
        "_id",
        "email",
        "phone",
        "userName",
        "role",
      ])
    );
});

module.exports = router;
