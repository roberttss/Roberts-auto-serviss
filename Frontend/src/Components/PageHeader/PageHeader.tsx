import { useState } from "react";
import "./PageHeader.css";
import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";

const PageHeader = () => {
    const [openRegisterModal, setOpenRegisterModal] = useState<boolean>(false);
    const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);

    return (
        <div className="pageHeader__container">
            <h2 className="pageHeader__container">RS</h2>
            <h2>Robis Serviss</h2>
            <button onClick={() => setOpenRegisterModal(true)}>Register</button>
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
            <button onClick={() => setOpenLoginModal(true)}>Open</button>
            {openLoginModal && (
                <div className="pageHeader__modal">
                    <div className="pageHeader__modal--content">
                        <LoginForm></LoginForm>
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
    );
};

export default PageHeader;
