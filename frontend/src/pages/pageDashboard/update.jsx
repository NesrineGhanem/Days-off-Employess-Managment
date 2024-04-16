import { axiosInstance } from "../../api/globalApi";
import {notification} from "antd"

const updateUser = async(id,editingUser) =>{

    await axiosInstance.put(`users/${id}`, editingUser)
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
          notification.error({
            placement: 'top',
            bottom: 50,
            duration: 2,
            message: error.data.message
          })
         
        });
}
export default updateUser;