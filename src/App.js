import { useRef, useState } from "react";
import uuid from "react-uuid";
import axios from "axios";

import { Navbar } from "./myComponent/Navbar";

import "./App.css";

function short(str = "") {
  if (str.length > 12) {
    str = str.slice(0, 12) + "...";
  }
  return str;
}

function App() {
  const handelDelete = (e) => {
    setData(data.filter((itm) => e.target.value !== itm.id));
  };
  const handelClick = () => {
    axios
      .post("http://localhost:5000/shuffelData", data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err.data));
  };
  const [data, setData] = useState([]);
  const name = useRef("");
  const email = useRef("");
  const handelSubmit = (e) => {
    e.preventDefault();
    setData((prev) => [
      ...prev,
      { id: uuid(), name: name?.current?.value, email: email?.current?.value },
    ]);
  };

  return (
    <>
      <div className="App">
        <div className="player_list">
          <h2>Participants</h2>
          <ul className="participants_list">
            {data.map((itm, index) => {
              return (
                <li key={index}>
                  <button
                    className="delete_p"
                    value={itm.id}
                    onClick={handelDelete}
                  >
                    x
                  </button>
                  {short(itm.name).toUpperCase()}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="input_container">
          <form onSubmit={handelSubmit}>
            <div>
              <div>
                <label>Name</label>
              </div>
              <input
                type="text"
                placeholder="Enter your name"
                ref={name}
                required
              />
            </div>
            <div>
              <div>
                <label>Email</label>
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                ref={email}
                required
              />
            </div>
            <div>
              <button type="submit">Submit</button>
              <button type="reset">Reset</button>
            </div>
          </form>
        </div>
      </div>
      <Navbar handelClick={handelClick} />
    </>
  );
}

export default App;
