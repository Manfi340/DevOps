const mongoose = require("../../node_modules/mongoose")

const ConnectToDB = async (connectionString)=>{
    try { 
       const connection = await mongoose.connect(connectionString);
       console.log(`Connected To Database Successfully : ${connection.connection.host}`);
    } catch (error) {
        console.log(`Database Connection Error : ${error}`);
        process.exit(1);
    }
};

module.exports = ConnectToDB;