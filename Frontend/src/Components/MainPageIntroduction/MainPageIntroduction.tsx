import './MainPageIntroduction.scss'
import picture from './assets/static/ServicePhoto.jpg'

export const MainPageIntroduction = () => (
    <div className='introduction__container'>
        <div>
            <div className='introduction__title--container'>
                <h1 className='introduction__title'>Welcome to</h1>
                <h1 className='introduction__title textCenter'>Robis Serviss</h1>
                <h1 className='introduction__title textEnd'>page</h1>
            </div>
            <img className='introduction__image' src={picture} alt="Serviss picture" />
        </div>
        <div>
            <button>Check Items</button>
            <button>Reserve time</button>
            <button>Something maybe</button>
        </div>
    </div>
);