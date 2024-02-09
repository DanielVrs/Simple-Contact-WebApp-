import { createContext, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const RoutineTechContext = createContext({});

export const RoutineTechProvider = ({ children }) => {
  const navigate = useNavigate();
  const client = useQueryClient();
  const pathname = window.location.pathname;

  const [editingContact, setEditingContact] = useState(null);

  const [isOpenModalCreateTech, setIsOpenModalCreateTech] = useState(false);

  const revalidate = () => {
    client.invalidateQueries({ queryKey: "contact" });
  };

  const { data: contactList } = useQuery({
    queryKey: ["contact"],
    queryFn: async () => {
      const token = localStorage.getItem("@token-KenzieHub");
      if (token) {
        const { data } = await api.get("/contact", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return data;
      } else return null;
    },
  });

  const createContact = useMutation({
    mutationFn: async (formData) => {
      const token = localStorage.getItem("@token-KenzieHub");
      return await api.post("/contact", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      revalidate();
      toast.success("Tech criada com sucesso!");
      setIsOpenModalCreateTech(false);
    },
  });

  const deleteContact = useMutation({
    mutationFn: async (techId) => {
      const token = localStorage.getItem("@token-KenzieHub");

      return await api.delete(`/contact/${techId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      revalidate();
      toast.success("Contato deletado com sucesso!");
    },
  });

  const editContact = useMutation({
    mutationFn: async (data) => {
      const formData = data.formData;
      const contactId = data.id;

      const token = localStorage.getItem("@token-KenzieHub");

      return await api.patch(`/contact/${contactId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      revalidate();
      toast.success("Contato editado com sucesso!");
      setEditingContact(null);
    },
  });

  return (
    <RoutineTechContext.Provider
      value={{
        techList: contactList,
        createTech: createContact,
        editTech: editContact,
        deleteTech: deleteContact,
        setEditingTech: setEditingContact,
        isOpenModalCreateTech,
        setIsOpenModalCreateTech,
        editingTech: editingContact,
      }}
    >
      {children}
    </RoutineTechContext.Provider>
  );
};
