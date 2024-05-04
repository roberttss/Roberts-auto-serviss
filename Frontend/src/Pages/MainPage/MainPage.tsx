import PageHeader from "../../Components/PageHeader/PageHeader"

const MainPage = () => {

    const checkUsers = async () => {
        const response = await fetch('http://localhost:3000/api/users')

        const users = await response.json();
        console.log(123123, users);
    }

    return (
        <div>
            <PageHeader></PageHeader>
            <h1>This is main page</h1>
            <button onClick={checkUsers}>Check Check</button>
        </div>
    )
}

export default MainPage