const express = require("express");
const Passage = require("@passageidentity/passage-node");
const cors = require("cors");
const { getSupabase, getAuthSupabase } = require("./supabase");


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

app.get("/posts/:userID", async (req, res) => {
  const userID = req.params.userID;
  const supabase = getAuthSupabase(userID);
  const { data, error } = await supabase.from("posts").select();
  if (error) {
    res.json({
      error,
    });
  } else {
    res.json({
      posts: data,
    });
  }
});

app.post('/posts', async (req, res) => {
  const { userID } = req.body;
  const supabase = getAuthSupabase(userID);
  const { data, error } = await supabase
    .from('posts')
    .insert({
      title: req.body.title,
      body: req.body.body,
      author_name: req.body.author_name,
      topic_id: req.body.topic_id,
      user_id: userID,
    })

  if (error) {
    res.json({
      error,
    });
  } else {
    res.json({
      posts: data,
    });
  }
});


app.put('/posts', async (req, res) => {
  const { userID } = req.body;
  const supabase = getAuthSupabase(userID);
  const { data, error } = await supabase.from('posts').update({
    title: req.body.title,
    body: req.body.body,
  }).eq('id', req.body.id)

  if (error) {
    res.json({
      error,
    });
  } else {
    res.json({
      posts: data,
    });
  }
});

app.delete('/posts', async (req, res) => {
  const { userID } = req.body;
  const supabase = getAuthSupabase(userID);
  const { data, error } = await supabase.from('posts').delete().eq('id', req.body.id)

  if (error) {
    res.json({
      error,
    });
  } else {
    res.json({
      posts: data,
    });
  }
});

app.get("/comments/:userID", async (req, res) => {
  const userID = req.params.userID;
  const supabase = getAuthSupabase(userID);
  const { data, error } = await supabase.from("comments").select();
  if (error) {
    res.json({
      error,
    });
  } else {
    res.json({
      comments: data,
    });
  }
});

app.post('/comments', async (req, res) => {
  const { userID } = req.body;
  const supabase = getAuthSupabase(userID);
  const { data, error } = await supabase
    .from('comments')
    .insert({
      body: req.body.body,
      post_id: req.body.post_id,
      user_id: userID,
    })

  if (error) {
    res.json({
      error,
    });
  }
  else {
    res.json({
      comments: data,
    });
  }
});

app.put('/comments', async (req, res) => {
  const { userID } = req.body;
  const supabase = getAuthSupabase(userID);
  const { data, error } = await supabase.from('comments').update({
    body: req.body.body,
  }).eq('id', req.body.id)

  if (error) {
    res.json({
      error,
    });
  } else {
    res.json({
      comments: data,
    });
  }
});

app.delete('/comments', async (req, res) => {
  const { userID } = req.body;
  const supabase = getAuthSupabase(userID);
  const { data, error } = await supabase.from('comments').delete().eq('id', req.body.id)

  if (error) {
    res.json({
      error,
    });
  } else {
    res.json({
      comments: data,
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
      topics: data,
    });
  }
});

//therapy

app.get("/therapy", async (req, res) => {
  const supabase = getSupabase();
  const { data, error } = await supabase.from("therapy").select();
  if (error) {
    res.json({
      error,
    });
  } else {
    res.json({
      therapy: data,
    });
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
