import { SubmitHandler, useForm } from "react-hook-form";

type FormData = {
    email: string;
    name: string;
    password: string;
}

const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

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
            
            <input {...register("email", {
                required: "E-mail is required", 
                pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                }})} type="text" placeholder="E-mail" />
            <p>{errors.email?.message}</p>

            <input {...register("name", { required: "Name is required" })} type="text" placeholder="Name" />
            <p>{errors.name?.message}</p>

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

export default RegisterForm;
