import { useState } from "react";
import "./PageHeader.scss";
import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";
import { UserType } from "../../Pages/MainPage/MainPage";
import Cookies from 'universal-cookie';
import { Link } from "react-router-dom";


type PageHeaderProps = {
    user: UserType | null,
    setUser: (user: UserType | null) => void
}

const PageHeader = ({ user, setUser }: PageHeaderProps) => {
    const [openRegisterModal, setOpenRegisterModal] = useState<boolean>(false);
    const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
    const cookies = new Cookies();

    const logout = async () => {
        const response = await fetch("http://localhost:3000/api/users/logout", {
            method: 'Delete',
            credentials: 'include',
        })

        if ('error' in response) {
            console.log("We have error with logout")
        }

        setUser(null)
        cookies.remove("access_token")
    }

    return (
        <div className="pageHeader__container">
            <h2 className="pageHeader__title">Robis Serviss</h2>

            <div className="pageHeader__button--container">
                {user === null && (<button className="pageHeader__button--standart" onClick={() => setOpenRegisterModal(true)}>Register</button>)}

                {user !== null ? (
                    <>
                        <button className="pageHeader__button--standart" onClick={logout}>Logout</button>
                        <button className="pageHeader__button--standart">Profile</button>
                    </>

                ) : (
                    <button className="pageHeader__button--standart" onClick={() => setOpenLoginModal(true)}>Login</button>
                )}
                <Link to="/cart" className="pageHeader__button--standart">Cart</Link>
            </div>

            {openRegisterModal && (
                <div className="pageHeader__modal">
                    <div className="pageHeader__modal--content">
                        <RegisterForm onClose={() => setOpenRegisterModal(false)} />
                    </div>
                </div>
            )}
            {user === null && openLoginModal && (
                <div className="pageHeader__modal">
                    <div className="pageHeader__modal--content">
                        <LoginForm setUserState={setUser} onClose={() => setOpenLoginModal(false)}></LoginForm>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PageHeader;
