
const LocationSearchPanel = (props,idx) => {
  console.log(props)
  //sample location
  const locations=[
    "Sector 45,Near Police Station, Gurgaon, Haryana",
    "Sector 46,Near Police Station, Gurgaon, Haryana",
    "Sector 47,Near Police Station, Gurgaon, Haryana",
  ]
  return (
    <div>
      {locations.map((location)=>(
        <>
        <div key={idx} onClick={()=>{
          props.setVehiclePanel(true)
          props.setPanelOpen(false)
        }} className='flex items-center gap-4  border-2 active:border-black p-2 rounded-xl  my-2 text-lg justify-start     '>
        <h2 className='bg-[#eee] flex items-center justify-center  h-10 w-16  rounded-full'>
          <i className="ri-map-pin-fill "></i> 
        </h2>
        <h4 className=' font-medium '>{location}</h4>
      </div>
        </>
      ))}
      
       
    </div>
  )
}

export default LocationSearchPanel