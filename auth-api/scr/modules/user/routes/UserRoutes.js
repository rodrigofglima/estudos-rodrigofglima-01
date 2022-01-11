import {  Router } from "express";

import UserController from "../controller/UserController.js";
import checkToken from "../../../config/auth/checkToken.js"

const router = new Router();

// /api/user/email/nome_pessoa@gmail.com

router.post("/api/user/auth", UserController.getAccessToken);

router.use(checkToken);

router.get('/api/user/email/:email', UserController.findByEmail);


export default router;

