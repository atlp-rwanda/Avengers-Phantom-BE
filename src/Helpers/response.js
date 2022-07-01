const errorResponse = (res, details) => {
    if (details.status) return res.status(details.status || 500).json({
        message: details.message || "Internal Error"
    });
}

module.exports = { errorResponse }