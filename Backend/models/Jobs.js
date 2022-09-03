
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const JobSchema = new Schema({

     title:{                   //job role
        type: String,
        trim: true,
        required: true
    },


    team:{

        type: String,
        trim: true,
        required: true

    },

    publisher: {                //the one who published
        type: String,
        ref: "User",
        required: true
        
    },

    date: {           //when it's published
        type: Date,
        required: true,
        default: Date.now()
       // replace T with a space
    },
    skill: {          //the required skills
        type: String,    
        required: true,
    },
    description :{
        type: String,
        required: true,
    },
    salary: {        //the salary required 
        type: String,
        required: true,
    },

    

},{ timestamps: true });

const Job = mongoose.model('job', JobSchema);

module.exports = Job;