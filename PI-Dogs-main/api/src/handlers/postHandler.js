const {Dog,Temperament}= require('../db')
const postDogHandler= async (req, res) => {
        const {
          name,
          min_height,
          max_height,
          min_weight,
          max_weight,
          life_span,
          image,
          temperament,
          createdInDb,
        } = req.body;
      
        try {
          const newDog = await Dog.create({
            name,
            min_height,
            max_height,
            min_weight,
            max_weight,
            life_span,
            image,
            createdInDb,
          });
      
          const createdDb = await Temperament.findAll({
            where: { name: temperament },
          });
      
          newDog.addTemperament(createdDb);
      
          return res.status(200).send(newDog);
        } catch (error) {
          return res.status(404).send("Dog Not Created");
        }
      };

module.exports={
    postDogHandler
}