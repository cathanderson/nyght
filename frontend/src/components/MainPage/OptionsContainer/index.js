const OptionsContainer = ({ venues }) => {
  return (
    <div id="main-page-options-container">
      <div className="main-page-option-container activity">
        <img className="main-page-option-image" src={venue.imageUrl} />
        <div className="main-page-option-venue-name">Venue Name</div>
      </div>
      <div className="main-page-option-container restaurant">
        <img className="main-page-option-image" src={fillerImage} />
        <div className="main-page-option-venue-name">Venue Name</div>
      </div>
      <div className="main-page-option-container drinks-dessert">
        <img className="main-page-option-image" src={fillerImage} />
        <div className="main-page-option-venue-name">Venue Name</div>
      </div>
    </div>
  );
};

export default OptionsContainer;
