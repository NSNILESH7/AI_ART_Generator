import mongoos from "mongoose";

const postSchema = new mongoos.Schema({
  user: {
    type: mongoos.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  prompt: {
    type: String,
    trim: true,
  },
  negativePromt: {
    type: String,
    trim: true,
  },
  size: {
    type: String,
    trim: true,
  },
  quality: {
    type: String,
    trim: true,
  },
  quentity: {
    type: Number,
    trim: true,
  },
  style: {
    type: String,
    trim: true,
  },
  aiModel: {
    type: String,
    required: false,
  },
  aiMage: [
    {
      type: String,
      required: false,
    },
  ],
  images:[
    {
        type: String,
        required: false,

    }
  ],
  likes:[
{
    type: mongoos.Schema.Types.ObjectId,
    ref: "User",
}
  ]
},{
    timestamps: true
});


const Post= mongoos.model("Post",postSchema);

export  default Post;