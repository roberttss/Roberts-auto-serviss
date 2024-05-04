import { SubmitHandler, useForm } from "react-hook-form";

type FormData = {
    email: string;
    name: string;
    password: string;
}

const RegisterForm = () => {
    const { register, handleSubmit } = useForm<FormData>()

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(123, data)
        fetch("http://localhost:3000/api/users/create", {
            method: 'POST',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(data)
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("email")} type="text" placeholder="E-mail" />
            <input {...register("name")} type="text" placeholder="Name" />
            <input {...register("password")} type="text" placeholder="Password" />
            <button>Submit</button>
        </form>
    );
};

export default RegisterForm;
