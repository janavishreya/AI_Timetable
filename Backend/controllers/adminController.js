const Admin = require("../models/Admin");

exports.getAdminProfile = async (req, res) => {
  try {
    const roleid = req.session?.roleid;

    if (!roleid) {
      return res.status(401).json({ error: "Unauthorized. Please login again." });
    }

    const admin = await Admin.findOne({ roleid }).lean(); // lean() boosts read performance

    if (!admin) {
      return res.status(404).json({ error: "Admin profile not found." });
    }

    const { password, ...safeProfile } = admin;
    res.status(200).json(safeProfile);
  } catch (err) {
    console.error("❌ Error in getAdminProfile:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
