// App.jsx
import React, { useState } from 'react';
import './styles.scss';
import IssueForm from './IssueForm';
import { IssuePreview, parseToMarkdown } from './IssuePreview';

function App() {
  const [submittedIssue, setSubmittedIssue] = useState({
    tag: 'Feature',
    title: 'Nueva implementación',
    description: 'Esta es una nueva implementación que se debe realizar en el sistema.',
    tasks: [
      { label: 'Tarea 1', description: 'Descripción de la tarea 1', completed: false },
      { label: 'Tarea 2', description: 'Descripción de la tarea 2', completed: false },
      { label: 'Tarea 3', description: 'Descripción de la tarea 3', completed: false }
    ],
    observations: 'Esta es una observación importante.',
    dueDate: '2021-12-31'
  });

  const handleUpdateIssue = (updatedIssue) => {
    setSubmittedIssue(updatedIssue);
  };

  const formatDueDate = (date) => new Date(date).toISOString().split('T')[0];

  const handleClear = () => {
    setSubmittedIssue({
      tag: 'Feature',
      title: '',
      description: '',
      tasks: [],
      observations: '',
      dueDate: formatDueDate(new Date())
    });
  };

  return (
    <main>
      <div className="main-title">
        <h1>Issue to Markdown Generator</h1>
        <div className="buttons">
          <button onClick={handleClear}>Limpiar</button>
        </div>
      </div>
      <div className="app-container">
        <div className="half-screen">
          <IssueForm submittedIssue={submittedIssue} onUpdate={handleUpdateIssue} />
        </div>
        <div className="half-screen">
          {submittedIssue && (
            <IssuePreview submittedIssue={submittedIssue} />
          )}
        </div>
      </div>
    </main>
  );
}

export default App;