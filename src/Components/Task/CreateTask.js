import Form from "react-bootstrap/Form";
import "./CreateTask.css";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";

const CreateTask = ({ createMode }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskBody, setTaskBody] = useState("");
  const [taskStatus, setTaskStatus] = useState("Todo");
  const navigate = useNavigate();
  const params = useParams();

  const getCurrentTasks = async () => {
    const request = await fetch(`http://localhost:8000/tasks/${params.id}`);
    const requestToJson = await request.json();
    setTaskTitle(requestToJson.title);
    setTaskBody(requestToJson.content);
    setTaskStatus(requestToJson.status);
  };

  useEffect(() => {
    if (params.id) {
      getCurrentTasks();
    }
    return () => {};
  }, []);

  useEffect(() => {
    return () => {
      setTaskTitle("");
      setTaskBody("");
      setTaskStatus("");
    };
  }, [createMode]);

  const createTask = async () => {
    const TaskModel = {
      id: uuidv4(),
      title: taskTitle,
      content: taskBody,
      status: taskStatus,
    };

    try {
      await fetch("http://localhost:8000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(TaskModel),
      });
      navigate("/");
    } catch (error) {
      throw new Error(error.message);
    }
    setTaskTitle("");
    setTaskBody("");
    setTaskStatus("Todo");
  };
  const updateTask = async () => {
    const TaskModel = {
      title: taskTitle,
      content: taskBody,
      status: taskStatus,
    };
    try {
      await fetch(`http://localhost:8000/tasks/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(TaskModel),
      });
      navigate("/");
    } catch (error) {
      throw new Error(error.message);
    }
  };
  return (
    <>
      <div class="container mt-3">
        <div className="row ">
          <div className="col-6 offset-3 ">
            <h2>{params.id ? "Edit Task" : "Create Task"}</h2>
            <label for="comment">title:</label>
            <form action="">
              <div class="mb-3 mt-3">
                <Form.Control
                  value={taskTitle}
                  onChange={(event) => setTaskTitle(event.target.value)}
                  type="text"
                  placeholder=" title"
                />
              </div>
              <label for="comment">Body:</label>
              <div class="mb-3 mt-3">
                <textarea
                  value={taskBody}
                  onChange={(event) => setTaskBody(event.target.value)}
                  className="form-control"
                  rows="5"
                  id="comment"
                  name="text"
                  placeholder=" Body"
                ></textarea>
              </div>
              <div class="mb-3 mt-3">
                <Form.Select
                  value={taskStatus}
                  onChange={(event) => setTaskStatus(event.target.value)}
                  aria-label="Default select example"
                >
                  <option selected>---</option>
                  <option>inQA</option>
                  <option>Done</option>
                  <option>ToDo</option>
                </Form.Select>
              </div>
              <button
                type="button"
                onClick={params.id ? updateTask : createTask}
                class="btn btn-primary"
              >
                {params.id ? "Edit" : "Create"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTask;
