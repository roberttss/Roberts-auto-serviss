import { useRef } from "react";
import './MainPage.scss'
import ProductList from "../../Components/ProductList/ProductList";
import { MainPageIntroduction } from "../../Components/MainPageIntroduction/MainPageIntroduction";
import { ServiceOrder } from "../../Components/ServiceOrder/ServiceOrder";

const MainPage = () => {
   
    const productsRef = useRef<HTMLDivElement>(null)
    const serviceRef = useRef<HTMLDivElement>(null)

    return (
        <div>
            <div className="mainPage__introduction--container">
                <MainPageIntroduction productsRef={productsRef} serviceRef={serviceRef} />
            </div>
            <div className="mainPage__product--container">
                <div className="mainPage__product--title" ref={productsRef}>Our products</div>
                <ProductList />
                <h1 ref={serviceRef}>Service order</h1>
                <ServiceOrder serviceRef={serviceRef}/>
            </div>
        </div>
    )
}

export default MainPage