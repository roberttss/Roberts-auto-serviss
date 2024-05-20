import { RefObject } from 'react';
import './MainPageIntroduction.scss'
import picture from './assets/static/ServicePhoto.jpg'

type MainPageIntroductionProps = {
    productsRef: RefObject<HTMLDivElement>
}

export const MainPageIntroduction = ({ productsRef }: MainPageIntroductionProps) => {
    const scrollToRef = () => {
        if (productsRef === null) {
            return null
        }

        if (productsRef.current) {
            window.scrollTo({
                top: productsRef.current.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className='introduction__container marginForHeader'>
            <div>
                <div className='introduction__title--container'>
                    <h1 className='introduction__title'>Welcome to</h1>
                    <h1 className='introduction__title textAlignCenter'>Robis Serviss</h1>
                    <h1 className='introduction__title textAlignEnd'>page</h1>
                </div>
                <img className='introduction__image' src={picture} alt="Serviss picture" />
            </div>
            <div className='introduction__button--container'>
                <button className='introduction__button--style' onClick={scrollToRef}>Check our products</button>
                <button className='introduction__button--style'>Reserve time</button>
                <button className='introduction__button--style'>Something maybe</button>
            </div>
        </div>
    )
};