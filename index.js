const express = require("express");
const request = require("request");
const cors = require("cors");
require("dot-env").config();

const app = express();

app.use(cors());

// Bodyparser Middleware
app.use(express.json());

// Signup Route
app.post("/signup", (req, res) => {
  const { email } = req.body;

  // Make sure fields are filled
  if (!email) {
    res.send("Email field cannot be empty");
    return;
  }

  // Construct req data
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: "Balogun",
          LNAME: "Opeoluwa",
        },
      },
    ],
  };

  const postData = JSON.stringify(data);

  const options = {
    url: "https://us14.api.mailchimp.com/3.0/lists/eb07920e1e",
    method: "POST",
    headers: {
      Authorization: "auth " + process.env.MAILCHIMP_KEY,
    },
    body: postData,
  };

  try {
    request(options, (err, response, body) => {
      if (err) {
        res.send("Please re enter your email");
      } else {
        res.send("you have been added to the freebies list");
      }
    });
  } catch (err) {}
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));
