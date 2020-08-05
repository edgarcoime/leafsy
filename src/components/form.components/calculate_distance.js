
function calculateDistance() {
  let street = document.getElementById("street").value;
  let city = document.getElementById("city").value
  let province = document.getElementById("province-picker").value;
  let postalCode = document.getElementById("postalCode").value;
    
      // api xmlHTTP fordistance caluclation in browser
    let request = new XMLHttpRequest();

    // this gets the maximum delivery distance from an element with an id of #deliveryDistance
    let deliveryDistance = document.getElementById("deliveryRadius").innerHTML;
    deliveryDistance = Number(deliveryDistance);


    // Retrieves the bookstore/business address from an element with an id of #bookstoreAddress
    let bookstoreAddress = document.getElementById("storeAddress").innerHTML;
    bookstoreAddress = bookstoreAddress.trim().split(" ").join("%20");
    
    // retrieves the customer address from the input box with a id specified in the argument/parameter
    let customerAddress = street+ " " + city + " " + province + " " + postalCode
    customerAddress = customerAddress.trim().split(",").join("");
    customerAddress = customerAddress.split(" ").join("%20");


  

    // uses the bing maps api to retrieve an object containing the distance calculation between the two addresses
    request.open("GET", "https://dev.virtualearth.net/REST/v1/Routes?wayPoint.1=" + bookstoreAddress + "[address]&Waypoint.2=" + customerAddress + "&distanceUnit=km&key=AuM54vOzfnoekS5jchUOAoAXdsrCX0yCjwKjlHOwRtzGrunpQY767BWypWjVGDO7" )
    request.send();

    request.onload = () => {

      if (request.status == 200) {
        
        let object = JSON.parse(request.response);
        let distance = object.resourceSets[0].resources[0].travelDistance;
        console.log(distance);
  
        // if the distance between the addresses is less than the specified maximum delivery distance
        if (distance <= deliveryDistance){

          document.getElementById("drop-off").disabled = false;
            console.log(false)
        } else {

            document.getElementById("drop-off").disabled = true;
            console.log("true")
        };
        
       
      } else {

        console.log(`error ${request.status} ${request.statusText}`);

      };
    };
    
  };
  
export default calculateDistance;