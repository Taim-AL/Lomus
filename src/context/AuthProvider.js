import { createContext ,useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children })=>{
    const [auth , setAuth] = useState({});
    const [persist , setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

    const token  = localStorage.getItem('token');
    return(
        <AuthContext.Provider value={{ auth , setAuth , persist ,setPersist , token }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext ;