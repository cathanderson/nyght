import { useEffect, useState } from "react";
import jwtFetch from "../../store/jwt";

function EmailFormPage() {
  const [mailerState, setMailerState] = useState("");
  const [list, setList] = useState([]);

  function handleStateChange(e) {
    setMailerState(e.target.value);
  }

  const addEmail = (e) => {
    e.preventDefault();
    setList([...list, mailerState]);
    setMailerState("");
  };

  let emailList = list.map((email) => {
    return <li style={{ color: "white" }}>{email}</li>;
  });

  useEffect(() => {}, [list]);

  const submitEmail = async (e) => {
    e.preventDefault();
    const response = await jwtFetch("/api/itineraries/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ list: list }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        const resData = await res;
        if (resData.status === "success") {
          alert("Message Sent");
        } else if (resData.status === "fail") {
          alert("Message failed to send");
        }
      })
      .then(() => {
        setMailerState({
          email: "",
        });
      });
  };

  return (
    <div className="App">
      <form onSubmit={addEmail}>
        <fieldset>
          <legend>React NodeMailer Contact Form</legend>
          <input
            placeholder="Email"
            name="email"
            value={mailerState}
            onChange={handleStateChange}
          />
          <button>Add Email</button>
        </fieldset>
      </form>
      <ul style={{ color: "white" }}>Emails: {emailList}</ul>
      <form onSubmit={submitEmail}>
        <button>Send Email</button>
      </form>
    </div>
  );
}

export default EmailFormPage;
