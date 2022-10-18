import { useDispatch } from "react-redux";
import { updateLogin } from "../../store/slices/user";
import { AppDispatch } from '../../store';
import { useNavigate } from 'react-router-dom'

function Logout() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const onClickLogout = () => {
        dispatch(updateLogin({id:1, logged_in: false, email: "swpp@snu.ac.kr", password: "iluvswpp", name: "Software Lover"}));
        return navigate("/login");
    }
 
    return(
        <div>
            <button type='button' id="logout-button" onClick={onClickLogout}>Logout</button>
        </div>
    );
}
 
export default Logout;