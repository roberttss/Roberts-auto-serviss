import { SubmitHandler, useForm } from "react-hook-form";
import './Form.scss'

type FormData = {
    email: string;
    name: string;
    password: string;
}

type RegisterFormProps = {
    onClose: (state: boolean) => void
}

const RegisterForm = ({onClose}: RegisterFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const response = await fetch("http://localhost:3000/api/users/create", {
            method: 'POST',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(data)
        })
        const responseJSON = await response.json();

        if (responseJSON.statusCode === 500) {
            return alert("Registration failed, please change the e-mail or try again later")
        }

        
            onClose(true)

            return alert("Registration completed")
    }

    return (
        <div className="form__container">
            <h1 className="form__title">Register form</h1>
            <form className="form__main--container" onSubmit={handleSubmit(onSubmit)}>
                <div className="form__input--container">
                    <label className="form__label" htmlFor="e-mail">E-mail</label>
                    <input className="form__inputField" {...register("email", {
                        required: "E-mail is required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Entered value does not match email format",
                        }
                    })} type="text" placeholder="E-mail" id="email"/>
                    <p className="form__error">{errors.email?.message}</p>
                </div>
                
                <div className="form__input--container">
                    <label className="form__label" htmlFor="name">Name</label>
                    <input className="form__inputField" {...register("name", { required: "Name is required" })} type="text" placeholder="Name" id="name"/>
                    <p className="form__error">{errors.name?.message}</p>
                </div>

                <div className="form__input--container">
                    <label className="form__label" htmlFor="password">Password</label>
                    <input className="form__inputField" {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Minimal length for password is 8 characters",
                        }
                    })} type="password" placeholder="Password" />
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

export default RegisterForm;
