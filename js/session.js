var user_id = sessionStorage.getItem('user_id');
var user_name = sessionStorage.getItem('user_name');


function logout() {
    sessionStorage.clear();
    window.location.href = "../login.html";
}
