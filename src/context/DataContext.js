import { createContext  } from "react";

const DataContext = createContext({});

export const DataProvider = ({children}) => {

    let userInfo  = JSON.parse(localStorage.getItem('userInfo'));
    // let courseId  = JSON.parse(localStorage.getItem('coursId'));
    // let userInfo  = JSON.parse(userInfo1);
    // const [editSocial , setEditSocial] = useState(false);
    return(
        <DataContext.Provider value={{
            userInfo
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;