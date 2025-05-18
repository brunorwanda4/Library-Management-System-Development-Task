require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Hello guys 🫡" });
});

const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Library_DB",
});

db.connect((e) => {
  if (e) throw e;
  console.log("DB Is connected 🌻");
});

// ------------ users --------------
const bcrypt = require("bcrypt");
app.post("/users", (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res
      .status(406)
      .json({ message: "username , password, role are required" });
  }

  if (role !== "librarian" && role !== "assistant") {
    return res.status(406).json({
      message: "user role is not supported user librarian, assistant",
    });
  }

  db.query("SELECT * FROM Users WHERE username = ?", [username], (gE, gR) => {
    if (gE)
      return res
        .status(500)
        .json({ message: "get User error", error: gE.message });
    if (gR.length !== 0)
      return res.status(400).json({ message: "username is ready exist" });

    bcrypt.hash(password, 10, (hE, hR) => {
      if (hE)
        return res.status(500).json({
          message: "Some thing went wrong to hash password",
          error: hE.message,
        });
      db.query(
        "INSERT INTO Users (username , password, role) VALUES (? ,? ,?)",
        [username, hR, role],
        (iE, iR) => {
          if (iE)
            return res
              .status(500)
              .json({ message: "insert user error", error: iE.message });

          return res
            .status(201)
            .json({ message: "Create user successful", id: iR.insertId });
        }
      );
    });
  });
});

// -------------------login-------------------
const jwt = require("jsonwebtoken");
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(406)
      .json({ message: "username and password are required" });
  }

  db.query("SELECT * FROM Users WHERE username = ?", [username], (gE, gR) => {
    if (gE)
      return res
        .status(500)
        .json({ message: "Get user Err", error: gE.message });

    if (gR.length <= 0) {
      return res.status(404).json({ message: "username not found" });
    }

    const user = gR[0];

    bcrypt.compare(password, user.password, (cE, cR) => {
      if (cE)
        return res
          .status(500)
          .json({ message: "Compare Password error", error: cE.message });

      if (cR) {
        const token = jwt.sign(
          {
            username: user.username,
            role: user.role,
            id: user.userId,
          },
          process.env.KEY,
          { expiresIn: "2days" }
        );

        delete user.password;
        return res
          .status(200)
          .json({ message: "login success full", user, token });
      } else {
        return res
          .status(200)
          .json({ message: "Password are not match", why: cR });
      }
    });
  });
});

app.get("/users", (req, res) => {
  db.query("SELECT * FROM Users", (gE, gR) => {
    if (gE)
      return res
        .status(500)
        .json({ message: "Get users Err", error: gE.message });
    return res.status(200).json(gR);
  });
});

app.get("/users", (req, res) => {
  db.query("SELECT * FROM Users", (gE, gR) => {
    if (gE)
      return res
        .status(500)
        .json({ message: "Get users Err", error: gE.message });
    return res.status(200).json(gR);
  });
});

app.patch("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  const updateFields = [];
  const queryParams = [];

  if (username !== undefined) {
    updateFields.push("username = ?");
    queryParams.push(username);
  }

  if (password !== undefined) {
    updateFields.push("password = ?");
    try {
      const hP = await bcrypt.hash(password, 10);
      queryParams.push(hP);
    } catch (hashError) {
      return res.status(500).json({
        message: "Error processing password",
        error: hashError.message,
      });
    }
  }

  if (updateFields.length === 0) {
    return res.status(406).json({
      message: "No valid fields (username, password) provided for update",
    });
  }

  const q = "UPDATE users SET " + updateFields.join(", ") + " WHERE userId = ?";

  queryParams.push(+id);

  db.query(q, queryParams, (uE, uR) => {
    if (uE) {
      return res
        .status(500)
        .json({ message: "Update error executing query", error: uE.message });
    }

    if (uR.affectedRows === 0)
      return res
        .status(404)
        .json({ message: `user with id ${id} not found or no changes made` });

    return res
      .status(200)
      .json({ message: `Update successful for user with id ${id}` });
  });
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM users WHERE userId = ?", [id], (dE, dR) => {
    if (dE)
      return res
        .status(500)
        .json({ message: "delete user error", error: dE.message });
    if (dR.length === 0)
      return res.status(404).json({ message: "user don't exists" });
    return res.status(200).json({ message: "delete user  successful" });
  });
});

