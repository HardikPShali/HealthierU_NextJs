
import Cookies from 'universal-cookie';

const LocalStorageService = (function () {
    const cookies = new Cookies();
    var _service;
    function _getService() {
        if (!_service) {
            _service = this;
            return _service
        }
        return _service
    }
    function _setToken(tokenObj) {
        //console.log('tokenObj: ', tokenObj)
        cookies.set('access_token', tokenObj.access_token, { path: '/' });
        cookies.set('refresh_token', tokenObj.refresh_token, { path: '/' });

    }

    function _setCurrentUser(currentUser) {
        //console.log('currentUser: ', currentUser)
        cookies.set('currentUser', currentUser, { path: '/' });
    }

    function _getCurrentUser() {
        return cookies.get('currentUser');
    }

    function _getAccessToken() {
        return cookies.get('access_token');
    }
    function _getRefreshToken() {
        return cookies.get('refresh_token');
    }
    function _clearToken() {
        cookies.remove('access_token');
        cookies.remove('refresh_token');
    }
    return {
        getService: _getService,
        setToken: _setToken,
        getAccessToken: _getAccessToken,
        getRefreshToken: _getRefreshToken,
        clearToken: _clearToken,
        setCurrentUser: _setCurrentUser,
        getCurrentUser: _getCurrentUser,
    }
})();
export default LocalStorageService;