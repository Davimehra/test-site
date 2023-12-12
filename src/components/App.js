import axios from "axios";
import { useRef } from "react";
export function App() {
  const inputRef = useRef(null);
  const ShowTextRef = useRef(null);
  async function onClick() {
    console.log("working Button");
    try {
      await axios("http://kops.basic-dev-ops-site-trial.co/user", {
        method: "post",
        data: { message: inputRef.current.value },
        contentType: "application/json",
      }).then((res) => {
        ShowTextRef.current.innerText = res?.data?.message;
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <input ref={inputRef} name="name" type="text" placeholder="Name"></input>
      <button onClick={onClick}>Submit</button>
      <div ref={ShowTextRef}></div>
    </>
  );
}
