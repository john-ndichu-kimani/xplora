import { Router } from "express";
import { authController } from "../controller/auth.controller";
import { verifyToken } from "../middleware/token.verify";
import validate from "../middleware/validate";
import { loginSchema, registerSchema} from "../validators/user.validators";

let controller = new authController()
let auth_router = Router()

auth_router.post('/login', validate(loginSchema),controller.loginUser)
auth_router.post('/register', validate(registerSchema),controller.registerUser)
auth_router.get('/check-details',verifyToken, controller.checkDetails)

export default auth_router