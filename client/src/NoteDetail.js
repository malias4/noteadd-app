function NoteDetail({ note }) {
  return (
    <div style={{ display: "grid", rowGap: "4px" }}>
      <div style={{ fontSize: "22px" }}>{note.name}</div>
      <div>{note.category}</div>
      <div>{note.content}</div>
    </div>
  );
}

export default NoteDetail;
