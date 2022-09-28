import {Router} from "express";
import {CommentController} from "../controller/CommentController";
import {CommentControlleren} from "../controller/CommentControlleren";
// 인증 미들웨어
import {AuthMiddleware} from "../middleware/AuthMiddleware";

const routes = Router();

//개인 유저
routes.post('', AuthMiddleware.verifyToken, CommentController.addComment);
routes.get('/list',CommentController.findAllComment);
// 쿼리 파라미터로 board의 id를 받아서 해당하는 id의 board의 전체 comment 갯수
routes.get('/count', CommentController.countBoardComment);
routes.get('', CommentController.findOneComment);
routes.put('', AuthMiddleware.verifyToken, CommentController.modifyComment);
routes.delete('', AuthMiddleware.verifyToken, CommentController.removeComment);

//기업 유저
routes.post('', AuthMiddleware.verifyToken, CommentControlleren.addComment);
routes.get('/elist',CommentControlleren.findAllComment);
// 쿼리 파라미터로 board의 id를 받아서 해당하는 id의 board의 전체 comment 갯수
routes.get('/ecount', CommentControlleren.countBoardComment);
routes.get('', CommentControlleren.findOneComment);
routes.put('', AuthMiddleware.verifyToken, CommentControlleren.modifyComment);
routes.delete('', AuthMiddleware.verifyToken, CommentControlleren.removeComment);

export default routes;