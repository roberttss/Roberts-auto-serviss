import { RefObject } from "react";
import './MainPage.scss'
import ProductList from "../../Components/ProductList/ProductList";
import { MainPageIntroduction } from "../../Components/MainPageIntroduction/MainPageIntroduction";

type MainPageProps = {
    productsRef: RefObject<HTMLDivElement>
}

const MainPage = ({ productsRef }: MainPageProps) => {
   
    return (
        <div>
            <div className="mainPage__introduction--container">
                <MainPageIntroduction productsRef={productsRef}></MainPageIntroduction>
            </div>
            <div className="mainPage__product--container">
                <div className="mainPage__product--title" ref={productsRef}>Our products</div>
                <ProductList />
            </div>
        </div>
    )
}

export default MainPage