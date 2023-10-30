import { GET_AUTH ,REMOVE_AUTH} from "./AuthType";

export const getAuth=(data)=>{
    return{
        type:GET_AUTH,
        payload:data
    }
}

export const removeAuth=()=>{
    return{
        type:REMOVE_AUTH
    }
}