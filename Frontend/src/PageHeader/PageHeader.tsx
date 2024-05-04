import { useState } from "react";
import "./PageHeader.css";

const PageHeader = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    return (
        <div className="pageHeader__container">
            <h2>RS</h2>
            <h2>Robis Serviss</h2>
            <button onClick={() => setOpenModal(true)}>Login</button>
            {openModal && (
                <div className="pageHeader__modal">
                    <div className="pageHeader__modal--content">
                        <p>Check Check</p>
                        <button
                            className="pageHeader__modal--close"
                            onClick={() => setOpenModal(false)}
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
