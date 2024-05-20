import { useContext } from "react"
import { GlobalContext } from "../../GlobalContext/GlobalContext"

export const Profile = () => {
    const { user } = useContext(GlobalContext)

    return (
        <div className="marginForHeader">
            <h1>THis is profile for {user?.name}</h1>
        </div>
    )   
}