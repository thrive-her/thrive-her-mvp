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

// passage authentication

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

//events

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

//forum

app.get("/posts", async (req, res) => {
  const supabase = getSupabase();
  const { data, error } = await supabase.from("posts").select();
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

app.post('/posts', async (req, res) => {
  const supabase = getSupabase();
    const { data, error } = await supabase
        .from('posts')
      .insert({
            topic_id: req.body.topic_id,
            title: req.body.title,
            body: req.body.body,
            author_name: req.body.author_name,
        })
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

app.get("/comments", async (req, res) => {
  const supabase = getSupabase();
  const { data, error } = await supabase.from("comments").select();
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

app.post('/comments', async (req, res) => {
  const supabase = getSupabase();
    const { data, error } = await supabase
        .from('comments')
        .insert({
            post_id: req.body.post_id,
            body: req.body.body,
            author_name: req.body.author_name,
        })
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


app.get("/topics", async (req, res) => {
  const supabase = getSupabase();
  const { data, error } = await supabase.from("topics").select();
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
