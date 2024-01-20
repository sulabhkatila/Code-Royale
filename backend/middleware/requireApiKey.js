const requireApiKey = async (req, res, next) => {
  const api_key = req.query.api_key;
  if (!api_key) {
    return res.status(401).json({ error: "API key required" });
  }

  if (api_key !== process.env.API_KEY) {
    return res.status(401).json({ error: "Invalid API key" });
  }

  req.api_key = api_key;
  next();
};

module.exports = requireApiKey;