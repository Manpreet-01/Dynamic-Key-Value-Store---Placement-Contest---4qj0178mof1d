import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const KeyValueStore = () => {
  const location = useLocation();
  const history = useHistory();

  const [keyValues, setKeyValues] = useState({});
  const [currentKey, setCurrentKey] = useState('');
  const [currentValue, setCurrentValue] = useState('');

  const updateKeyValue = (key, value) => {
    setKeyValues({ ...keyValues, [key]: value });
  };

  const handleUpdateClick = () => {
    const keyValueString = `${currentKey}=${currentValue}`;
    history.push(`/key-value/${keyValueString}`);
    setCurrentKey('');
    setCurrentValue('');
  };

  const handleDeleteClick = (key) => {
    const { [key]: deletedValue, ...remainingKeyValues } = keyValues;
    setKeyValues(remainingKeyValues);
    const keyValueString = Object.entries(remainingKeyValues)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    history.push(`/key-value/${keyValueString}`);
  };

  useEffect(() => {
    const keyValuePairs = location.pathname.replace('/key-value/', '').split('&');
    const parsedKeyValues = {};
    keyValuePairs.forEach((pair) => {
      const [key, value] = pair.split('=');
      parsedKeyValues[key] = value;
    });
    setKeyValues(parsedKeyValues);
  }, [location.pathname]);

  return (
    <div>
      <h1>Key Value Store</h1>
      <div>
        {Object.entries(keyValues).map(([key, value]) => (
          <div key={key} className="key-value-div">
            <span className="key-field">{key}:</span>
            <input
              className="value-field"
              type="text"
              value={value}
              onChange={(e) => updateKeyValue(key, e.target.value)}
            />
            <button
              className="delete-btn"
              onClick={() => handleDeleteClick(key)}
            >
              Delete
            </button>
          </div>
        ))}
        <div>
          <span className="key-field">key:</span>
          <input
            className="value-field"
            type="text"
            value={currentKey}
            onChange={(e) => setCurrentKey(e.target.value)}
          />
          <span className="key-field">value:</span>
          <input
            className="value-field"
            type="text"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
          />
          <button className="update-btn" onClick={handleUpdateClick}>
            Update Values
          </button>
        </div>
      </div>
      {Object.keys(keyValues).length === 0 && (
        <p>No key values found in URL.</p>
      )}
    </div>
  );
};

export default KeyValueStore;
