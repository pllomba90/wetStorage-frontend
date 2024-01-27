import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { handleInputChange } from "../helpers/formHelper";
import StorageAPI from "../helpers/StorageApi";

const InsertForm = ({closeInsertForm, binName}) => {
  console.log("bin name :", binName);
  const [formData, setFormData] = useState({
    grade: "",
    density: "",
    crates: "",
    quantity: "", 
  });
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    async function fetchGrades() {
      try {
        const response = await StorageAPI.getGrades();
        console.log(response);
        setGrades(response);
      } catch (error) {
        console.error("Error fetching grades:", error);
      }
    }

    fetchGrades();
  }, []);

  
  const handleGradeChange = (selectedGrade) => {
    const selectedGradeInfo = grades.find((grade) => grade.grade === selectedGrade);
    if (selectedGradeInfo) {
      setFormData({
        ...formData,
        grade: selectedGrade,
        density: selectedGradeInfo.density,
        quantity: formData.crates * selectedGradeInfo.density, 
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let bin_name = binName;
    try {
      const response = await StorageAPI.updateBin(bin_name, formData);
      console.log("bin updated:", response);
      window.location.reload();
    } catch (error) {
      console.error("Error updating bin:", error);
    }
  };
 

  return (
    <div className="container form">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="gradeInput">Grade</Label>
          <Input
            id="gradeInput"
            name="grade"
            type="select"
            onChange={(e) => {
              handleGradeChange(e.target.value);
              handleInputChange(e, setFormData); 
            }}
            value={formData.grade}
          >
            <option value="">Select Grade</option>
            {grades.map((grade) => (
              <option key={grade.id} value={grade.grade}>
                {grade.grade}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="densityInput">Density</Label>
          <Input
            id="densityInput"
            name="density"
            type="number"
            placeholder="Density"
            onChange={(e) => handleInputChange(e, setFormData)}
            value={formData.density}
          />
        </FormGroup>
        <FormGroup>
          <Label for="cratesInput">Crates</Label>
          <Input
            id="cratesInput"
            name="crates"
            type="number"
            placeholder="Crates"
            onChange={(e) => {
              handleInputChange(e, setFormData);
              const selectedGradeInfo = grades.find(
                (grade) => grade.grade === formData.grade
              );
              if (selectedGradeInfo) {
                setFormData({
                  ...formData,
                  crates: e.target.value,
                  quantity: e.target.value * selectedGradeInfo.density,
                });
              }
            }}
            value={formData.crates}
          />
        </FormGroup>
        <FormGroup>
          <Label for="quantityInput">Quantity</Label>
          <Input
            id="quantityInput"
            name="quantity"
            type="number"
            placeholder="Quantity"
            onChange={(e) => handleInputChange(e, setFormData)}
            value={formData.quantity}
          />
        </FormGroup>
        <Button color="secondary">Submit</Button>
        <Button color="danger" onClick={closeInsertForm}>Cancel</Button>
      </Form>
    </div>
  );
};

export default InsertForm;

  