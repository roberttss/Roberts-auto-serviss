import { SubmitHandler, useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import './Form.scss'
import { UserType } from "../../../GlobalContext/GlobalContext";

type FormData = {
    email: string;
    password: string;
}

type LoginFormProps = {
    setUserState: (user: UserType) => void;
    onClose: (state: boolean) => void
}

const LoginForm = ({ setUserState, onClose }: LoginFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

    const login = (jwt_token: string) => {
        const decoded: UserType = jwtDecode(jwt_token);

        setUserState(decoded)
    }

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const response = await fetch("http://localhost:3000/api/users/login", {
            method: 'POST',
            credentials: "include",
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(data)
        })
        const responseJSON = await response.json();

        if (responseJSON.message === 'Invalid email or password') {
            return alert("Login failed, invalid e-mail or password")
        }

        login(responseJSON.accessToken)

        return onClose(true)
    }

    return (
        <div className="form__container">
            <h1 className="form__title">Login form</h1>
            <form className="form__main--container" onSubmit={handleSubmit(onSubmit)}>

                <div className="form__input--container">
                    <label className="form__label" htmlFor="e-mail">E-mail</label>
                    <input className="form__inputField" {...register("email", {
                        required: "E-mail is required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Entered value does not match email format",
                        }
                    })} type="text" placeholder="E-mail" id="e-mail" />
                    <p className="form__error">{errors.email?.message}</p>
                </div>

                <div className="form__input--container">
                    <label className="form__label" htmlFor="password">Password</label>
                    <input className="form__inputField" {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Minimal length for password is 8 characters",
                        }
                    })} type="password" placeholder="Password" id="password" />
                    <p className="form__error">{errors.password?.message}</p>
                </div>

                <div className="form__buttons--container">
                    <button
                        className="form__button--cancel"
                        onClick={() => onClose(true)}
                    >
                        Cancel
                    </button>
                    <button className="pageHeader__button--standart">Submit</button>
                </div>
            </form>
        </div>

    );
};

export default LoginForm;
