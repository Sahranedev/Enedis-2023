const express = require("express");

const router = express.Router();

const {
  hashPassword,
  verifyPassword,
  verifyToken,
} = require("./services/auth");

const userControllers = require("./controllers/userControllers");
const authControllers = require("./controllers/authControllers");
const postControllers = require("./controllers/postControllers");
const categoryControllers = require("./controllers/categoryControllers");
const groupControllers = require("./controllers/groupControllers");

// Authentification

router.post("/api/register", hashPassword, userControllers.register);
router.post(
  "/api/login",
  authControllers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

// Gestion des users
router.get("/api/users", userControllers.browse);
router.get("/api/users/:id", userControllers.read);
router.post("/api/users", hashPassword, userControllers.add);
router.put("/api/users/:id", userControllers.edit);
router.delete("/api/users/:id", verifyToken, userControllers.destroy);

// Gestion des posts
router.get("/api/posts", postControllers.browse);
router.get("/api/posts/:id", postControllers.read);
router.post("/api/posts", postControllers.add);
router.put("/api/posts/:id", postControllers.edit);

// Gestion des categories
router.get("/api/categories", categoryControllers.browse);
router.get("/api/categories/:id", categoryControllers.read);
router.post("/api/categories", categoryControllers.add);
router.put("/api/categories/:id", categoryControllers.edit);

// Gestion des groupes
router.get("/api/groups", groupControllers.browse);
router.get("/api/groups/:id", groupControllers.read);
router.post("/api/groups", groupControllers.add);
router.put("/api/groups/:id", groupControllers.edit);

module.exports = router;
