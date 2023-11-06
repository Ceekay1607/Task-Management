const express = require("express");
const passport = require("../auth");
const { isAuthenticated } = require("../authMiddleware");
const router = express.Router();

//Login
router.post("/login", passport.authenticate("local"), (req, res) => {
    res.json({ success: true, message: "Login successful", user: req.user });
});

//Logout
router.post("/logout", (req, res) => {
    req.logout(function (err) {
        if (err) {
            return res
                .status(500)
                .json({ success: false, message: "Logout failed" });
        }
        return res.json({ success: true, message: "Logout successful" });
    });
});

router.get("/isAuthenticated", isAuthenticated, (req, res) => {
    res.json({ isAuthenticated: true });
});

module.exports = router;
