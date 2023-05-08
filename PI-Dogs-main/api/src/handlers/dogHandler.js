const { getAllDogs, getName } = require('../controllers/getDogController');
const { getById } = require('../controllers/getById');

const getDogHandler = async (req, res) => {
  const { name } = req.query;
  const results = name ? await getName(name) : await getAllDogs();
  res.status(200).json(results);
};

const getDogById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await getById(id, isNaN(id) ? "bdd" : "api");
    res.status(200).json(response)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getDogHandler,
  getDogById,
};