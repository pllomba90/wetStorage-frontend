import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { handleInputChange } from "../helpers/formHelper";
import UserAPI from "../helpers/UserApi";

const LoginForm = (props) => {
    const navigate = useNavigate();
    const initialState = {
        username : "",
        password : ""
    }

    const [formData, setFormData] = useState(initialState);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const res = await UserAPI.login(formData);
        localStorage.setItem("token", res);
        if (res) {  
            
           return navigate("/downriver_strg");
          } else {
            
            console.error("Login failed");
          }
        }
      

    return (
        <div className="form" >
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="usernameInput">
                        Username
                    </Label>
                    <Input
                    id="usernameInput"
                    name="username"
                    type="text"
                    placeholder="Username"
                    onChange={(e) => handleInputChange(e, setFormData)}
                    value={formData.username}/>
                    </FormGroup>
                    <FormGroup>
                    <Label for="passwordInput">
                        Password
                    </Label>
                    <Input
                    id="passwordInput"
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => handleInputChange(e, setFormData)}
                    value={formData.password}/>
                </FormGroup>
            <Button color="secondary">Login</Button>
            <Button color="danger" onClick={ props.onClose }>Cancel</Button>
            </Form>
        </div>
    )
};

export default LoginForm;