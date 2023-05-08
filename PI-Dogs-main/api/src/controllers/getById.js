const {Dog, Temperament}=require('../db')
const axios = require("axios");
const { API_KEY } = process.env;


const getById =async (id,source)=>{
    let dog;

    if (source === "api") {
        const apiRecipesResponse = await axios.get(
            `https://api.thedogapi.com/v1/breeds/${id}?api_key=${API_KEY}`
        );
        const apiDog= apiRecipesResponse.data
        dog={
            id: apiDog.id,  
            name: apiDog.name,
            min_height: apiDog.height.metric.split("-")[0].trim(),
            max_height: apiDog.height.metric.split("-").reverse()[0].trim(),
            min_weight: apiDog.weight.metric.split("-")[0].trim(),
            max_weight: apiDog.weight.metric.split("-").reverse()[0].trim(),
            life_span: apiDog.life_span,
            temperament: apiDog.temperament,
            image: apiDog.image,
            created: false
        }
    } else{
        dog= await Dog.findByPk(id, {
            include: {
              model: Temperament,
              attributes: ["name"],
            },
          });
    }

    return dog
}
module.exports={
    getById
}