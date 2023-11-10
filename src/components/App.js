import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  useSearchParams,
  Routes,
  Route,
  Link,
} from "react-router-dom";

export default App;

function App() {
  return (
    <div>
      <BrowserRouter>
        <nav>
          <Link to="/">Reset</Link>
        </nav>
        
        <Routes>
          <Route exact path="/" element={<KeyValueStore />} />
          <Route path="/key-value/:keyValue" element={<KeyValueStore />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function KeyValueStore() {
  let [searchParams, setSearchParams] = useSearchParams();

  const params = [...searchParams.entries()];

  // Local state to manage input values
  const [inputValues, setInputValues] = useState(
    Object.fromEntries(searchParams) || {}
  );

  function handleChange(key, value) {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [key]: value,
    }));
  }

  function handleKeyDelete(e, key) {
    e.preventDefault();

    const params = [...searchParams.entries()];

    const updatedParams = params.filter((pair) => pair[0] !== key);

    setSearchParams(updatedParams);
    
      // Update local state by excluding the deleted key
    setInputValues((prevInputValues) => {
      const { [key]: deletedKey, ...rest } = prevInputValues;
      return rest;
    });
  }

  function updateUrl() {
    setSearchParams(Object.entries(inputValues));
  }

  return (
    <>
      <h1>Key Value Store</h1>
      <div>
        {params.length !== 0 &&
          params.map(([key, value]) => (
            <div key={key} className="key-value-div">
              <span className="key-field">{key}: </span>
              <input
                className="value-field"
                type="text"
                value={inputValues[key] || ""}
                onChange={(e) => handleChange(key, e.target.value)}
              />
              <button
                className="delete-btn"
                onClick={(e) => handleKeyDelete(e, key)}
              >
                delete
              </button>
            </div>
          ))}
        {/* Conditionally render the Update button */}
        {params.length > 0 && (
          <button className="update-btn" onClick={updateUrl}>
            Update Values
          </button>
        )}
        {params.length === 0 && <p>No key values found in URL.</p>}
      </div>
    </>
  );
}
