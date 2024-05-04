import { useContext, useState } from "react";
import { NoteListContext } from "./NoteListContext.js";

import Button from "react-bootstrap/esm/Button.js";

import NoteCard from "./NoteCard";
import NoteForm from "./NoteForm.js";
import Container from "react-bootstrap/esm/Container.js";

import Icon from "@mdi/react";
import { mdiFileDocumentPlusOutline } from "@mdi/js";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog.js";

function NoteList() {
  const { noteList } = useContext(NoteListContext);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);

  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <Button variant="success" onClick={() => setShowNoteForm({})}>
          <Icon
            path={mdiFileDocumentPlusOutline}
            size={1}
            color={"white"}
            style={{ verticalAlign: "middle" }}
          />{" "}
          Nová poznámka
        </Button>
      </div>
      {!!showNoteForm ? (
        <NoteForm note={showNoteForm} setShowNoteForm={setShowNoteForm} />
      ) : null}

      {!!showConfirmDeleteDialog ? (
        <ConfirmDeleteDialog
          note={showConfirmDeleteDialog}
          setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
        />
      ) : null}
      {noteList.map((note) => {
        return (
          <NoteCard
            key={note.id}
            note={note}
            setShowNoteForm={setShowNoteForm}
            setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
          />
        );
      })}
    </Container>
  );
}

export default NoteList;
