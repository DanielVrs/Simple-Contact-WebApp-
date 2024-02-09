import { useContext } from "react";
import { RoutineTechContext } from "../../../providers/ContactContext";
import { Input } from "../Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTechFormSchema } from "./createContactFormSchema";
import styles from "./style.module.scss";

export const CreateTechForm = () => {
  const { createTech } = useContext(RoutineTechContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createTechFormSchema),
  });

  const submit = (formData) => {
    createTech.mutate(formData);
  };

  return (
    <form className={styles.formTech} onSubmit={handleSubmit(submit)}>
      <Input
        label="Nome Completo"
        type="text"
        placeholder="Digite o nome completo"
        {...register("fullName")}
        error={errors.fullName}
      />
      <Input
        label="Email"
        type="text"
        placeholder="Digite a Email"
        {...register("email")}
        error={errors.email}
      />
      <Input
        label="Fone"
        type="text"
        placeholder="Digite a Fone"
        {...register("fone")}
        error={errors.fone}
      />
      <button className="btn lg pink" type="submit">
        Cadastrar Contato
      </button>
    </form>
  );
};
