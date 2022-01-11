import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

import UserRepository from "../repository/UserRepository.js";
import * as httpStatus from "../../../config/constants/httpStatus.js";
import UserException from "../exception/UserException.js";
import * as secrets from "../../../config/constants/secrets.js";

class UserService {

    async findByEmail(req) {
        try {
            const { email } = req.params;
            const { authUser} = req;

            this.validateRequestData(email);
            let user = await UserRepository.findByEmail(email);
            this.validateUserNotFound(user);
            this.validadeAuthenticatedUser(user, authUser)
            return {
                status: httpStatus.SUCESS,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            };
        } catch (error) {
            return {
                status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            };
        }
    }

    validateRequestData(email) {
        if (!email) {
            throw new UserException('User email was not informed.');
        }
    }

    validateUserNotFound(user) {
        if (!user) {
            throw new Error(httpStatus.BAD_REQUEST, "User was not found.")
        }
    }

    validadeAuthenticatedUser(user, authUser) {
        if (!authUser || user.id !== authUser.id) {
            throw new UserException(
                httpStatus.FORBIDDEN, 
                "Você não pode ver os dados desse usuário");
        }
    }

    async getAccessToken(req) {

        try {
            const { email, password } = req.body;
            this.validadeAccessTokenData(email, password);
            let user = await UserRepository.findByEmail(email);
            this.validateUserNotFound(user);
            await this.validadePassword(password, user.password);

            const authUser = {id: user.id, name: user.name, email: user.email};
            const accessToken = jwt.sign({authUser}, secrets.API_SECRET, {expiresIn: "1d"})

            return {
                status: httpStatus.SUCESS,
                accessToken, 
            }
        } catch (error) {
            return {
                status: error.status ? error.status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            };
        }
    }

    validadeAccessTokenData(email, password) {
        if (!email || !password) {
            throw new UserException(httpStatus.UNAUTHORIZED, "Email e password devem ser informados")
        }
    }

    async validadePassword(password, hashPassword) {
        if (!await bcrypt.compare(password, hashPassword)) {
            throw new UserException(httpStatus.UNAUTHORIZED, "Password doesn't match.");
        }
    }
}

export default new UserService();