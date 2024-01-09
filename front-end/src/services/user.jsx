import { privateReq } from "./axios-config";
import publicReq from "./axios-config";

export const signupService=(data)=>{
    return publicReq.post("/user/signup-process", data);
}

export const loginService=(data)=>{
    return publicReq.post("/user/login-process",data);
}

export const adminRequest=(data)=>{
    return publicReq.post("/user/admin-process", data);
}

export const saveClient = (formData)=>{
    return publicReq.post("/user/save-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
}

export const updateClient = (formData)=>{
    return publicReq.post("/user/update-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
}

export const postReqClient = (formData)=>{
    return publicReq.post("/user/post-req", formData,{
        headers:{"Content-Type": "multipart/form-data"},
    });
}

export const uploadProvider = (formData)=>{
    return publicReq.post("/user/upload-profile", formData,{
        headers:{"Content-Type": "multipart/form-data"},
    })
}

export const modifyProvider = (formData)=>{
    return publicReq.post("/user/modify-profile", formData,{
        headers:{"Content-Type": "multipart/form-data"},
    })
}

export const distinctCategories = ()=>{
    return publicReq.get("/user/distinct-categories");
}

export const distinctCities = ()=>{
    return publicReq.get("/user/distinct-cities");
}

export const distinctCategories2 = ()=>{
    return publicReq.get("/user/distinct-categories2");
}

export const distinctCities2 = ()=>{
    return publicReq.get("/user/distinct-cities2");
}

export const contactServie = (data) =>{
    return publicReq.post("/user/contact-us", data);
}

export const getUserService = (data)=>{
    return privateReq.get("/user/currentUser", data);
}

export const dataProv = (data) =>{
    return privateReq.post("/user/searchProv", data);
}

export const dataProv2 = (data) =>{
    return privateReq.post("/user/searchClient", data);
}