import { SubmitHandler, useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
// import Cookies from "universal-cookie";
import { UserType } from "../../../Pages/MainPage/MainPage";

type FormData = {
    email: string;
    password: string;
}

type LoginFormProps = {
    setUserState: (user: UserType) => void;
}

const LoginForm = ({setUserState}: LoginFormProps) => {
    const { register, handleSubmit, formState: { errors }} = useForm<FormData>()

    // const cookies = new Cookies();

    const login = (jwt_token:string) => {
        const decoded: UserType = jwtDecode(jwt_token);

        setUserState(decoded)

        // const date = new Date();

        // const expirationDate = new Date(date.getTime() + 86400000);

        // cookies.set("jwt_authorization", jwt_token, { expires: expirationDate })
    }

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(11111, data)

        fetch("http://localhost:3000/api/users/login", {
            method: 'POST',
            credentials: "include",
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(res => login(res.accessToken));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("email", {
                required: "E-mail is required",
                pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                }
            })} type="text" placeholder="E-mail" />
            <p>{errors.email?.message}</p>

            <input {...register("password", {
                required: "Password is required",
                minLength: {
                    value: 8,
                    message: "Minimal length for password is 8 characters",
                }})} type="text" placeholder="Password" />
            <p>{errors.password?.message}</p>

            <button>Submit</button>
        </form>
    );
};

export default LoginForm;
