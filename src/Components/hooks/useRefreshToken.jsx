import useAuth from './useAuth';

const useRefreshToken = () => {
    
    const {setAuth , token } = useAuth();
    const refresh = async() =>{
        setAuth(prev => {
            return{ ...prev , accessToken: token};
        });
        return token;
    }

    return refresh;
}
export default useRefreshToken;