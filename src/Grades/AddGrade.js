import React, {useState} from "react";
import { redirect, useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { handleInputChange } from "../helpers/formHelper";
import StorageAPI from "../helpers/StorageApi";
import "./Grades.css"

const AddGrade = () => {
    const navigate = useNavigate()
    const initialState = {
        grade : "",
        density : "",
        quantity: ""
    }

    const [formData, setFormData] = useState(initialState)

    const handleSubmit = async (e) =>{
        e.preventDefault();
        let res = await StorageAPI.addGrade(formData);
        if (res.success) {
            redirect("/grades");
          } else {
            navigate("/");
          }
    }; 


    return (
        <div className="container form" >
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="gradeInput">
                        Grade
                    </Label>
                    <Input
                    id="gradeInput"
                    name="grade"
                    type="text"
                    placeholder="Grade"
                    onChange={(e) => handleInputChange(e, setFormData)}
                    value={formData.grade}/>
                    </FormGroup>
                    <FormGroup>
                    <Label for="densityInput">
                        Density
                    </Label>
                    <Input
                    id="densityInput"
                    name="density"
                    type="number"
                    placeholder="density"
                    onChange={(e) => handleInputChange(e, setFormData)}
                    value={formData.density}/>
                </FormGroup>
            <Button color="secondary">Submit</Button>
            </Form>
        </div>
    )
}

export default AddGrade;