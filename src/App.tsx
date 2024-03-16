import './App.css';
import { useDiagrams, useForm } from './hooks';

function App() {
  const { diagrams, saveDiagram, loadDiagram, deleteDiagram } = useDiagrams();
  const { name, setName, setShow, show } = useForm();
  console.log('diagrams:', diagrams);

  console.log('popup render');

  return (
    <div style={{ minWidth: 500 }}>
      <h3>Excalidraw history</h3>
      <div
        className="d-flex flex-column"
        style={{ maxHeight: 300, overflowY: 'auto' }}
      >
        {(diagrams as any[]).map((item, index) => (
          <div className="d-flex justify-content-between">
            <button className="btn" onClick={() => loadDiagram(index)}>
              {item.name}
            </button>
            <button onClick={() => deleteDiagram(index)} className="btn">
              del
            </button>
          </div>
        ))}
      </div>

      {!show && (
        <button className="btn btn-primary" onClick={() => setShow(true)}>
          ADD
        </button>
      )}
      {show && (
        <div className="d-flex mt-4">
          <button
            className="btn btn-warning me-2"
            onClick={() => setShow(false)}
          >
            {'<<'}
          </button>
          <input
            type="text"
            className="w-100 me-2"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Diagram name..."
          />
          <button
            className="btn btn-primary"
            onClick={() => saveDiagram(name).finally(() => setShow(false))}
          >
            SAVE
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
