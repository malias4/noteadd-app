import { useContext, useState } from "react";
import { NoteListContext } from "./NoteListContext.js";

import Button from "react-bootstrap/esm/Button.js";

import NoteCard from "./NoteCard";
import NoteForm from "./NoteForm.js";
import Container from "react-bootstrap/esm/Container.js";

import Icon from "@mdi/react";
import { mdiPlusBoxOutline } from "@mdi/js";

function NoteList() {
  const { noteList } = useContext(NoteListContext);
  const [showNoteForm, setShowNoteForm] = useState(false);

  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
        <Button variant="success" onClick={() => setShowNoteForm({})}>
          <Icon path={mdiPlusBoxOutline} size={1} color={"white"} /> Nová
          poznámka
        </Button>
      </div>
      {!!showNoteForm ? (
        <NoteForm note={showNoteForm} setShowNoteForm={setShowNoteForm} />
      ) : null}
      {noteList.map((note) => {
        return (
          <NoteCard
            key={note.id}
            note={note}
            setShowNoteForm={setShowNoteForm}
          />
        );
      })}
    </Container>
  );
}

export default NoteList;
