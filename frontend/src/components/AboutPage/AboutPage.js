import "./AboutPage.css";
import cath from "../../assets/images/cath.png";
import brian from "../../assets/images/brian.jpg";
import evan from "../../assets/images/evan.jpg";
import github from "../../assets/icons/github.png";
import linkedin from "../../assets/icons/linkedin.png";

function AboutPage() {
  return (
    <>
      <div className="outter-about-page-container">
        <div className="inner-about-page-container">
          <div className="about-page-container-subheader" id="about-this-project-subheader">
            About this project
          </div>
          <div className="about-page-content-container">
            <div className="about-page-about">
              Nyght is a New York City plan generator fit for couples looking
              for new date ideas and groups of friends looking for new places to
              try in different neighborhoods across the city.
              <br></br>
              <br></br>
              To create a plan, navigate to the home page, select a
              neighborhood, whether you'd prefer an after dinner cocktail or
              dessert, and modify the provided plan by clicking a venue and
              toggling through available options in that category.
              <br></br>
              <br></br>
              Once you're satisfied with your plan, you can hit confirm. This
              will bring you to the itinerary's page which includes a map for
              your plan and functionality to email your plan to yourself and
              your friends.
              <br></br>
              <br></br>
              For more information, check out our{" "}
              <a href="https://github.com/cathanderson/nyght">
                project repo
              </a>{" "}
              on Github!
            </div>
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
            <div className="about-page-team-member-container">
              <div className="left-team-member-container">
                <img className="team-member-photo" src={brian} />
                <div className="team-member-name-role-container">
                  <span className="team-member-name">Brian Yu</span>
                  <span className="team-member-title">Backend Lead</span>
                </div>
              </div>
              <div className="right-team-member-container">
                <a href="https://github.com/briehn">
                  <img className="social-media-icon" src={github} />
                </a>
                <a href="https://www.linkedin.com/in/briehnyu/">
                  <img className="social-media-icon" src={linkedin} />
                </a>
              </div>
            </div>
            <div className="about-page-team-member-container">
              <div className="left-team-member-container">
                <img className="team-member-photo" src={evan} />
                <div className="team-member-name-role-container">
                  <span className="team-member-name">Evan Ryan</span>
                  <span className="team-member-title">Flex Lead</span>
                </div>
              </div>
              <div className="right-team-member-container">
                <a href="https://github.com/evanhundred">
                  <img className="social-media-icon" src={github} />
                </a>
                <a href="https://www.linkedin.com/in/evan-ryan-1a2b07131/">
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
