import {compareSync, hashSync} from "bcryptjs";
import {Enter} from "../entity/Enter";
import {Role} from "../entity/Role";
import {getConnection} from "typeorm";
import jwt from 'jsonwebtoken';

export class AuthControlleren {
    static signUp = async (req, res) => {
        const {entID, password, entname, roles} = req.body;

        const enter = new Enter();
        enter.entID = entID;
        // 패스워드 복호화
        enter.password = hashSync(password, 8);
        enter.entname = entname;

        // 아이디 중복 체크
        const existEnter = await getConnection().getRepository(Enter)
            .findOne({where: {entID}});

        if (existEnter) {
            return res.status(400).send({ message: "이미 존재하는 아이디 입니다" });
        }
        // 닉네임 중복 체크
        const existEntname = await getConnection().getRepository(Enter)
            .findOne({where:{entname}});
        if (existEntname) {
            return res.status(400).send({message: "이미 존재하는 닉네임입니다"});
        }

        enter.roles = [];

        // body에 role을 넣으면 설정해주고 그렇지 않으면 디폴트로 'ROLE-ENTER'로 설정
        if (roles && roles.length > 0) {
            // where a 혹은 b or 조건 [{ name: 'a'}, {name: 'b'}]
            const res = await getConnection().getRepository(Role).find({
                where: roles.map(name => ({name}))
            })
            enter.roles = res;
        } else {
            // 기본 role은 Enter
            const res = await getConnection().getRepository(Role).find({
                where: {name: 'ROLE_ENTER'}
            })
            enter.roles = res;
        }

        const result = await getConnection().getRepository(Enter).save(enter);

        res.send(result);
    }

    static signIn = async (req, res) => {
        const {entID, password} = req.body;

        const enter = await getConnection().getRepository(Enter)
            .findOne({relations: ["roles"], where: {entID}});

        if (!enter) {
            return res.status(400).send({ message: "존재하지 않는 아이디 입니다" });
        }

        if (!compareSync(password, enter.password)) {
            return res.status(400).send({ message: "비밀번호가 일지하지 않습니다" });
        }

        // token 생성
        const token = jwt.sign({ jti: enter.id, entID: enter.entID, roles: enter.roles.map(role => role.name) },
            process.env.secret, {
                subject: enter.entname,
                algorithm: 'HS512',
                expiresIn: process.env.expirationSecondMs
            });

        res.send({jwt: token});
    } 
}