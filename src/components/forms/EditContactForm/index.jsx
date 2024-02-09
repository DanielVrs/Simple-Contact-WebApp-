import { useContext } from "react";
import { RoutineTechContext } from "../../../providers/ContactContext";
import { Input } from "../Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editTechFormSchema } from "./editContactFormSchema";
import styles from "./style.module.scss";

export const EditTechForm = () => {
  const { editTech, editingTech } = useContext(RoutineTechContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editTechFormSchema),
  });

  const submit = (formData) => {
    editTech.mutate({ formData, id: editingTech.id });
  };

  return (
    <form className={styles.formTech} onSubmit={handleSubmit(submit)}>
      <Input
        label="Nome Completo"
        type="text"
        placeholder="Digite o Nome"
        {...register("fullName")}
        error={errors.fullName}
      />
      <Input
        label="Email"
        type="text"
        placeholder="Digite o Email"
        {...register("email")}
        error={errors.email}
      />
      <Input
        label="Fone"
        type="text"
        placeholder="Digite o Fone"
        {...register("fone")}
        error={errors.fone}
      />
      <button className="btn lg brown" type="submit">
        Editar Contato
      </button>
    </form>
  );
};
