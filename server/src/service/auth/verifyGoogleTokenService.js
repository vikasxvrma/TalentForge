import { OAuth2Client } from "google-auth-library";
import config from "../../config/index.js";

const client = new OAuth2Client(config.google.clientId);

const verifyGoogleTokenService = async (idToken) => {

    const ticket = await client.verifyIdToken({
        idToken,
        audience: config.gemini.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    return {
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        providerId: payload.sub,
    };
};

export default verifyGoogleTokenService;