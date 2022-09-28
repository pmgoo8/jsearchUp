import {getConnection} from "typeorm";
import {Commenter} from "../entity/Commenter";
import {Boarden} from "../entity/Boarden";
import {Enter} from "../entity/Enter";

export class CommentControlleren {
    static addComment = async (req, res) => {
        const {board_id, content, enter_id} = req.body;
        const board = await getConnection().getRepository(Boarden).findOne({where:{id: board_id}});
        const enter = await getConnection().getRepository(Enter).findOne({where:{id: enter_id}});

        const comment = new Commenter();
        comment.content = content;
        comment.board = board;
        comment.enter = enter;
        await getConnection().getRepository(Commenter).save(comment);

        res.send(comment);
    }

    // board의 id에 해당하는 comment 페이지네이션
    static findAllComment = async (req, res) => {
        const {board_id, page_number, page_size} = req.query;

        const options = {};
        options['select'] = ["id", "content", "created", "updated"];
        options['order'] = {id: 'DESC'};
        options['relations'] = ['enter', 'board']
        options['where'] = [{boardId: board_id}]
        // page_number와 page_size 둘 중하나라도 입력하지 않으면 전체 목록 리턴
        if (page_number && page_size) {
            options['skip'] = (page_number - 1) * page_size;
            options['take'] = page_size;
        }

        const comments = await getConnection().getRepository(Commenter).find(options);
        res.send(comments);
    }
    // board의 id에 해당하는 모든 comment 갯수
    static countBoardComment = async (req, res) => {
        const {board_id} = req.query;
        const total = await getConnection().getRepository(Commenter).find({
            where: {boardId: board_id},
        })
        res.send({total: total.length});
    }

    static findOneComment = async (req, res) => {
        const {id} = req.query;

        const comment = await getConnection().getRepository(Commenter).findOne({where:{id}});
        console.log(comment);
        res.send(comment);
    }

    static modifyComment = async (req, res) => {
        const {id, content} = req.body;

        const result = await getConnection().createQueryBuilder().update(Commenter)
            .set({content})
            .where("id = :id", {id})
            .execute();

        res.send(result);
    }

    static removeComment = async (req, res) => {
        const {id} = req.query;

        const result = await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Commenter)
            .where("id = :id", {id})
            .execute();

        res.send(result);
    }
}