// -------------- Members ----------

app.post("/members", (req, res) => {
  const { firstName, email, phone, lastName } = req.body;

  if (!firstName || !email || !phone || !lastName) {
    return res
      .status(406)
      .json({ message: "firstName , email , phone, lastName are required" });
  }

  db.query("SELECT * FROM Members WHERE email = ?", [email], (gE, gR) => {
    if (gE)
      return res
        .status(500)
        .json({ message: "get member Error", error: gE.message });
    if (gR.length !== 0)
      return res.status(400).json({ message: "email is ready exits" });

    db.query(
      "INSERT INTO members (firstName , email , phone, lastName) VALUES (?, ?, ?, ?)",
      [firstName, email, phone, lastName],
      (iE, iR) => {
        if (iE)
          return res
            .status(500)
            .json({ message: "insert member Error", error: iE.message });

        return res
          .status(201)
          .json({ message: " member created successful", id: iR.insertId });
      }
    );
  });
});

app.get("/members", (req, res) => {
  db.query("SELECT * FROM members", (gE, gR) => {
    if (gE)
      return res
        .status(500)
        .json({ message: "Err to get members", error: gE.message });
    return res.status(200).json(gR);
  });
});

app.get("/members/:id", (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM members WHERE memberId = ?", [id], (gE, gR) => {
    if (gE)
      return res
        .status(500)
        .json({ message: "Err to get members", error: gE.message });
    if (gR.length < 0) return res.status(404).json({ message: "Id not found" });

    return res.status(200).json(gR[0]);
  });
});

app.delete("/members/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM members WHERE memberId = ?", [id], (dE, dR) => {
    if (dE)
      return res
        .status(400)
        .json({ message: "Delete member Error", error: dE.message });

    return res.status(200).json({ message: "Delete member is successful" });
  });
});

app.patch("/members/:id", (req, res) => {
  const { id } = req.params;
  const { firstName, email, phone, lastName } = req.body;

  const fields = [];
  const params = [];

  if (!firstName && !email && !phone && !lastName) {
    return res
      .status(400)
      .json({ message: "firstName, email, phone, lastName are required" });
  }

  if (firstName !== undefined) {
    fields.push("firstName = ?");
    params.push(firstName);
  }
  if (lastName !== undefined) {
    fields.push("lastName = ?");
    params.push(lastName);
  }

  if (email !== undefined) {
    db.query(
      "SELECT * FROM members WHERE email = ? AND memberId != ?",
      [email, id],
      (gE, gR) => {
        if (gE) {
          return res
            .status(500)
            .json({ message: "Get member error", error: gE.message });
        }
        if (gR.length > 0) {
          return res.status(400).json({ message: "email is already exist" });
        }

        // Only proceed with the update if email doesn't exist
        fields.push("email = ?");
        params.push(email);
        proceedWithUpdate();
      }
    );
  } else {
    proceedWithUpdate();
  }

  function proceedWithUpdate() {
    if (phone !== undefined) {
      fields.push("phone = ?");
      params.push(phone);
    }

    if (fields.length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    const q = "UPDATE members SET " + fields.join(", ") + " WHERE memberId = ?";
    params.push(+id);

    db.query(q, params, (uE, uR) => {
      if (uE) {
        return res
          .status(500)
          .json({ message: "Update member error ", error: uE.message });
      }

      if (uR.affectedRows > 0) {
        return res.status(200).json({ message: "Update members successful" });
      } else {
        return res.status(400).json({ message: "Can not update members" });
      }
    });
  }
});

// ---------- medias -----------

app.post("/medias", (req, res) => {
  const { title, type, author, publisher, year, availableCopies } = req.body;

  if (!title || !type || !author || !publisher || !year || !availableCopies) {
    return res.status(406).json({
      message:
        "title, type, author, publisher, year, availableCopies are required",
    });
  }

  db.query(
    "INSERT INTO media (title, type, author, publisher, year, availableCopies) VALUES (?, ?, ?, ?, ? ,?)",
    [title, type, author, publisher, year, availableCopies],
    (iE, iR) => {
      if (iE)
        return res
          .status(500)
          .json({ message: "insert media Error", error: iE.message });

      return res
        .status(201)
        .json({ message: " media created successful", id: iR.insertId });
    }
  );
});

app.get("/medias", (req, res) => {
  db.query("SELECT * FROM Media", (gE, gR) => {
    if (gE)
      return res
        .status(500)
        .json({ message: "Err to get Media", error: gE.message });
    return res.status(200).json(gR);
  });
});

app.delete("/medias/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM media WHERE mediaId = ?", [id], (dE, dR) => {
    if (dE)
      return res
        .status(400)
        .json({ message: "Delete medias Error", error: dE.message });

    return res.status(200).json({ message: "Delete medias is successful" });
  });
});

