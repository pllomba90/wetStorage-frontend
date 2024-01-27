import React, {useState} from "react";
import { redirect } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { handleInputChange } from "../helpers/formHelper";
import UserAPI from "../helpers/UserApi";

const LoginForm = (props) => {
    
    const initialState = {
        username : "",
        password : ""
    }

    const [formData, setFormData] = useState(initialState);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const res = await UserAPI.login(formData);
       
        if (res.token) {  
            localStorage.setItem("token", res.token);
           redirect("/downriver_strg");
          } else {
            
            console.error("Login failed");
          }
        }
      

    return (
        <div className="container form" >
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