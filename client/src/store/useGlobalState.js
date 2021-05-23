import { useReducer } from "react";

const initialState = []

const reducer = (state, action) => {
    switch (action.type) {

        case 'GET_COUPONS_LIST':
            return {
                couponsList: state
            };
        case 'ADD_COUPONS':
            return {
                ...state,
                couponsList: action.payload
            }
        case 'SET_SIDEBAR_STATUS':
            return {
                ...state,
                isSidebarOpen: action.payload
            }
        case 'SET_LOADER_STATE':
            return {
                ...state,
                isLoading: action.payload
            }
        case 'ADD_POPULAR_COMPANIES':
            return {
                ...state,
                popularCompanies: action.payload
            }

        default:
            return state
    }
}

const useGlobalState = () => {
    const [globalState, globalDispatch] = useReducer(reducer,
        {
            couponsList: [],
            isSidebarOpen : false,
            isLoading : true,
            popularCompanies : []
        })
    return { globalState, globalDispatch }
};


export default useGlobalState;
