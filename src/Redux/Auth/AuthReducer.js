import { GET_AUTH ,REMOVE_AUTH} from "./AuthType";

const initialState={
    user:{},
    token:null
}

const authReducer=(state=initialState,action)=>{
    switch(action.type){
        case GET_AUTH:return{
            ...state,
            user:action.payload.user,
            token:action.payload.token
        }
        case REMOVE_AUTH:return{
            ...state,
            user:{},
            token:null
        }
        default :return state
    }
}

export default authReducer