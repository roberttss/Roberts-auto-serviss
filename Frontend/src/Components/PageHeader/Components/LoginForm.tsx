import { SubmitHandler, useForm } from "react-hook-form";

type FormData = {
    email: string;
    password: string;
}

const LoginForm = () => {
    const { register, handleSubmit } = useForm<FormData>()

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(123, data)
        fetch("http://localhost:3000/api/users/login", {
            method: 'POST',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(res => console.log(res.accessToken));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("email")} type="text" placeholder="E-mail" />
            <input {...register("password")} type="text" placeholder="Password" />
            <button>Submit</button>
        </form>
    );
};

export default LoginForm;
