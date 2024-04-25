import { useNavigate } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiNotePlus } from "@mdi/js";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/esm/Button";

function NavBar() {
  const navigate = useNavigate();
  return (
    <Navbar expand="lg" style={componentStyle()}>
      <Container style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="success"
          style={brandStyle()}
          onClick={() => navigate("/")}
        >
          <Icon path={mdiNotePlus} size={1} color={"white"} />
          NoteAdd
        </Button>
      </Container>
    </Navbar>
  );
}

function componentStyle() {
  return { backgroundColor: "#448f03" };
}

function brandStyle() {
  return {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "white",
  };
}

export default NavBar;
