import React, {useState, useEffect} from "react";
import "./Grades.css"
import StorageAPI from "../helpers/StorageApi";
import AddGrade from "./AddGrade";
import {Table, Button, Spinner} from "reactstrap"

const Grades = () => {
  console.log("component mounted");
  const [grades, setGrades] = useState(null)
  const [showForm, setShowForm] = useState(false)
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await StorageAPI.getGrades(); 
        console.log(response);
        setGrades(response)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const renderTable = () => {
    if (!grades) {
      return <Spinner> Loading... </Spinner>; 
    }

    

    return (
      <Table bordered dark striped size="sm">
        <thead>
          <tr>
            <th>Grade</th>
            <th>Density</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade) => (
            <tr key={grade.id}>
              <td>{grade.grade}</td>
              <td>{grade.density}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <div>
      <div className="title_box">
        <div className="title">
          <h1>Norumbega Oyster</h1>
        </div>
      </div>
      {showForm ? (
        <AddGrade onCancel={toggleForm} />
      ) : (
        <div className="container">{renderTable()}</div>
      )}
      <Button color="secondary" onClick={toggleForm}>
        {showForm ? "Cancel" : "Add Grade"}
      </Button>
    </div>
  );
}

export default Grades;