const {Dog, Temperament}=require('../db')
const axios = require("axios");
const { API_KEY } = process.env;


const getAll = async ()=>{
    
  const api = await axios.get(   
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  const apiData =await api.data.map((e) => {
    return {  
      id: e.id,  
      name: e.name,
      min_height: e.height.metric.split("-")[0].trim(),
      max_height: e.height.metric.split("-").reverse()[0].trim(),
      min_weight: e.weight.metric.split("-")[0].trim(),
      max_weight: e.weight.metric.split("-").reverse()[0].trim(),
      life_span: e.life_span,
      temperament: e.temperament,
      image: e.image.url,
      created: false
    };
  });
return apiData
}
const dataDB = async () => {
  return await Dog.findAll({
    include: [
      {
        model: Temperament,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });
};
const getAllDogs= async()=>{
  const searchApi = await getAll();
  let searchDb = await dataDB();
  searchDb = await searchDb.map((e) => {
    return {
      id: e.id,
      name: e.name,
      min_height: e.min_height,
      max_height: e.max_height,
      min_weight: e.min_weight,
      max_weight: e.max_weight,
      life_span: e.life_span,
      image: e.image,
      temperament: e.temperaments    
      
        .map((e) => {      
          return e.name;           
        })  
        .join(", "),
      created: e.created,
    };
  });
  const allInfo = [...searchApi, ...searchDb];
  return allInfo;
}
const getName=async(name)=>{
  const allDogs=await getAll()
  try{
    const filter=allDogs.filter((d)=>{
      return d.name.toLowerCase().includes(name.toLowerCase())
    })
    if(filter.length===0){
      return "No hay recetas con ese nombre"
    }
    return filter
  }
  catch (error) {
    console.log(error);
    return "Hubo un error al buscar.";
  }
}


module.exports={getAllDogs,getName}
