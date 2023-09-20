import express from "express";
import cors from "cors";
import { config } from "dotenv";
import session from "express-session";
import pgSession from "connect-pg-simple";
import { Pool } from "pg";

config();
const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.ORIGIN }));

const pool = new Pool({
  user: "shreyansh",
  host: "dpg-ck58pb6ru70s739btcjg-a",
  database: "cookie",
  password: "kmkFG96nttyaqKAdysTXoldWzFxPACwN",
  port: 5432,
});

const PgSession = pgSession(session);

app.use(
  session({
    store: new PgSession({
      pool: pool, // provide the Prisma instance connection
      tableName: "session", // specify the name of the session table in the database
    }),
    secret: config?.sessionSecretKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000, // Session expiration time (1 day) - time in milliseconds
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
