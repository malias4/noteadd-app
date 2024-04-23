import Icon from "@mdi/react";
import { mdiNotePlus } from "@mdi/js";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function NavBar() {
  return (
    <Container>
      <Navbar expand="lg" className="bg-body-tertiary" style={componentStyle()}>
        <Container>
          <Icon path={mdiNotePlus} size={1} />
          <Navbar.Brand href="/" style={brandStyle()}>
            NoteAdd
          </Navbar.Brand>
        </Container>
      </Navbar>
    </Container>
  );
}

function componentStyle() {
  return { backgroundColor: "#d63232" };
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
