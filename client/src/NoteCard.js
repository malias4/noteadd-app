import Button from "react-bootstrap/esm/Button.js";
import { useNavigate } from "react-router-dom";

import NoteDetail from "./NoteDetail";

import Icon from "@mdi/react";
import { mdiPencil, mdiEyeOutline } from "@mdi/js";

function NoteCard({ note, setShowNoteForm }) {
  const navigate = useNavigate();

  return (
    <div className="card border-0 shadow rounded" style={componentStyle()}>
      <h2>{note.category}</h2>
      <p>{note.name}</p>
      <NoteDetail note={note} />
      <div
        style={{
          display: "grid",
          gap: "2px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          onClick={() => navigate("/noteDetail?id=" + note.id)}
          size={"sm"}
        >
          <Icon path={mdiEyeOutline} size={0.7} />
        </Button>
        <Button onClick={() => setShowNoteForm(note)} size={"sm"}>
          <Icon path={mdiPencil} size={0.7} />
        </Button>
      </div>
    </div>
  );
}

function componentStyle() {
  return {
    margin: "12px auto",
    padding: "8px",
    gridTemplateColumns: "max-content auto",
    columnGap: "8px",
    maxWidth: "640px",
    backgroundColor: "#007bff",
    color: "white",
    marginBottom: "20px",
  };
}

export default NoteCard;
