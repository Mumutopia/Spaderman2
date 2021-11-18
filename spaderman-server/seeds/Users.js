require("dotenv").config();
require("./../config/mongo.js");


const userModel = require("./../models/User.js");


const userSeed = [
    {
   username : "Player1",
   avatar : "",
   email :"player1@player.player"
   
},
    {
   username : "Player2",
   avatar : "",
   email :"player2@player.player"      
}
]

// function createSeed(){
//     return new Promise(async (resolve, reject) => {
//     try {
//         const selectSkills = await skillModel.find()
//         userSeed.forEach((el) =>{
            
//             el.skills = selectSkills[Math.floor(Math.random() * selectSkills.length)]._id
//             resolve();

//         });
//     }catch(err){
//         reject(err)
//     }
//     });
// };

    userModel
    .deleteMany()
    .then(() => {
        userModel.insertMany(userSeed).then((res) => {
            console.log("Users added");
            
            process.exit()
        } )
        
    }).catch((err) => console.log("err", err));


