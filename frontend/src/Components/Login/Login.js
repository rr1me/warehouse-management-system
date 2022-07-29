import './Login.css'
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import {loginRequest} from '../../Services/AuthService';
import {logged} from "../../redux/Slices/authSlice";
import {useDispatch} from "react-redux";

export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    
    return(
        <div>
            <form className="signIn" onSubmit={(e) => {
                e.preventDefault();
                loginRequest(username, password).then(() => {
                    dispatch(logged())
                    navigate("/")
                }).catch((err) => {
                    console.log(err);
                    setError(() => {
                        if (err.response.status === 504) {
                            return <div className={"error"}>• 504 status code error. Server doesn't respond</div>
                        }
                        return <div className={"error"}>• Username or password is wrong</div>;
                    });
                });
            }}>
                <h2 className="signIn-heading">Please sign in</h2>

                <label>Username</label>
                <input type="text" required="" autoFocus="" value={username} onInput={e => setUsername(e.target.value)}/>

                <label>Password</label>
                <input type="password" required="" value={password} onInput={e => setPassword(e.target.value)}/>

                {error}

                <button className="btn edit-btn" type="submit">Sign in</button>
            </form>
        </div>
    )
}