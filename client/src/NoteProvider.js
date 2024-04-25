import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { NoteContext } from "./NoteContext.js";

function NoteProvider({ children }) {
  const [noteLoadObject, setNoteLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });
  const location = useLocation();

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setNoteLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(
      `http://localhost:8000/note/get?id=${new URLSearchParams(
        location.search
      ).get("id")}`,
      {
        method: "GET",
      }
    );
    const responseJson = await response.json();
    if (response.status < 400) {
      setNoteLoadObject({ state: "ready", data: responseJson });
      return responseJson;
    } else {
      setNoteLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }
  const value = {
    note: noteLoadObject.data,
  };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
}

export default NoteProvider;
