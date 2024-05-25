import { ReactNode } from 'react'
import './Modal.scss'

type ModalProps = {
    children: ReactNode;
}

export const Modal = ({ children }: ModalProps) => {

    return (
        <div className="modal__container">
            <div className='modal__content'>
                {children}
            </div>
        </div>
    )
}