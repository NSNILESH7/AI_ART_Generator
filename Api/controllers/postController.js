import axios from "axios";
import fs from "fs";
import sharp from "sharp";
import path from "path";
import Post from "../models/Post.js";
import User from "../models/User.js";
import { CustomError } from "../middlewares/error.js";

const generateFileNamer = (uesrId, allPostLength) => {
  const date = new Date().toDateString().replace(/:/g, "-");
  return `${uesrId}-${allPostLength}-${date}.png`;
};

const createPostwithImageController_V3 = async (req, res, next) => {
  const { userId } = req.params;
  const { prompt, negativePromt, size, style, imageURL, revisedPrompt } =
    req.body;

  const allPosts = await Post.find();
  const allPostLength = allPosts.length;
  const fileName = generateFileNamer(userId, allPostLength);
  const filePath = path.join(__dirname, "../..", "uploads", fileName);

  try {
    const user = await User.finById(userId);
    if (!user) {
      throw new CustomError("user not  found", 404);
    }
    const responce = await axios({
      url: imageURL,
      responseType: "arraybuffer",
      maxRedirects: 5,
    });

    const imageBuffer = Buffer.from(responce.data);
    await sharp(imageBuffer).png().toFile(filePath);

    const post = new Post({
      user: userId,
      aiModel: "AI image Art Dall-e-v3",
      prompt: prompt,
      negativePromt: negativePromt,
      revisedPrompt: revisedPrompt,
      size: size,
      style: style,
      quality: "HD",
      quentity: 1,
      images: fileName,
      aiMage: imageURL,
    });

    await newPost.save();
    user.posts.push(newPost, _id);
    await user.save();

    res.status(201).json({ message: "post created succfully", post: newPost });
  } catch (error) {
    next(error);
  }
};

const generateFileNameMiltiple = (userId, index) => {
  const date = new Date().toDateString().replace(/:/g, "-");
  return `${userId}-${date}-${index}.png`;
};

const createPostwithImageController_V2 = async (req, res, next) => {
  const { userId } = req.params;
  const { prompt, negativePromt, size, n, imageURLs } = req.body;

  try {
    const user = await User.finById(userId);
    if (!user) {
      throw new CustomError("user not  found", 404);
    }
    const downloadAndConvertImages = await Promise.all(
      imageURLs.map(async (imageURL, index) => {
        const fileName = generateFileNameMiltiple(userId, index);
        const filePath = path.join(__dirname, "../..", "uploads", fileName);

        const responce = await axios({
          url: imageURLs,
          responseType: "arraybuffer",
          maxRedirects: 5,
        });
        const imageBuffer = Buffer.from(responce.data);
        await sharp(imageBuffer).png().toFile(filePath);

        return fileName;
      })
    );

    const post = new Post({
      user: userId,
      aiModel: "AI image Art Dall-e-v2",
      prompt: prompt,
      negativePromt: negativePromt,
      revisedPrompt: "no available in Ai Image art Dall - model",
      size: size,
      style: style,
      quality: "Normal",
      quentity: n,
      images: downloadAndConvertImages,
      aiMage: imageURLs,
    });

    await newPost.save();
    user.posts.push(newPost, _id);
    await user.save();

    res.status(201).json({ message: "post created succfully", post: newPost });
  } catch (error) {
    next(error);
  }
};

const getPostsController = async (req, res, next) => {
  try {
    const allPoste = await Post.find().populate("user", "username");
    res.json({ posts: allPoste }).status();
  } catch (error) {
    next(error);
  }
};

const getSinglePostsController = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId).populate("user", "username");
    if (!post) {
      throw new CustomError("there is no Post", 404);
    }
    res.status(200).json({ post: post });
  } catch (error) {
    next(error);
  }
};
const getUserPostsController = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.find(userId);
    if (!user) {
      throw new CustomError("there is no user", 404);
    }
    const userPosts = await Post.find({ user: userId }).populate(
      "user",
      "username"
    );
    res.json({ posts: userPosts }).status(200);
  } catch (error) {
    next(error);
  }
};

const deletePostsController = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const postToDelete = await Post.findById(postId);
    if (!postToDelete) {
      throw new CustomError("there is no post", 404);
    }
    const user = await User.finById(postToDelete.user);
    if (!user) {
      throw new CustomError("there is no user", 404);
    }
    user.posts = user.posts.filter(
      (postId) => postId._id.toString() !== postToDelete._id.toDateString()
    );

    await user.save();
    await postToDelete.deleteOne();

    res.status(200).JSON({ message: "post deleted succfully" });
  } catch (error) {
    next(error);
  }
};

const likePostsController = async (req, res, next) => {
  const { postId } = req.params;
  const { userId } = req.body;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      throw new CustomError("there is no post", 404);
    }
    const user = await User.finById(userId);
    if (!user) {
      throw new CustomError("there is no user", 404);
    }

    if (post.likes.includes(userId)) {
      throw new CustomError("you have already like the post", 404);
    }
    post.likes.push(userId);
    await post.save();
    res.status(200).JSON({ message: "post liked succfully", post });
  } catch (error) {
    next(error);
  }
};

const dislikePostsController = async (req, res, next) => {
  const { postId } = req.params;
  const { userId } = req.body;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      throw new CustomError("there is no post", 404);
    }
    const user = await User.finById(userId);
    if (!user) {
      throw new CustomError("there is no user", 404);
    }

    if (post.likes.includes(userId)) {
      throw new CustomError("you have already like the post", 404);
    }
    post.likes = post.likes.filter((id) => id.toString() !== userId);
    await post.save();
    res.status(200).JSON({ message: "post disliked succfully", post });
  } catch (error) {
    next(error);
  }
};

export {
  createPostwithImageController_V3,
  createPostwithImageController_V2,
  getPostsController,
  getSinglePostsController,
  getUserPostsController,
  deletePostsController,
  likePostsController,
  dislikePostsController,
};
