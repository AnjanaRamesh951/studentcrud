import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [std, setStd] = useState(0);
  const [book, setBook] = useState("");
  

  const [newStd, setNewStd] = useState(0);

  const [studentList, setStudentList] = useState([]);

  const addStudent = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      std: std,
    book: book,
      
    }).then(() => {
      setStudentList([
        ...studentList,
        {
          name: name,
          std: std,
          book: book,
         
        },
      ]);
    });
  };

  const getStudents = () => {
    Axios.get("http://localhost:3001/students").then((response) => {
      setStudentList(response.data);
    });
  };

  const updateStudentStd = (id) => {
    Axios.put("http://localhost:3001/update", { std: newStd, id: id }).then(
      (response) => {
        setStudentList(
          studentList.map((val) => {
            return val.id === id
              ? {
                  id: val.id,
                  name: val.name,
                  std: val.std,
                  book: val.book,
                  
                }
              : val;
          })
        );
      }
    );
  };

  const deleteStudent = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setStudentList(
        studentList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="information">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Class:</label>
        <input
          type="number"
          onChange={(event) => {
            setStd(event.target.value);
          }}
        />
        <label>Book Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setBook(event.target.value);
          }}
        />
       
        <button onClick={addStudent}>Add Student</button>
      </div>
      <div className="students">
        <button onClick={getStudents}>Show Students</button>

        {studentList.map((val, key) => {
          return (
            <div className="student">
              <div>
                <h3>Name: {val.name}</h3>
                <h3>Std: {val.std}</h3>
                <h3>Book: {val.book}</h3>
              
              </div>
              <div>
                <input
                  type="text"
                  placeholder=""
                  onChange={(event) => {
                    setNewStd(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateStudentStd(val.id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteStudent(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;