app.patch("/medias/:id", (req, res) => {
  const { id } = req.params;
  const { title, type, author, publisher, year, availableCopies } = req.body;

  const fields = [];
  const params = [];

  if (!title && !type && !author && !publisher && !year && !availableCopies) {
    return res.status(400).json({
      message:
        "title, type, author, publisher, year, availableCopies are required",
    });
  }

  if (title !== undefined) {
    fields.push("title = ?");
    params.push(title);
  }

  if (type !== undefined) {
    fields.push("type = ?");
    params.push(type);
  }

  if (author !== undefined) {
    fields.push("author = ?");
    params.push(author);
  }

  if (publisher !== undefined) {
    fields.push("publisher = ?");
    params.push(publisher);
  }

  if (year !== undefined) {
    fields.push("year = ?");
    params.push(year);
  }

  if (availableCopies !== undefined) {
    fields.push("availableCopies = ?");
    params.push(availableCopies);
  }

  if (fields.length === 0) {
    return res.status(400).json({ message: "No valid fields to update" });
  }

  const q = "UPDATE media SET " + fields.join(", ") + " WHERE mediaId = ?";
  params.push(+id);

  db.query(q, params, (uE, uR) => {
    if (uE) {
      return res
        .status(500)
        .json({ message: "Update media error ", error: uE.message });
    }

    if (uR.affectedRows > 0) {
      return res.status(200).json({ message: "Update media successful" });
    } else {
      return res.status(400).json({ message: "Can not update media" });
    }
  });
});

// ------------- Loans --------------

app.post("/loans", (req, res) => {
  const { mediaId, memberId, loanDate, dueDate } = req.body;

  if (!mediaId || !memberId || !dueDate) {
    return res.status(406).json({
      message: "mediaId, memberId,dueDate are required",
    });
  }

  db.query(
    "INSERT INTO loans (mediaId, memberId, loanDate, dueDate) VALUES (?, ?, ?, ?)",
    [mediaId, memberId, loanDate, dueDate],
    (iE, iR) => {
      if (iE)
        return res
          .status(500)
          .json({ message: "insert loans Error", error: iE.message });

      return res
        .status(201)
        .json({ message: " loans created successful", id: iR.insertId });
    }
  );
});

app.get("/loans", (req, res) => {
  db.query("SELECT * FROM loans", (gE, gR) => {
    if (gE)
      return res
        .status(500)
        .json({ message: "Err to get loans", error: gE.message });
    return res.status(200).json(gR);
  });
});

app.delete("/loans/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM media WHERE loans = ?", [id], (dE, dR) => {
    if (dE)
      return res
        .status(400)
        .json({ message: "Delete loans Error", error: dE.message });

    return res.status(200).json({ message: "Delete loans is successful" });
  });
});

app.listen(3012, (e) => {
  if (e) throw e;
  console.log("Server is running on port 3012");
});

// members data :

// {
//   "firstName" : "mugisha",
//   "lastName" : "happy",
//   "email" : "bruno@gmail.com",
//   "phone" : "07888647"
// }
