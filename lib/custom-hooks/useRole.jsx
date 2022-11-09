// import { useSelector } from 'react-redux';
// import { selectUser } from '../redux/userSlice';
// import LocalStorageService from '../utils/LocalStorageService';

/**
 *
 * @returns [list of roles of loggedin user]
 */
const useRole = (role) => {
  if (role) {
    const roleName = role?.includes('ROLE_DOCTOR')
      ? 'doctor'
      : role?.includes('ROLE_PATIENT')
      ? 'patient'
      : 'admin';
    return roleName;
  }
  return '';
};

export default useRole;
