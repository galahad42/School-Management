const School = require("../models/schoolModel");
const calculateDistance = require("../utils/distanceCalculator");

exports.addSchool = (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ error: "All fields are required." });
  }

  School.addSchool(
    name,
    address,
    parseFloat(latitude),
    parseFloat(longitude),
    (err, schoolId) => {
      if (err) {
        return res.status(500).json({ error: "Failed to add school." });
      }
      res.status(201).json({ message: "School added successfully.", schoolId });
    }
  );
};

exports.listSchools = (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ error: "User's latitude and longitude are required." });
  }

  School.getAllSchools((err, schools) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch schools." });
    }

    const userLat = parseFloat(latitude);
    const userLng = parseFloat(longitude);

    const sortedSchools = schools
      .map((school) => {
        const distance = calculateDistance(
          userLat,
          userLng,
          school.latitude,
          school.longitude
        );
        return { ...school, distance };
      })
      .sort((a, b) => a.distance - b.distance);

    res.status(200).json(sortedSchools);
  });
};
