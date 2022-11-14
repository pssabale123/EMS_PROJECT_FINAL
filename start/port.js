module.exports = function (app) {
  const PORT = 4000;

  app.listen(PORT, () => {
    console.log("listening on " + PORT);
  });
};
