const allAccess = (req, res) => {
    return res.status(200).send("Public Content.");
  }
const userBoard = (req, res) => {
    return res.status(200).send("User Content.");
  }
const adminBoard = (req, res) => {
    return res.status(200).send("Admin Content.");
  }

const moderatorBoard = (req, res) => {
    return res.status(200).send("Moderator Content.");
  }

module.exports = { allAccess, userBoard, adminBoard, moderatorBoard }