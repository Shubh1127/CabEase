import { useCaptainAuth } from "../context/CaptainContext";
const CaptainDetails=()=>{
  const {captainData}=useCaptainAuth();
  console.log(captainData);

    return (
        <div >
            <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-3">
            <img className="h-11 w-10 rounded-full object-cover" src="https://imgs.search.brave.com/pT8MfOgQqK8pd47DbSeJWR4gL4UngfzugpxP3dOw1eQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA2Lzc4LzA5Lzc4/LzM2MF9GXzY3ODA5/Nzg3MV9HN09wb0hR/bWlaVGo0YkhCN1lX/MkhvSDFzeVdmQ2JC/OS5qcGc" />
            <h4 className="text-lg font-medium">Harsh Patel</h4>
          </div>
          <div>
            <h4 className="text-xl font-semibold ">₹294.20</h4>
            <p className="text-sm  text-gray-600">Earned</p>
          </div>
        </div>
        <div className="flex p-3 mt-6 bg-gray-100 rounded-xl justify-center gap-5 items-start">
          <div className="text-center">
            <i className="ri-timer-2-line text-2xl mb-2 font-thin"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
          </div>
          <div className="text-center" ><i className="ri-speed-up-fill text-3xl mb-2 font-thin"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
          </div>
          <div className="text-center" ><i className="ri-booklet-line text-3xl mb-2 font-thin"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
          </div>
        </div>
        </div>
    )
}
export default CaptainDetails;