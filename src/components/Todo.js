import { React, useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Form, Button, ListGroup, CloseButton, Toast, ToastContainer } from "react-bootstrap";
const Todo = () => {
  const [task, setTask] = useState('')
  const taskInput = useRef(null)
  const [todolist, setList] = useState([])
  const [status, setStatus] = useState(true);
  const [show, setShow] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [variant, setVariant] = useState('');
  const [inputErr, SetinputErr] = useState(false);

  const handleInput = (e) => {
    setTask(e.target.value);
  }
  const handleSubmit = () => {

    if (task === null || task === '') {
      SetinputErr(true)
      return false;

    } else {
      var data = localStorage.getItem('data');
      if (data) {
        var length = JSON.parse(data).length;
        data = JSON.parse(data);
        const todo_task = {
          id: length + 1,
          value: task,
          done: false
        }
        data.push(todo_task)
        localStorage.setItem('data', JSON.stringify(data));
      } else {
        const data = [];
        const todo_task = {
          id: 1,
          value: task,
          done: false
        }
        data.push(todo_task);
        localStorage.setItem('data', JSON.stringify(data));
      }
      SetinputErr(false);
      setTask('');
      taskInput.current.value = ''
      setStatus(!status)
      setVariant('info')
      setAlertMsg('New task added Successfully!')
      setShow(true)
    }
  }
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem('data'));
    setList(data);
    navigator.vibrate(200);
  }, [status])

  const handleDeleteTask = (id) => {
    let data = JSON.parse(localStorage.getItem('data'));
    let deletedTask = data.filter((item) => item.id === id)
    data = data.filter((item) => item.id !== id);
    localStorage.setItem('data', JSON.stringify(data));
    setStatus(!status)
    setVariant('danger')
    setAlertMsg("You have deleted a Task.\n" + deletedTask[0].value)
    setShow(true)
  }
  const handleChangeStatus = (id) => {
    let data = JSON.parse(localStorage.getItem('data'));
    let a = data.filter((item) => item.id === id);
    data.map((element) => {
      if (element.id === id) {
        element.done = !a[0].done;
      }
      return true;
    })
    !a[0].done ? setAlertMsg('You have marked a Task as pending!') : setAlertMsg('You have marked a Task Completed!')
    localStorage.setItem('data', JSON.stringify(data));
    setStatus(!status)
    setVariant('success')
    setShow(true)
  }
  const handleEditTask = (id) => {
    let data = JSON.parse(localStorage.getItem('data'));
    let a = data.filter((item) => item.id === id);
    console.log('data', data)
    /* let a = data.filter((item) => item.id === id);
    
    data.map((element) => {
      if (element.id === id) {
        element.done = !a[0].done;
      }
      return true;
    })
    localStorage.setItem('data', JSON.stringify(data));
    setStatus(!status)
    setVariant('success')
    setAlertMsg('You have marked Task Completed.')
    setShow(true) */
  }

  return (<>
    <div className="main-section">
      <Card>
        <Card.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Text>Add Todo's</Form.Text>

            <Form.Control ref={taskInput} type="text" placeholder="Add task" onChange={handleInput} />
            {inputErr ? <p className='inputErr'>
              Please enter a task to add.
            </p> : ''}
          </Form.Group>
          <Button variant="primary" onClick={handleSubmit} type="submit">
            Add
          </Button>
        </Card.Body>
      </Card>
      {todolist && todolist ?
        <ListGroup variant="flush">
          {todolist.map(function (task) {
            return (
              <ListGroup.Item className='task-list-item' data-id={task.id}>
                <input type="checkbox" checked={task.done} onChange={() => handleChangeStatus(task.id)} />
                <p><span className={task.done ? 'done' : ''}> {task.value}</span> </p>
                {/* <img src={`${process.env.PUBLIC_URL}` + "pen.png"} className="edit-image" alt='edit-icon' onClick={() => handleEditTask(task.id)} /> */}
                <CloseButton onClick={() => handleDeleteTask(task.id)} className="delete-btn" />
              </ListGroup.Item>
            )
          })}
        </ListGroup> : ''}

      {show ? <ToastContainer position='top-end'>
        <Toast onClose={() => setShow(false)} show={show} bg={variant} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Todo list</strong>
            <small>a mins ago</small>
          </Toast.Header>
          <Toast.Body> {alertMsg}</Toast.Body>
        </Toast>
      </ToastContainer> : ''}
    </div>
  </>)
}
export default Todo;