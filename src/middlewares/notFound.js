function notFound(req, res) {
    res.status(404).json ({
    error: "not found",
    Path: req.originalUrl,
    });
}

module.exports = notFound;