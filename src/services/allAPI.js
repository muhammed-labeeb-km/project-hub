import { commonAPI } from "./commonAPI"
import SERVER_URL from "./serverUrl"

//register API
export const registerAPI = async (userDetail) =>{
    return await commonAPI("POST",`${SERVER_URL}/register`,userDetail,"")
}


//login API
export const loginAPI = async(userDetail)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,userDetail,"")
}

//add-projectAPi
export const addProjectAPI = async (reqBody,reqHeader) =>{
    return await commonAPI("POST",`${SERVER_URL}/add-project`,reqBody,reqHeader)
}


//get Home Project
export const getHomeProjectApi = async () => {
    return await commonAPI("GET", `${SERVER_URL}/get-home-project`,"","")
} 

//get all Project
export const getAllProjectApi = async (searchKey,reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/get-all-project?search=${searchKey}`,"",reqHeader)
}

//get user Project
export const getUserProjectApi = async (reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/get-user-project`,"",reqHeader)
}

//user Edit
export const updateUserProfileApi = async (reqBody,reqHeader) => {
    return await commonAPI("PUT", `${SERVER_URL}/user/edit`,reqBody,reqHeader)
    
}

//delete project api 
export const deleteProject = async (projectId,reqHeader) =>{
    return await commonAPI("DELETE",`${SERVER_URL}/remove-project/${projectId}`,{},reqHeader)
}

//edit project
export const updateProject = async (projectId,reqBody,reqHeader) =>{
    return await commonAPI("PUT",`${SERVER_URL}/project/edit/${projectId}`,reqBody,reqHeader)
}