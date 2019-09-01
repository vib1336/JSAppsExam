const storage = function () {

    const appKey = "kid_rJ7Gt847r";
    const appSecret = "d537dedb50a44405a03eee3fed308bb5";

    const getData = function (key) {
        return localStorage.getItem(key + appKey);
    };

    const saveData = function (key, value) {
        localStorage.setItem(key + appKey, JSON.stringify(value));
    };

    const saveUser = function (data) {
        saveData("userInfo", data);
        saveData("authToken", data._kmd.authtoken);

    };

    const deleteUser = function () {
        localStorage.removeItem("userInfo" + appKey);
        localStorage.removeItem("authToken" + appKey);
    };

    return {
        appKey,
        appSecret,
        getData,
        saveData,
        saveUser,
        deleteUser
    }

}();