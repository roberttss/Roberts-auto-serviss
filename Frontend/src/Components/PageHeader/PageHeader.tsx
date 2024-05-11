import { useContext, useState } from "react";
import "./PageHeader.scss";
import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";
import Cookies from 'universal-cookie';
import { Link } from "react-router-dom";
import { GlobalContext } from "../../GlobalContext/GlobalContext";

const PageHeader = () => {
    const { itemsInCart, user, setUser} = useContext(GlobalContext)

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
            <Link to="/" className="pageHeader__title">Robis Serviss</Link>

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
                <Link to="/cart" className="pageHeader__button--standart relative">Cart {itemsInCart.length !== 0 && <span className="pageHeader__cart--circle">{itemsInCart.length}</span>}</Link>
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
