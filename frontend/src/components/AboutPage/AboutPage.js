import "./AboutPage.css";
import cath from "../../assets/images/cath.png"
import github from "../../assets/icons/github.png"
import linkedin from "../../assets/icons/linkedin.png"

function AboutPage() {
  return (
    <>
      <div className="outter-about-page-container">
        <div className="inner-about-page-container">
          <div className="about-page-container-subheader">Instructions</div>
          <div className="about-page-content-container">
            <div className="about-page-instructions"></div>
          </div>
        </div>
        <div className="inner-about-page-container">
          <div className="about-page-container-subheader">Meet the team</div>
          <div className="about-page-content-container">
            <div className="about-page-team-member-container">
              <div className="left-team-member-container">
                <img className="team-member-photo" src={cath} />
                <div className="team-member-name-role-container">
                  <span className="team-member-name">Cath Anderson</span>
                  <span className="team-member-title">
                    Project + Frontend Lead
                  </span>
                </div>
              </div>
              <div className="right-team-member-container">
                <a href="https://github.com/cathanderson">
                  <img className="social-media-icon" src={github} />
                </a>
                <a href="https://www.linkedin.com/in/catherineanderson5/">
                  <img className="social-media-icon" src={linkedin} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
