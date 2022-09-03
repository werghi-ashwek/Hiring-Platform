const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserFormSchema = new Schema(
  {
    fullname: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    adress: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },

    fields: [
      {
       // type: String,
          //required: true,
        school: {
          type: String,
          required: true,
        },
        degree: {
          type: String,
          required: true,
        },
        major: {
          type: String,
          required: true,
        },
      },
    ],

    experience: [
      { //type:String,
        //required:true,
        employer: {
          type: String,
          required: true,
        },
        jobtitle: {
          type: String,
          required: true,
        },
        startmonth: {
          type: String,
          required: true,
        },
        startyear: {
          type: String,
          required: true,
        },
        endmonth: {
          type: String,
          required: true,
        },
        endyear: {
          type: String,
          required: true,
        },
      },
    ],

    coverletter: {
      type: String,
    },
    
    title: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'Job'
    },
  },
  { timestamps: true }
);

const UserForm = mongoose.model("userform", UserFormSchema);

module.exports = UserForm;
