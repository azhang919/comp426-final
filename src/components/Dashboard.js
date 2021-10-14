import { useState } from "react";
import { Tabs, Tab, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.js";
import { useHistory } from "react-router-dom";
import Profile from "./user/Profile.js";
import Weather from "./home/Weather.js";
import Quote from "./home/Quote.js";
import TaskList from "./work/TaskList.js";
import { auth } from "../firebase.js";
import Game from "./game/Game.js";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [key, setKey] = useState("home");

  const [error, setError] = useState("");
  const { logout } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  };

  const style1 = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "stretch",
    width: "80vw"
  }
  
  const style2 = {
    flex: "1",
    textAlign: "center",
  }

  return (
    <>
      <section className="w-100 h-100">
        <div className="d-flex justify-content-end mt-3">
            {error && <Alert variant="danger">{error}</Alert>}
            <Button variant="link" onClick={handleLogout}>
            Log Out
            </Button>
        </div>
        <Tabs
          style={style1}
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mt-2 mb-3"
          mountOnEnter={true}
          unmountOnExit={true}
        >
          <Tab eventKey="home" title="Home" style={style2}>
            <Weather />
            <Quote />
          </Tab>
          <Tab eventKey="work" title="Work" style={style2}>
            <TaskList uid={auth.currentUser.uid} />
          </Tab>
          <Tab eventKey="contact" title="Play" style={style2}>
            <Game />
          </Tab>
          <Tab eventKey="profile" title="Profile" style={style2}>
            <Profile />
          </Tab>
        </Tabs>
      </section>
    </>
  );
};

export default Dashboard;
