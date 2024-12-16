import { useEffect } from "react";
import { checkTokenValidity } from "../../utils/checkToken";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

export function Auth({ children }) {

    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(checkTokenValidity());
    }, [dispatch]);
  
    if (!token) {
      return navigate("/Home")
    }
  
    return children;
  }