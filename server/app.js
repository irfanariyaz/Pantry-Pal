import express from "express";
import session from "express-session";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import usersRouter from "./routes/users.js";
import googleRouter from "./routes/oauth/google.js";
import ingredientsRouter from "./routes/ingredient/ingredients.js";
import recipeRouter from "./routes/recipe/recipe.js";
import fridgeRouter from "./routes/fridge/fridge.js";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const app = express();

app.use(express.static(path.join(__dirname, './client/build')));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  optionsSuccessStatus: 200,
  credentials: true,
}
app.use(cors(corsOptions))


app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "testsign", //Used to sign sessionIDs. Will change later. -Tyler
    resave: false,
    saveUninitialized: true,
    cookie: {
      path: "/",
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    }, 
  })
);

app.use("/user", usersRouter);
app.use("/ingredient", ingredientsRouter);
app.use("/auth/google", googleRouter);
app.use("/recipes", recipeRouter);
app.use("/fridge", fridgeRouter);

export default app;
