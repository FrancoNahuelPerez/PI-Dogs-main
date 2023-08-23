const {Dog, Temperaments} = require("../db")
const axios = require('axios')

const getTemperaments = async ()=>{
    const api = await axios("https://api.thedogapi.com/v1/breeds");
    const getDogsApi = api.data;

    const dogs = getDogsApi.map(element => element.temperament)
    dogs.forEach(element => {/* console.log('element', element)*/
        if(element){
            let temperamentArray = element.split(",")
            temperamentArray.forEach(temp =>{
                Temperaments.findOrCreate({
                    where:{
                        name: temp.trim()
                    }
                })
            })
        }
    });
    const dog = await Temperaments.findAll()
    // const dogss = dog.map((element) => element.name)
    // console.log('dogs ---------------', dogss)
    // const perritos = dogss.join(', ')
    return dog;
}
// const { Dog, Temperaments } = require("../db");
// const axios = require('axios');

// const getTemperaments = async () => {
//     try {
//         const api = await axios.get("https://api.thedogapi.com/v1/breeds");
//         const getDogsApi = api.data;

//         for (const element of getDogsApi) {
//             if (element.temperament) {
//                 const temperamentArray = element.temperament.split(",");
//                 for (const temp of temperamentArray) {
//                     await Temperaments.findOrCreate({
//                         where: {
//                             name: temp.trim()
//                         }
//                     });
//                 }
//             } else {
//                 throw new Error('Not found Temperaments');
//             }
//         }

//         const dog = await Temperaments.findAll();
//         return dog;
//     } catch (error) {
//         throw new Error('Error fetching and saving temperaments: ' + error.message);
//     }
// };

// module.exports = {
//     getTemperaments
// };


module.exports ={
    getTemperaments
}