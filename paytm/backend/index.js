const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/index");
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.use("/api/v1", rootRouter);
app.get("/", (req, res) => {
    res.send("Server is running");
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
