import { axiosInstance } from "../../api/globalApi";


const updateDayOff = async(id,editingUser) =>{

    await axiosInstance.put(`daysOff/${id}`, editingUser)
        .then((response) => {
          console.log('response edit:', response);
         
         editingUser((response) => {
            return response.map((response) => {
              if (response.id === editingUser.id) {
                return editingUser;
              } else {
                return response;
              }
            });
          });
          console.log('editing user:', editingUser);
          //resetEditing();
        })
        .catch((error) => {
          
         
        });
}
export default updateDayOff;