import Button from "react-bootstrap/esm/Button.js";
import { useNavigate } from "react-router-dom";

import Icon from "@mdi/react";
import { mdiRename, mdiEyeOutline } from "@mdi/js";

function NoteCard({ note, setShowNoteForm }) {
  const navigate = useNavigate();

  return (
    <div className="card border-0 shadow rounded" style={componentStyle()}>
      <h2>{note.name}</h2>
      <p>{note.category}</p>
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="success"
          onClick={() => navigate("/noteDetail?id=" + note.id)}
          size={"sm"}
        >
          <Icon path={mdiEyeOutline} size={0.7} />
        </Button>
        <Button
          onClick={() => setShowNoteForm(note)}
          variant="success"
          size={"sm"}
        >
          <Icon path={mdiRename} size={0.7} />
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
    maxWidth: "100%",
    backgroundColor: "#0fa305",
    color: "white",
    marginBottom: "20px",
    alignItems: "center",
  };
}

export default NoteCard;
