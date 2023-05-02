
function Checkpassword(password) {
    var er = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
return er.test(password);
}


export {Checkpassword};
