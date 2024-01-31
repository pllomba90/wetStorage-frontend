import React, {useState} from "react";
import { Button } from "reactstrap";
import Popup from "reactjs-popup";
import LoginForm from "./User/LoginForm";
import NewUserForm from "./User/NewUserForm"

const Home = () => {

  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showNewUserPopup, setShowNewUserPopup] = useState(false);

  return (
    <div >
      <div className="title_box">
        <div className="title">
          <h1>Norumbega Oyster</h1>
        </div>
        </div > 
        <div className="login">
          <p>Please login or create a user to continue!</p>
          <div>
          <Button color="secondary" onClick={() => setShowLoginPopup(true)}>
            Login
            </Button>
            </div>
            <div>
          <Button color="secondary"
          onClick={() => setShowNewUserPopup(true)}>
            Create User</Button>
        </div>
        </div>
        <Popup
        open={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
        modal
      >
        <LoginForm onClose={() => setShowLoginPopup(false)}/>
      </Popup>
      <Popup
        open={showNewUserPopup}
        onClose={() => setShowNewUserPopup(false)}
        modal
      >
        <NewUserForm  onClose={() => setShowNewUserPopup(false)}/>
      </Popup>
      
    </div>
  );
};

export default Home;
