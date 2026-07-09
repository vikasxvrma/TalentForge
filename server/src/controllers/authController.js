import loginWithGoogleService from "../service/auth/loginWithGoogleService.js";

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
