import {Redirect} from "react-router-dom";
import {AuthContext} from "../../context/AuthContextProvider";

function ProtectedRoute({children}) {

    const user = sessionStorage.getItem('user');

    return (
        <AuthContext.Provider value={user}>
            {user !== null ? children : <Redirect to="/" />}
        </AuthContext.Provider>
        );
}

export default ProtectedRoute;