import React, { useState, useEffect } from 'react';
import './styles.scss';

function IssueForm({ submittedIssue, onUpdate }) {
    const [issue, setIssue] = useState(submittedIssue);

    useEffect(() => {
        setIssue(submittedIssue);
    }, [submittedIssue]);

    const handleChange = (key, value) => {
        setIssue({
            ...issue,
            [key]: value
        });
        onUpdate({ ...issue, [key]: value }); // Actualiza el estado en App.jsx
    };

    const handleAddTask = () => {
        const newTask = { label: 'Tarea nueva', description: 'Descripción nueva' };
        setIssue({
            ...issue,
            tasks: [...issue.tasks, newTask]
        });
        onUpdate({ ...issue, tasks: [...issue.tasks, newTask] }); // Actualiza el estado en App.jsx
    };

    const handleDeleteTask = (index) => {
        const updatedTasks = issue.tasks.filter((task, i) => i !== index);
        setIssue({
            ...issue,
            tasks: updatedTasks
        });
        onUpdate({ ...issue, tasks: updatedTasks }); // Actualiza el estado en App.jsx
    };

    const handleTaskChange = (index, key, value) => {
        const updatedTasks = [...issue.tasks];
        updatedTasks[index][key] = value;
        setIssue({
            ...issue,
            tasks: updatedTasks
        });
        onUpdate({ ...issue, tasks: updatedTasks }); // Actualiza el estado en App.jsx
    };

    return (
        <div>
            <div className="issue-container">
                <label htmlFor="tag">Etiqueta:</label>
                <select id="tag" value={issue.tag} onChange={(e) => handleChange('tag', e.target.value)}>
                    <option value="feature">Feature</option>
                    <option value="spike">Spike</option>
                    <option value="bug">Bug</option>
                </select>

                <label htmlFor="title">Título:</label>
                <input type="text" id="title" value={issue.title} onChange={(e) => handleChange('title', e.target.value)} />

                <label htmlFor="description">Descripción:</label>
                <textarea id="description" rows="6" value={issue.description} onChange={(e) => handleChange('description', e.target.value)}></textarea>

                <label htmlFor="observations">Observaciones:</label>
                <textarea id="observations" rows="3" value={issue.observations} onChange={(e) => handleChange('observations', e.target.value)}></textarea>

                <label htmlFor="dueDate">Fecha de Vencimiento:</label>
                <input type="date" id="dueDate" value={issue.dueDate} onChange={(e) => handleChange('dueDate', e.target.value)} />


                <div className="tasks-container">
                    <span>
                        <h3>Tareas:</h3>
                        <button type="button" onClick={handleAddTask}>Agregar Tarea</button>
                    </span>
                    <div className="tasks">
                        {issue.tasks.map((task, index) => (
                            <div className="task" key={index}>
                                <input type="text" value={task.label} onChange={(e) => handleTaskChange(index, 'label', e.target.value)} />
                                <textarea value={task.description} onChange={(e) => handleTaskChange(index, 'description', e.target.value)}></textarea>
                                <button className="delete-task" type="button" onClick={() => handleDeleteTask(index)}>X</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IssueForm;
