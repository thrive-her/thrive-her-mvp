const express = require("express");
const Passage = require("@passageidentity/passage-node");
const cors = require("cors");
const { getSupabase } = require("./supabase");

const app = express();
const PORT = 7001;
const CLIENT_URL = "http://localhost:3000";

require("dotenv").config();

app.use(express.json());
app.use(
  cors({
    origin: CLIENT_URL,
  })
);

const passage = new Passage({
  appID: process.env.PASSAGE_APP_ID,
  apiKey: process.env.PASSAGE_API_KEY,
  authStrategy: "HEADER",
});

app.post("/auth", async (req, res) => {
  try {
    const userID = await passage.authenticateRequest(req);
    if (userID) {
      // user is authenticated
      const { email, phone } = await passage.user.get(userID);
      const identifier = email ? email : phone;

      res.json({
        authStatus: "success",
        identifier,
      });
    }
  } catch (e) {
    // authentication failed
    console.log(e);
    res.json({
      authStatus: "failure",
    });
  }
});

app.get("/events", async (req, res) => {
  const supabase = getSupabase();
  const { data, error } = await supabase.from("events").select();
  if (error) {
    res.json({
      error,
    });
  } else {
    res.json({
      events: data,
    });
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
