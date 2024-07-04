import { Router } from "express";

const postRoute = Router();
const postController = setupPost();

postRoute.post("/post", postController.createPost);
postRoute.get("/post", postController.getPosts);

export default postRoute;
