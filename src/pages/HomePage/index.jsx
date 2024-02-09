import { useContext } from "react";
import { Header } from "../../components/Header";
import { RoutineUserContext } from "../../providers/RoutineUserContext";
import { ContactList } from "../../components/ContactList";
import styles from "./style.module.scss";
import { CreateTechModal } from "../../components/Modal/CreateContactModal";
import { EditTechModal } from "../../components/Modal/EditContactModal";
import { RoutineTechContext } from "../../providers/ContactContext";
import { CreateTechForm } from "../../components/forms/CreateContactForm";
import { EditTechForm } from "../../components/forms/EditContactForm";

export const HomePage = () => {
  const { user, userLogout } = useContext(RoutineUserContext);

  const { isOpenModalCreateTech, createTech, editingTech } =
    useContext(RoutineTechContext);

  return (
    <div className={styles.dashFlex}>
      {isOpenModalCreateTech ? (
        <CreateTechModal>
          <CreateTechForm />
        </CreateTechModal>
      ) : null}

      {editingTech ? (
        <EditTechModal>
          <EditTechForm />
        </EditTechModal>
      ) : null}

      <Header>
        <button className="btn sm grey" onClick={() => userLogout.mutate()}>
          Sair
        </button>
      </Header>

      <main>
        <section className={styles.containerUserInfo}>
          <div>
            <h2 className="headlineBoldFixed white">Olá, {user?.fullName}</h2>
          </div>
        </section>

        <section className={styles.containerPending}>
          <ContactList />
        </section>
      </main>
    </div>
  );
};
