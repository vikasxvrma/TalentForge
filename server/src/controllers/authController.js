import loginWithGoogleService from "../service/auth/loginWithGoogleService.js";
import getCurrentUserService from "../service/auth/getCurrentUserService.js";

export const googleLogin = async (req, res) => {
  const { idToken } = req.body;

//   already validated from validation middleware
//   if (!idToken) {
//     throw new AppError("token is not present", 400);
//   }

  const authResponse = await loginWithGoogleService(idToken);

  return res.status(200).json({
    success: true,
    ...authResponse,
  });
};

export const getCurrentUser = async (req, res) => {
  const user = await getCurrentUserService(req.user.id);

  return res.status(200).json({
    success: true,
    user,
  });
};