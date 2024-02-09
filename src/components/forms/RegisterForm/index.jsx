import { Input } from "../Input";
import { InputPassword } from "../InputPassword";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema } from "./registerFormSchema";
import { RoutineUserContext } from "../../../providers/RoutineUserContext";
import { useContext, useState } from "react";

export const RegisterForm = () => {
  const [loading, setLoading] = useState(false);

  const { userRegister } = useContext(RoutineUserContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerFormSchema),
  });

  const submit = (formData) => {
    userRegister(formData, reset, setLoading);
  };

  return (
    <>
      <form className="formBox" onSubmit={handleSubmit(submit)}>
        <h2 className="title2 white">Crie sua conta</h2>
        <span className="headlineBold grey">Rápido e grátis, vamos nessa</span>

        <Input
          label="Nome Completo"
          type="text"
          placeholder="Digite seu nome"
          {...register("fullName")}
          error={errors.fullName}
          disabled={loading}
        />

        <Input
          label="Email"
          type="email"
          placeholder="Digite seu email"
          {...register("email")}
          error={errors.email}
          disabled={loading}
        />

        <InputPassword
          label="Senha"
          placeholder="Digite sua senha"
          {...register("password")}
          error={errors.password}
          disabled={loading}
        />

        <InputPassword
          label="Confirmar Senha"
          placeholder="Digite novamente sua senha"
          {...register("confirmPassword")}
          error={errors.confirmPassword}
          disabled={loading}
        />

        <Input
          label="Fone"
          type="text"
          placeholder="Telefone de contato"
          {...register("fone")}
          error={errors.fone}
          disabled={loading}
        />

        <button className="btn lg brown" type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </>
  );
};
