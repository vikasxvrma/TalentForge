import { findLatestResumeByUser } from "../../repositories/resumeRepository.js"

export const getLatestResumeService = async(userId)=>{
       return  await findLatestResumeByUser(userId);
}
