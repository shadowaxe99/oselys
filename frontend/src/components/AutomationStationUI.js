import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createAutomationTask, listAutomationScripts } from '../redux/automationReducer';
import { automationPanel } from '../graphql/mutations';
import { GET_AUTOMATION_SCRIPTS } from '../graphql/queries';

const AutomationStationUI = () => {
  const dispatch = useDispatch();
  const [newScript, setNewScript] = useState('');
  const automationScripts = useSelector((state) => state.automation.automationScripts);

  useEffect(() => {
    dispatch(listAutomationScripts());
  }, [dispatch]);

  const handleCreateScript = async () => {
    if (newScript.trim() !== '') {
      dispatch(createAutomationTask(newScript));
      setNewScript('');
    }
  };

  return (
    <div id="automationPanel" className="automation-station-ui">
      <h2>Automation Station</h2>
      <div className="create-script">
        <textarea
          value={newScript}
          onChange={(e) => setNewScript(e.target.value)}
          placeholder="Write your automation script here..."
        />
        <button onClick={handleCreateScript}>Create Script</button>
      </div>
      <div className="script-list">
        <h3>Your Scripts</h3>
        {automationScripts.length > 0 ? (
          <ul>
            {automationScripts.map((script, index) => (
              <li key={index}>{script}</li>
            ))}
          </ul>
        ) : (
          <p>No scripts created yet.</p>
        )}
      </div>
    </div>
  );
};

export default AutomationStationUI;