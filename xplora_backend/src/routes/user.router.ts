import { Router } from "express";
import { UserController } from "../controller/user.controller";
import validate from "../middleware/validate";
import { registerSchema} from "../validators/user.validators";
import { verifyToken } from "../middleware/token.verify";
import { checkRole } from "../middleware/role.check";

let controller = new UserController()

let user_router = Router()

user_router.get('/all', controller.getUsers)
user_router.put('/update/:id',controller.updateUser)
user_router.get('/single/:id', controller.getUserById)
user_router.delete('/delete/:id', controller.deleteUser)

export default user_router