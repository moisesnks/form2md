// IssuePreview.jsx
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import './styles.scss';


export const parseToMarkdown = (submittedIssue) => {
    const { tag, title, description, tasks, observations, dueDate } = submittedIssue;

    // Capitalizar tag
    const capitalizeTag = tag.charAt(0).toUpperCase() + tag.slice(1);

    // Parsear la descripción a Markdown
    const markdownDescription = `## Descripción\n${description}`;

    // Parsear las tareas a Markdown
    const markdownTasks = tasks.map(task => `* [ ] ${task.label}: ${task.description}`).join('\n');

    // Parsear las observaciones a Markdown
    const markdownObservations = `> ${observations}`;

    // Duedate es un string en formato yyyy-mm-dd, debemos invertirlo para que quede dd-mm-yyyy
    const dueDateParts = dueDate.split('-');
    const dueDateFormatted = dueDateParts.reverse().join('-');
    const markdownDueDate = `## Fecha de Vencimiento\nSe ha definido la fecha de entrega para el día ${dueDateFormatted}`;

    // Unir todas las partes en un solo string de Markdown
    const markdownContent = `${markdownDescription}\n\n## Tareas\n${markdownTasks}\n\n${markdownObservations}\n\n${markdownDueDate}`;

    return markdownContent;
};

const Modal = ({ message, onClose }) => {
    setTimeout(() => {
        onClose();
    }, 3000);

    return (
        <div className="modal">
            <div className="modal-content">
                <p>{message}</p>
            </div>
        </div>
    );
};


export const IssuePreview = ({ submittedIssue }) => {
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');

    const title = `(${submittedIssue.tag}) ${submittedIssue.title}`

    const closeModal = () => {
        setShowModal(false);
    };

    const handleCopyTitle = () => {
        navigator.clipboard.writeText(`(${submittedIssue.tag}) ${submittedIssue.title}`)
            .then(() => {
                setShowModal(true);
                setMessage('Título copiado al portapapeles');
            })
            .catch(error => console.error('Error al copiar al portapapeles: ', error));
    };

    const handleCopyMarkdown = () => {
        navigator.clipboard.writeText(parseToMarkdown(submittedIssue))
            .then(() => {
                setShowModal(true);
                setMessage('Markdown copiado al portapapeles');
            })
            .catch(error => console.error('Error al copiar al portapapeles: ', error));
    };

    return (

        <div className='md-container'>
            <div className="md-title">
                <h1> {title} </h1>
                <button onClick={handleCopyTitle}>Copiar Título</button>
            </div>
            <ReactMarkdown className="issue-preview" remarkPlugins={[gfm]}>
                {parseToMarkdown(submittedIssue)}
            </ReactMarkdown>
            <button onClick={handleCopyMarkdown}>Copiar Markdown</button>
            {showModal && <Modal message={message} onClose={closeModal} />}
        </div>
    );
};