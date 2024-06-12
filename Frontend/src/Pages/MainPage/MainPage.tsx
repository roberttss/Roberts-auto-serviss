import { useRef } from "react";
import './MainPage.scss'
import ProductList from "../../Components/ProductList/ProductList";
import { MainPageIntroduction } from "../../Components/MainPageIntroduction/MainPageIntroduction";
import { ServiceOrder } from "../../Components/ServiceOrder/ServiceOrder";
import { AboutUs } from "../AboutUs/AboutUs";

const MainPage = () => {
    const productsRef = useRef<HTMLDivElement>(null)
    const serviceRef = useRef<HTMLDivElement>(null)
    const AboutRef = useRef<HTMLDivElement>(null)

    return (
        <div>
            <div className="mainPage__introduction--container">
                <MainPageIntroduction productsRef={productsRef} serviceRef={serviceRef} AboutRef={AboutRef} />
            </div>
            <div className="mainPage__product--container">
                <h1 className="mainPage__title" ref={productsRef}>Our products</h1>
                <ProductList />
                <h1 className="mainPage__title" ref={serviceRef}>Service order</h1>
                <ServiceOrder />
                <h1 className="mainPage__title" ref={AboutRef}>About us</h1>
                <AboutUs />
            </div>
        </div>
    )
}

export default MainPage