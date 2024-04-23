import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import NoteList from "./NoteList";
import NoteListProvider from "./NoteListProvider";
import NoteProvider from "./NoteProvider";
import NoteRoute from "./NoteRoute";

function App() {
  return (
    <div style={componentStyle()}>
      <NoteListProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<NoteList />} />
              <Route
                path="noteDetail"
                element={
                  <NoteProvider>
                    <NoteRoute />
                  </NoteProvider>
                }
              />
              <Route path="*" element={"not found"} />
            </Route>
          </Routes>
        </BrowserRouter>
      </NoteListProvider>
    </div>
  );
}

function componentStyle() {
  return {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: "#333232",
  };
}

export default App;
