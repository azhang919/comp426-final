import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../../contexts/AuthContext.js";

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <Card>
      <Card.Header as="h3" className="text-center">
        Profile
      </Card.Header>
      <Card.Body>
        <strong>Email: </strong> {currentUser.email}
      </Card.Body>
    </Card>
  );
};

export default Profile;
