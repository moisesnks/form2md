// IssuePreview.jsx
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import './styles.scss';

export const parseToMarkdown = (submittedIssue) => {
    const { tag, title, description, tasks, observations, dueDate } = submittedIssue;

    // Parsear el título a Markdown
    // Capitalizar tag
    const capitalizeTag = tag.charAt(0).toUpperCase() + tag.slice(1);
    const markdownTitle = `# (${capitalizeTag}) ${title}`;

    // Parsear la descripción a Markdown
    const markdownDescription = `## Descripción\n${description}`;

    // Parsear las tareas a Markdown
    const markdownTasks = tasks.map(task => `* [ ] ${task.label}: ${task.description}`).join('\n');

    // Parsear las observaciones a Markdown
    const markdownObservations = `> ${observations}`;

    // Parsear la fecha de vencimiento a Markdown
    const markdownDueDate = `## Fecha de Vencimiento\n Se ha definido la fecha de entrega para el día ${dueDate}`;

    // Unir todas las partes en un solo string de Markdown
    const markdownContent = `${markdownTitle}\n\n${markdownDescription}\n\n## Tareas\n${markdownTasks}\n\n${markdownObservations}\n\n${markdownDueDate}`;

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

    const handleCopyMarkdown = () => {
        navigator.clipboard.writeText(parseToMarkdown(submittedIssue))
            .then(() => {
                setShowModal(true);
            })
            .catch(error => console.error('Error al copiar al portapapeles: ', error));
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className='md-container'>
            <ReactMarkdown className="issue-preview" remarkPlugins={[gfm]}>
                {parseToMarkdown(submittedIssue)}
            </ReactMarkdown>
            <button onClick={handleCopyMarkdown}>Copiar Markdown</button>
            {showModal && <Modal message="Markdown copiado al portapapeles" onClose={closeModal} />}
        </div>
    );
};