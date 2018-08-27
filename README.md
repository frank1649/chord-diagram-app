Vue.js One-Month Project
===

* Server
 + Function
   - Maintain one traffic snapshot where each record is an AS path, and byte number
   - Maintain the configuration of the mapping between AS names and AS numbers
 + Implementation
 	- Use feathers.js to build up the server
 	- You can use any kinds of adaptor as the database, ex: feathers-nedb(Filesystem)
* Client Function
 + Function
   - A page to display and configure the mapping between the AS names and numbers
     - Note that the configuration shall be syncronized between different tabs in real time
   - A page to display the traffic between ASes via Chord chart
     - reference: https://bl.ocks.org/mbostock/1046712
 + Implementation
   - Use Quasar Framework (v0.15) to build up the web server
     - Understand how the web server is packed and set up
   - Use Vue.js and d3.js to design your app layout
   - Use Vuex as the communication media between different Vue components

For a quick tutorial, you can see https://trac.genienrm.com/CtoOffice/wiki/Superior/Tutarial/Frontend

Skill Set
- Vue
- Vuex
- Vue Route ---- 5 days > 3
- Qusar ---- 2 days > 1
    - A page to display and configure the mapping between the AS names and numbers
     - Note that the configuration shall be syncronized between different page in real time
- d3.js ---- 5 days > 3
    - A page to display the traffic between ASes via Chord chart
- feathers ---- 5 days
    - Maintain one traffic snapshot where each record is an AS path, and byte number
    - Maintain the configuration of the mapping between AS names and AS numbers
    - Note that the configuration shall be syncronized between different tab in real time

# Quasar App

> WIP
