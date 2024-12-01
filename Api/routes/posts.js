import express from "express";

import {
    createPostwithImageController_V3,
    createPostwithImageController_V2,
    getPostsController,
    getSinglePostsController,
    getUserPostsController,
    deletePostsController,
    likePostsController,
    dislikePostsController
} from "../controllers/postController.js";

const router=express.Router();

router.post("/create/v3/:userId",createPostwithImageController_V3); 
router.post("/create/v2/:userId",createPostwithImageController_V2);
router.get("/all",getPostsController);
router.get("/single/:postId",getSinglePostsController);
router.get("/user/:userId",getUserPostsController);
router.delete("/delete/:postId",deletePostsController);
router.post("/like/:postId",likePostsController);
router.post("/dislike/:postId",dislikePostsController);

export default router




