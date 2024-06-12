import { RefObject } from 'react';
import './MainPageIntroduction.scss'
import picture from './assets/static/ServicePhoto.jpg'

type MainPageIntroductionProps = {
    productsRef: RefObject<HTMLDivElement>,
    serviceRef: RefObject<HTMLDivElement>,
    AboutRef: RefObject<HTMLDivElement>,
}

export const MainPageIntroduction = ({ productsRef, serviceRef, AboutRef }: MainPageIntroductionProps) => {
    const scrollToRef = (ref: RefObject<HTMLDivElement>) => {
        if (ref === null) {
            return null
        }

        if (ref.current) {
            window.scrollTo({
                top: ref.current.offsetTop - 70,
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
                <button className='introduction__button--style' onClick={() => scrollToRef(AboutRef)}>About us</button>
                <button className='introduction__button--style' onClick={() => scrollToRef(productsRef)}>Check our products</button>
                <button className='introduction__button--style' onClick={() => scrollToRef(serviceRef)}>Reserve time</button>
            </div>
        </div>
    )
};