import React, { Fragment } from "react";
import styled from "styled-components";
  function  colorBackground() {
   const r = Math.floor(Math.random()*256)
   const b = Math.floor(Math.random()*256)
   const g = Math.floor(Math.random()*256)
   return `rgb(${r},${g},${b})`
  }
const Form = styled.form`
 display:flex;
 flex-direction:column;
 background-color: ${colorBackground()};
 width:300px;
 height:400px;
 margin:auto;
 margin-bottom:30px;
 border-radius:30px;
 border:0.5cm solid ${colorBackground()};
`
const BtnDelete = styled.button`
width:100px;
height:30px;
background-color: ${colorBackground()};
border-radius:20px;
border:none;
`

const InsideContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    margin-top:50px;
    gap:30px;
`
const BtnForm = styled.button`
width:100px;
height:30px;
border-radius:20px;
background-color: ${colorBackground()};
border:2px solid ${colorBackground()};
`
const InputForm = styled.input`
 width:200px;
 height:40px;
 border-radius:20px;
 border:none;
`
const Text = styled.h2`
font-size:24px;
font-family:"Montserrat";
text-align:center;
`
const List = styled.ul`
 background-color: ${colorBackground()};
 width:200px;
 height:100%;
 display:flex;
 flex-direction:column;
 padding:30px;
 border-radius:20px;
 border:0.5cm solid ${colorBackground()};
 margin:auto;

`
const ListItem = styled.li`
list-style:none;

`
class TaskList extends React.Component {
    state = {
        tasks: JSON.parse(localStorage.getItem("Task")) || [],
        currentTask: ""
    }
    handleTask = ({ target: { value } }) => {
        this.setState({
            currentTask: value
        })
    }
    handleAddTask = () => {
        const { tasks, currentTask } = this.state
        if (!currentTask.trim()) return;
        const updateTask = [...tasks, currentTask]
        this.setState({
            tasks: updateTask,
            currentTask: ""
        })
        localStorage.setItem("Task", JSON.stringify(updateTask))
    }
    handleDeleteTask = (taskDeleted) => {
        const { tasks } = this.state
        const updateTask = tasks.filter(task => task !== taskDeleted)
        this.setState({
            tasks: updateTask
        })
        localStorage.setItem("Task", JSON.stringify(updateTask))
    }

    render() {
        const { currentTask, tasks } = this.state
        return (
            <Fragment>
                <Form>
                <Text>Додай свої завдання</Text>
                    <label>
                    <InsideContainer>
                        <InputForm type="text" value={currentTask} onChange={this.handleTask} />
                        <BtnForm type="button" onClick={this.handleAddTask}>Add</BtnForm>
                        </InsideContainer>
                    </label>
                </Form>
                <List>
                <Text>Твої завдання</Text>
                    {tasks.length > 0 ? (
                        tasks.map((task, index) => (
                            <ListItem key={index}>
                                <p>{task}{""}</p>
                                <BtnDelete onClick={() => this.handleDeleteTask(task)}>Delete</BtnDelete>
                            </ListItem>
                        ))

                    ) : (
                        <p>Немає завданнь</p>
                    )
                    }
               </List>
            </Fragment>
        )
    }
}
export default TaskList;