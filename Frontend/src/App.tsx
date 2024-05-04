import './App.css'
import PageHeader from './Components/PageHeader/PageHeader'

const App = () => {
    //   const sendData = () => {
    //     const options = {
    //         method: "POST",
    //         body: JSON.stringify({
    //             email: "aaa@aaa.lv",
    //             name: "Toms",
    //             password: "b96ade1b0673409a3526399601dca70d997bf2b8adab532693c3ecb0b4495d311188e9fdac892ec548c5e686bcf9698ae5af97ea47df93f9f0ba3a093077e1d6",
    //         })
    //     }
    //     fetch('http://localhost:3000/api/users', options)
    //   }

    // const test = async () => {
    //     const response = await
    //         fetch("http://localhost:3000/healthcheck");
    //     const movies = await response.json();
    //     console.log(123123, movies);
    // }


    return (
        <>
            <PageHeader></PageHeader>
        </>
    )
}

export default App
