const mongoose = require('mongoose');

const check = mongoose.connect('mongodb+srv://admin:admin@cluster0.n0xu9h0.mongodb.net/Bussiness', {
    useNewUrlParser: true,
  useUnifiedTopology: true,
})
if(!check)
    {
        console.log("error in connection to database");
    }
    else{
        console.log("connection to  satabase sucessfull");
        const cardSchema = new mongoose.Schema({
            name: String,
            description: String,
            linkedIn: String,
            twitter: String,
            otherSocial: String,
            interests: [String],
          });
        const user = mongoose.model('Card', cardSchema);
        
        module.exports = {
            user,
        };
    }
