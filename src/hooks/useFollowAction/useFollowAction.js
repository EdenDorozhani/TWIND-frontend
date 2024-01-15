import { useState } from "react";

const useFollowAction = () => {
const [isFollow,setIsFollow] = useState()

const updateFollowStatus = async () => {
    try{
const response = await updateFollow()
    }catch(err){

    }
}

const toggleFollow = ({isFollow}) => {
    if (isFollow === "0") {
        setIsFollow("1");
      } else {
        setIsFollow("0");
      }
}


    return (  );
}
 
export default useFollowAction;