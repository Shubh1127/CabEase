const LocationSearchPanel = ({ suggestions, setPanelOpen, setVehiclePanel, handleSuggestionClick }) => {
  return (
    <div>
      {suggestions?.map((suggestion, idx) => (
        <div
          key={idx}
          onClick={() => {
            handleSuggestionClick(suggestion); 
            // setVehiclePanel(true);
            // setPanelOpen(false);
          }}
          className="flex items-center gap-4 border-2 active:border-black p-2 rounded-xl my-2 text-lg justify-start"
        >
          <h2 className="bg-[#eee] flex items-center justify-center h-10 w-16 rounded-full">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="font-medium">{suggestion.description}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;