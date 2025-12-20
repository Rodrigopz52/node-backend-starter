function NotFound(req, res) {
    res.status(404).json ({
    error: "not found",
    path: req.originalUrl,
    });
}

module.exports = NotFound;