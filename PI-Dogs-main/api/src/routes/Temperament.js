const { Router } = require("express");
const { getTemperaments } = require("../controllers/temperamentController");
const temperamentRouter = Router();

temperamentRouter.get("/", async (req, res) => {
  try {
    const dbTemperaments = await getTemperaments();
     return res.status(200).json(dbTemperaments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
    }
});

module.exports = temperamentRouter; 