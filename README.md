# Train-Schedular

* Creating a train schedule application that incorporates Firebase to host arrival and departure data. 
* This app will retrieve and manipulate this information with Moment.js. 
* This website will provide up-to-date information about various trains, namely their arrival times and how many    minutes remain until they arrive at their station.

 The app will sure that that it suits this basic spec:
  
  * When adding trains, administrators should be able to submit the following:
    
    * Train Name
    
    * Destination 
    
    * First Train Time -- in military time
    
    * Frequency -- in minutes
  
  * The app will calculate the arrival of the next train time; this should be relative to the current time.
  
  * Users from many different machines must be able to view same train times.