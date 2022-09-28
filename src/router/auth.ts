import {Router} from "express";
import {AuthController} from "../controller/AuthController";
import {AuthControlleren} from "../controller/AuthControlleren";

const routes = Router();

//개인 유저
routes.post('/signup', AuthController.signUp);
routes.post('/signin', AuthController.signIn);

//기업 유저
routes.post('/signupe', AuthControlleren.signUp);
routes.post('/signine', AuthControlleren.signIn);

export default routes;