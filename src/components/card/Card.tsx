import React from "react";
import { useNavigate } from "react-router";
import "./style.scss";
import Button from "../button/Button";
import { Note } from "../../model/note";
import { deleteNota, getAllNotas } from "../../services/api";
import { Link } from "react-router-dom";

interface NotaViewProps {
  nota: Note;
}

const Card: React.FunctionComponent<NotaViewProps> = (props) => {
  let items = JSON.parse(localStorage.getItem("notas") || "[]");
  const navigate = useNavigate();
  const { nota } = props;

  function handleUpdateNote(e: Event) {
    e.stopPropagation();
    navigate(`notes/update/${nota.id}`);
  }

  function handleDeleteNote(e: Event) {
    e.stopPropagation();
    deleteNota(nota.id)
      .then(() => {
        items = items.filter((item: Note) => item.id !== nota.id);
        localStorage.setItem("notas", JSON.stringify(items));
        navigate("/");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("Você não tem permissão para criar uma nota!");
          navigate("/login");
        }
      });
  }

  return (
    <div className="view--card">
        <div className="view--card--title">{nota && nota.title}</div>
        <div className="view--card--content">{nota && nota.content}</div>
        <div className="view--card--content">{nota && nota.description}</div>
        <div className="view--card--footer">
          <Button onClick={handleUpdateNote} color="secondary" size="sm">
            Atualizar
          </Button>
          <Button color="danger" size="sm" onClick={handleDeleteNote}>
            Deletar
          </Button>
        </div>      
    </div>
  );
};

export default Card;
