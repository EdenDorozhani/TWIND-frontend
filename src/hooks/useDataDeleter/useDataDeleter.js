import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteAction } from "./useDataDeleter.actions";
import { BASE_URL } from "../../axiosConfig";

const useDataDeleter = ({ path }) => {
  const onDelete = async ({ identifier, action = () => {} }) => {
    const url = BASE_URL + `/${path}?identifier=${identifier}`;
    try {
      const response = await deleteAction(url);
      toast.success(response.data.message);
      action();
      return response;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return { onDelete };
};

export default useDataDeleter;
