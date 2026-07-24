// this is to handle http request 
// destructure request body
// utilise services
// return response 

import { getLatestResumeService } from "../service/resume/handleResumeService.js";

export const getLatestResumeStatus = async (req, res) => {
    // get the user from request body
    const userId = req.user.id;
    const resume = await getLatestResumeService(userId);
    return res.status(200).json({
        success: true,
        data: resume
    })
}