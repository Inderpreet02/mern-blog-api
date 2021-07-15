const express = require("express")
const app = express();
const dotevn = require("dotenv")
const mongoose = require('mongoose');
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const postRoute = require("./routes/posts")
const categoriesRoute = require("./routes/categories")
const multer = require ("multer");
const PORT = process.env.PORT || "5000";

dotevn.config();
app.use(express.json())

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true,
        useFindAndModify:false,
    })
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, "images");
        },
        filename: (req, file, cb) => {
          cb(null, "hello.jpeg");
        },
    });
      
    const upload = multer({ storage: storage });
    app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
    });

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoriesRoute);


app.listen(PORT, ()=>{
    console.log("Backend is running");
})
