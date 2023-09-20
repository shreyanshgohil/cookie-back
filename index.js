import MongoDBSession from 'connect-mongodb-session';
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import session from "express-session";


config();
const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.ORIGIN }));

const MongoDbStore = MongoDBSession(session);


const store = new MongoDbStore({
  uri: "mongodb+srv://shreyansh:fK2OXSG2gwFJiYfp@cluster0.q1f2mq0.mongodb.net/",
  collection: 'sessions',
});

app.use(
  session({
    secret: "DDSDKSDMKDMSKMDD",
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      secure: true,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // Session expiration time (1 day)
      sameSite: "none",
    },
  })
);

app.post("/hello-wrold", (req, res, next) => {
  req.session.accessToken = Math.random().toString();
  res
    .cookie("hello", "From abc", {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      secure: true,
      sameSite: "none",
    })
    .json({ Done: "Done" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is started on port ${process.env.PORT}`);
});
