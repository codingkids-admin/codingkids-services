const app = require("express")();
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.status(200).json({
    code: 200,
    message: "Success running server",
  });
});

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});
