function NoteDetail({ note }) {
  return (
    <div style={componentStyle()}>
      <div style={textStyle("25px")}>{note.name}</div>
      <div style={textStyle("20px")}>{note.category}</div>
      <div style={textStyle("16px")}>{note.content}</div>
    </div>
  );
}

function componentStyle() {
  return {
    padding: "8px",
    maxWidth: "100%",
    backgroundColor: "#0fa305",
    color: "white",
    marginBottom: "20px",
    textAlign: "center",
  };
}

function textStyle(fontSize) {
  return {
    fontSize: fontSize,
    margin: "10px 0",
  };
}

export default NoteDetail;
