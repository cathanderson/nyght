import "./EmailFormAndList.css"

function EmailFormAndList() {
  return (
    <div id="email-form-list-container">
      <div id="outter-top-email-form-list-container">
        <div id="inner-top-email-form-list-container">
          <div id="email-form-container">
            <h4 id="email-form-list-subheader">Add a friend's email:</h4>
            <form id="add-email-form">
              <input type="text" defaultValue="Add email" />
              <input type="submit" value="Add email" />
            </form>
          </div>
        </div>
        <div id="inner-top-email-form-list-container">
          <h4 id="email-form-list-subheader">Itinerary email list:</h4>
          <ul id="emails-list">
            <li id="email-list-item">Example1@nyght.com</li>
            <li id="email-list-item">Example2@nyght.com</li>
            <li id="email-list-item">Example3@nyght.com</li>
          </ul>
        </div>
      </div>
      <div id="outter-bottom-email-form-list-container">
        <form id="send-email-form">
          <input type="submit" value="Send emails" />
        </form>
      </div>
    </div>
  );
}

export default EmailFormAndList;
