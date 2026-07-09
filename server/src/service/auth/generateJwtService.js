import jwt from "jsonwebtoken";
import config from "../../config/index.js";

const generateJwtService = (user) => {

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
        },
       config.jwt.secret,
        {
            expiresIn: "7d",
        }
    );

    return token;
};

export default generateJwtService;