import { useContext } from "react";
import { BiPlus } from "react-icons/bi";
import { RoutineTechContext } from "../../providers/ContactContext";
import { ContactCard } from "./ContactCard";
import styles from "./style.module.scss";

export const ContactList = () => {
  const { techList, setIsOpenModalCreateTech } = useContext(RoutineTechContext);

  return (
    <div className={styles.containerList}>
      <div>
        <h3 className="title2 white">Contatos</h3>
        <button
          className="btn sm grey"
          onClick={() => setIsOpenModalCreateTech(true)}
          title="Adicionar Tech"
          area-aria-label="add"
        >
          <BiPlus color="white" size={24} />
        </button>
      </div>

      <ul>
        {techList?.map((tech) => (
          <ContactCard key={tech.id} tech={tech} />
        ))}
      </ul>
    </div>
  );
};
