import { useEffect, useState } from "react";
import { NoteListContext } from "./NoteListContext.js";

function NoteListProvider({ children }) {
  const [noteLoadObject, setNoteLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setNoteLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/note/list`, {
      method: "GET",
    });
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

  async function handleCreate(dtoIn) {
    setNoteLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/note/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setNoteLoadObject((current) => {
        current.data.push(responseJson);
        current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setNoteLoadObject((current) => {
        return { state: "error", data: current.data, error: responseJson };
      });
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleDelete(dtoIn) {
    setNoteLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/note/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setNoteLoadObject((current) => {
        const eventIndex = current.data.findIndex(
          (e) => e.id === responseJson.id
        );
        current.data.splice(eventIndex, 1);
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setNoteLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleUpdate(dtoIn) {
    setNoteLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/note/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setNoteLoadObject((current) => {
        const noteIndex = current.data.findIndex(
          (e) => e.id === responseJson.id
        );
        current.data[noteIndex] = responseJson;
        current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setNoteLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  const value = {
    state: noteLoadObject.state,
    noteList: noteLoadObject.data || [],
    handlerMap: { handleCreate, handleUpdate, handleDelete },
  };

  return (
    <NoteListContext.Provider value={value}>
      {children}
    </NoteListContext.Provider>
  );
}

export default NoteListProvider;
