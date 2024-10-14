const express = require("express");
const PORT = process.env.PORT || 5000
const app = express();

app.use(cors());app.use(express.json());
app.use("/api/blogs", blogRouter);
app.use("/api", (req, res) => {
  res.send("Hello World!");});
app.listen(PORT, () => console.log(`app is running at ${PORT}`));
