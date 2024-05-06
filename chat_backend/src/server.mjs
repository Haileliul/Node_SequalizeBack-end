import express from "express";
import cors from "cors";
import timeout from "connect-timeout";
import Productrouter from "./Routes/productRouter.mjs";
import Attachmentrouter from "./Routes/attachmentRouter.mjs";
import auth from "./Routes/auth.mjs";

const app = express();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

var corOptions = {
  origin: "https://localhost:8081",
};

//middlewares

app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Add timeout middleware
app.use(timeout("5s")); // Set timeout to 5 seconds

// routers
app.use("/api/products", Productrouter);
app.use("/api/attachment", Attachmentrouter);
app.use("/auth", auth);

app.get("/", (request, response) => {
  response.json({ message: "hellow from api" });
  // response.send("hellow this is from back end");
});
