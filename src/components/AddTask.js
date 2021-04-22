import React, { useState } from 'react'
// import Task from './Task';

const AddTask = ({ addTask }) => {

    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState(false);

    function createTask(e) {
        e.preventDefault();
        if (!text) {
            alert('Please add a task.');
            return;
        }
        addTask({ text, day, reminder });
        setText('');
        setDay('');
        setReminder(false);
    }


    return (
        <form className="add-form" onSubmit={createTask} >
            <div className='form-control'>
                <label htmlFor="task">Task</label>
                <input type="text" id="task" placeholder='Add Task' value={text} onChange={(e) => { setText(e.target.value) }} />
            </div>
            <div className='form-control'>
                <label htmlFor="day">Day & Time</label>
                <input type="text" id="day" placeholder='Add Day & Time' value={day} onChange={(e) => { setDay(e.target.value) }} />
            </div>
            <div className='form-control form-control-check'>
                <label htmlFor="checkbox">Set Reminder</label>
                <input
                    type="checkbox"
                    checked={reminder}
                    id="checkbox"
                    value={reminder}
                    onChange={e => { setReminder(e.currentTarget.checked) }}
                />
            </div>
            <input type="submit" value="Save Task" className="btn btn-block" />
        </form>
    )
}

export default AddTask
