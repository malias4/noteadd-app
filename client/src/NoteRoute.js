import { useContext } from "react";
import { NoteContext } from "./NoteContext";

import NoteDetail from "./NoteDetail";

function NoteRoute() {
  const { note } = useContext(NoteContext);

  return (
    <div className="card border-0 shadow rounded" style={componentStyle()}>
      {note ? (
        <>
          <NoteDetail note={note} />
          <div
            style={{
              display: "grid",
              gap: "2px",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
        </>
      ) : (
        "loading..."
      )}
    </div>
  );
}

function componentStyle() {
  return {
    margin: "12px auto",
    padding: "8px",
    columnGap: "20px",
    maxWidth: "100%",
    backgroundColor: "#0fa305",
    color: "white",
    marginBottom: "20px",
    gridTemplateColumns: "max-content auto 32px",
    textAlign: "center",
  };
}

export default NoteRoute;
