import { useContext, useState } from "react";
import "./PageHeader.scss";
import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";
import Cookies from 'universal-cookie';
import { Link } from "react-router-dom";
import { GlobalContext } from "../../GlobalContext/GlobalContext";
import { Modal } from "../Modal/Modal";

const PageHeader = () => {
    const { itemsInCart, user, setUser } = useContext(GlobalContext)

    const [openRegisterModal, setOpenRegisterModal] = useState<boolean>(false);
    const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
    const cookies = new Cookies();

    const logout = async () => {
        const response = await fetch("http://localhost:3000/api/users/logout", {
            method: 'Delete',
            credentials: 'include',
        })

        if ('error' in response) {
            alert("Error has occurred, please try again later")
        }

        setUser(null)
        cookies.remove("access_token")
    }

    const itemCountInCart = (): number => {
        const amount = itemsInCart.map(({ amountInCart }) => amountInCart).reduce((a, b) => a + b, 0)

        return amount
    }

    return (
        <div className="pageHeader__container">
            <Link to="/" className="pageHeader__title">Robis Serviss</Link>

            <div className="pageHeader__button--container">
                {user === null && (<button className="pageHeader__button--standart" onClick={() => setOpenRegisterModal(true)}>Register</button>)}

                {user !== null ? (
                    <>
                        <button className="pageHeader__button--standart" onClick={logout}>Logout</button>
                        <Link to="/profile" className="pageHeader__button--standart">Profile</Link>
                    </>

                ) : (
                    <button className="pageHeader__button--standart" onClick={() => setOpenLoginModal(true)}>Login</button>
                )}
                <Link to="/cart" className="pageHeader__button--standart relative">Cart {itemsInCart.length !== 0 && <span className="pageHeader__cart--circle">{itemCountInCart()}</span>}</Link>
            </div>

            {openRegisterModal && (
                <Modal>
                    <RegisterForm onClose={() => setOpenRegisterModal(false)} />
                </Modal>
            )}
            {user === null && openLoginModal && (
                <Modal>
                    <LoginForm setUserState={setUser} onClose={() => setOpenLoginModal(false)} />
                </Modal>
            )}
        </div>
    );
};

export default PageHeader;
