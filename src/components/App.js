import React, { useEffect } from "react";

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
          <Route path="/key-value/:keyValue" element={<KeyValueStore />} />
          <Route exact path="/" element={<KeyValueStore />} />
        </Routes>
        
      </BrowserRouter>
      
    </div>
  );
}

function KeyValueStore(){
  let [searchParams, setSearchParams] = useSearchParams();
  
  const params = [...searchParams.entries()];
  
  function handleChange(key, value){
    const params = [...searchParams.entries()];
    const newParams = params.map(pair => {
      const k = pair[0];
      // const val = pair[1]; // not needed
      
      if(k === key){
        return [k, value];
      }
      
      return pair;
    });
    
    setSearchParams(newParams);
  }
  
  function handleKeyDelete(e, key) {
    e.preventDefault();
   
    const params = [...searchParams.entries()];
   
    const updatedParams = params.filter(pair => pair[0] !== key);
   
    setSearchParams(updatedParams);
  }
  
  return (
    <>
      <h1>Key Value Store</h1>
      <div>
        {
          params.length!==0 && params.map(([key, value]) => 
            <div key={key} className='key-value-div'>
              
              <span className='key-field'>{key}: </span>
              
              <input
                className='value-field' type="text"
                value={value} onChange={e => handleChange(key, e.target.value)}
              />
              
              <button
                className='delete-btn'
                onClick={(e) => handleKeyDelete(e, key)}
              >delete</button>
              
            </div>
          )
        }
        
        {/* Do not include Update button, while mapping the key-value */}
        { params.length>0 && <button className='update-btn'>Update Values</button> }
      
        { params.length==0 && <p>No key values found in URL.</p>}
      
      </div>
    </>
  );
}