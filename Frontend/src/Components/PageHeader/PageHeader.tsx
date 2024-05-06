import { useState } from "react";
import "./PageHeader.scss";
import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";
import Cookies from "universal-cookie";
import { UserType } from "../../Pages/MainPage/MainPage";

type PageHeaderProps = {
    user: UserType | null,
    setUser: (user: UserType | null) => void
}

const PageHeader = ({ user, setUser }:PageHeaderProps) => {
    const [openRegisterModal, setOpenRegisterModal] = useState<boolean>(false);
    const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);

    const cookies = new Cookies();

    const logout = () => {
        setUser(null)
        cookies.remove("jwt_authorization")
    }
    
    return (
        <div className="pageHeader__container">
            <h2 className="pageHeader__title">Robis Serviss</h2>

            <div className="pageHeader__button--container">
                {user === null && (<button className="pageHeader__button--style" onClick={() => setOpenRegisterModal(true)}>Register</button>)}
                {openRegisterModal && (
                    <div className="pageHeader__modal">
                        <div className="pageHeader__modal--content">
                            <RegisterForm />
                            <button
                                className="pageHeader__modal--close"
                                onClick={() => setOpenRegisterModal(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}

                {user !== null ? (
                <div>
                    <button className="pageHeader__button--style" onClick={logout}>logout</button>
                    <button className="pageHeader__button--style" >Profile</button>
                </div>
                    
                ) : (
                    <div>
                        <button className="pageHeader__button--style" onClick={() => setOpenLoginModal(true)}>Login</button>
                        {openLoginModal && (
                            <div className="pageHeader__modal">
                                <div className="pageHeader__modal--content">
                                    <LoginForm setUserState={setUser}></LoginForm>
                                    <button
                                        className="pageHeader__modal--close"
                                        onClick={() => setOpenLoginModal(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
                <button className="pageHeader__button--style">Cart</button>
            </div> 
        </div>
    );
};

export default PageHeader;
