const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogRouter = require ('./Dogs')
const temperamentRouter = require('./Temperament')
const validate = (req,res,next)=>{
    const{name,
        min_height,
        max_height,
        min_weight,
        max_weight,
        life_span}=req.body
    if(!name) return res.status(400).json({error:"Missing name"});
    if(!min_height) return res.status(400).json({error:"Missing min_height"});
    if(!max_height) return res.status(400).json({error:"Missing max_height"});
    if(!min_weight) return res.status(400).json({error:"Missing min_weight"});
    if(!max_weight) return res.status(400).json({error:"Missing max_weight"});
    if(!life_span) return res.status(400).json({error:"Missing life_span"});

    next()

}
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogRouter)
router.use('/temperament',validate, temperamentRouter)
module.exports = router;
