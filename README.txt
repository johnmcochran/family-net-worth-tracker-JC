terminal 1:
cd family_net_worth_tracker_app
npm run serve 

terminal 2:
(in highest directory)
node server.js 

callback: looks like you're calling a function, but you're passing a functions result into the subsequent code

lessons learned from talking w/ Alex:
    have separate modules for api and db functionality
        e.g. verifyuser 
    for rest api, have query sent to api/table_name instead of just table_name
        this keeps users from accidentally navigating to your rest api
        
how to test:
using vitest, reference test>common.test.js
in the app terminal, npm run test