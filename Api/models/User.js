import mongoos from "mongoose";

const userSchema = new mongoos.Schema({
  username: {
    type: String,
    required: true,
    unique:true,
    trim:true,
    lowercase:true
  },
  email: {
    type: String,
    required: true,
    unique:true,
    trim:true,
    lowercase:true
  },
  password: {
    type: String,
    required: true,
    trim:true,
  },
 
  posts:[
{
    type: mongoos.Schema.Types.ObjectId,
    ref: "Post",
}
  ]
},{
    timestamps: true
});


const User= mongoos.model("User",userSchema);

export  default User;