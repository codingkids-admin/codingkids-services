const PORT = process.env.PORT || 3001;

const HomeController = (req, res) =>
  res.status(200).json({
    code: 200,
    message: "Success running server",
  });

const ListenController = () => {
  console.log(`Server running: http://localhost:${PORT}`);
};

module.exports = { HomeController, ListenController, PORT };
