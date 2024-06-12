import happyMech from './assets/static/mechanic.jpg'
import './AboutUs.scss'

export const AboutUs = () => (
        <div className='about__container'>
            <img src={happyMech} alt="Happy mechanic" className='about__picture' />

            <p className='about__text'>Welcome to <b className='textBold'>Robis serviss</b>, your trusted partner for comprehensive car care. We specialize in providing top-notch services including tyre changes, general inspections, and thorough car cleaning to keep your vehicle running smoothly and looking its best. Additionally, our shop offers a wide selection of quality automotive products to meet all your car maintenance needs. At <b className='textBold'>Robis serviss</b>, we are dedicated to delivering exceptional service and ensuring your complete satisfaction. Drive in today and experience the difference!</p>
        </div>
    )