//import DOMPurify from 'dompurify';

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}


module.exports = { validateEmail };