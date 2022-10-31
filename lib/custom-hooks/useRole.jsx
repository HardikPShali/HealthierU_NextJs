import { useSelector } from 'react-redux';
import { selectUser } from '../redux/userSlice';
// import LocalStorageService from '../utils/LocalStorageService';

/**
 *
 * @returns [list of roles of loggedin user]
 */
const useRole = () => {
  const user = useSelector(selectUser);

  if (user) {
    const loggedInUser = user?.currentUser;
    const returnArr = [loggedInUser.authorities];

    return returnArr;
  }
  return [];
};

export default useRole;
