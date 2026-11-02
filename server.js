const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

const contactmodel = require("./models/contactmodel");

// CREATE CONTACT
app.post("/contact/create", async (req, res) => {
  console.log(req.body);

  try {
    const contactData = req.body;

    const contact = await contactmodel.create({
      contactName: contactData.contactName,
      contactNumber: contactData.contactNumber,
      contactMail: contactData.contactMail,
    });

    res.status(201).json(contact);
  } catch (e) {
    console.log(e);

    res.status(500).json({
      message: "Contact not created",
      error: e.message,
    });
  }
});

// GET CONTACTS
app.get("/contact/get", async (req, res) => {
  try {
    const contacts = await contactmodel.find({
      isDeleted: false,
    });

    res.json(contacts);
  } catch (e) {
    res.status(500).json({
      message: "Contacts not found",
      error: e.message,
    });
  }
});

app.put("/contact/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const deletedContact = await contactmodel.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true },
    );

    res.json({
      message: "Contact moved to trash",
      data: deletedContact,
    });
  } catch (e) {
    res.status(500).json({
      message: "Contact not moved to trash",
      error: e.message,
    });
  }
});

app.get("/contact/trash", async (req, res) => {
  try {
    const trashContacts = await contactmodel.find({
      isDeleted: true,
    });
    res.json(trashContacts);
  } catch (e) {
    res.status(500).json({
      message: "Trash contacts not founnd",
      error: e.message,
    });
  }
});
app.put("/contact/update/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const updatedContact = await contactmodel.findByIdAndUpdate(
      id,
      {
        contactName: req.body.contactName,
        contactNumber: req.body.contactNumber,
        contactMail: req.body.contactMail,
      },
      {
        new: true,
      },
    );

    res.json({
      message: "Contact updated successfully",
      data: updatedContact,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Contact update nahi hua",
    });
  }
});

mongoose
  .connect("mongodb://localhost:27017/contactManager")
  .then(() => {
    console.log("DB connected");
  })
  .catch((e) => {
    console.log("MongoDB error:", e);
  });

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server connected on port " + PORT);
});
