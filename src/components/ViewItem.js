import ViewStyle from "./ViewItem.module.css"
import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom';

import ArrayContext from "../ArrayContext";

function View() {

  const { listArray } = useContext(ArrayContext);

  const [list, setList] = useState("");

  const [submittedValues, setSubmittedValues] = useState([]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log("Input Text:", list);
    // Add the value of "e" to the list of submitted values
    setSubmittedValues([...submittedValues, list]);
  };

  return (
    <>
      <div>
        We are on the view page
      </div>
      <div className={ViewStyle.centerViewItem}>
        <div className={ViewStyle.center1ViewItem}>
          <ul>
        {listArray.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
        </div>
      </div>

      
      {/* <div className={ViewStyle.centerViewItem}>
        <div className={ViewStyle.center1ViewItem}>
          <form onSubmit={handleFormSubmit}>
            
            <label>
              Text:
              <input
                type="text"
                value={list}
                onChange={(e) => setList(e.target.value)}
              />
            </label>
            <br />

            <input type="submit" value="Click me" />
          </form>
        </div>
      </div> */}

      {/* <div className={ViewStyle.centerViewItem}>
        {submittedValues.map((value, index) => (
          <div className={ViewStyle.center1ViewItem}>
            <li key={index}>{value}</li>
          </div>
        ))}
      </div> */}


      <Link to="/">
        <button>Go to Create Page</button>
      </Link>


    </>
  );
}

export default View;
