/**

 */
var app = angular.module('chamelion', [
  'ngRoute', 'ngCookies','angularSoap'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
    // Pages
    .when("/login",{templateUrl:"partials/login.html",controller: "LoginCtrl"})
    .when("/about", {templateUrl: "partials/about.html", controller: "PageCtrl"})
    .when("/faq", {templateUrl: "partials/faq.html", controller: "PageCtrl"})
    .when("/pricing", {templateUrl: "partials/pricing.html", controller: "PageCtrl"})
    .when("/services", {templateUrl: "partials/services.html", controller: "PageCtrl"})
    .when("/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl"})
    // Blog
    .when("/blog", {templateUrl: "partials/blog.html", controller: "BlogCtrl"})
    .when("/blog/post", {templateUrl: "partials/blog_item.html", controller: "BlogCtrl"})
    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);
app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);
/**
 * Controls the Blog
 */


app.factory("gethotelService", ['$soap',function($soap){
    var base_url = "http://209.133.206.170/ChameleonHubXML/CommonsProcess";

    return {
        hotels_: function(){
            return $soap.post(base_url,"searchDestination",{Destination: "Foz"});
        }
    }
}])



 app.controller('PageCtrl', function($scope,$location,$http, gethotelService ) {
    console.log("pagectrl init..");
        jQuery("input[name='date_from']").datepicker();
        jQuery("input[name='date_to']").datepicker();
         tjq(document).ready(function() {
            tjq('.revolution-slider').revolution(
            {
                dottedOverlay:"none",
                delay:8000,
                startwidth:1170,
                startheight:646,
                onHoverStop:"on",
                hideThumbs:10,
                fullWidth:"on",
                forceFullWidth:"on",
                navigationType:"none",
                shadow:0,
                spinner:"spinner4",
                hideTimerBar:"on",
            });
        });




         gethotelService.hotels_().then(function(response){
         $scope.response = response;
                console.log(response);
          });

           /*start hotel form */
          $scope.hotelresForm = function(){
            console.log("hotel form ... ")
            console.log($scope.hotelname+$scope.hoteldatestart+$scope.hoteldateend+$scope.hotelrooms+$scope.hoteladults+$scope.hotelkids)
              
               if ($scope.hotelForm.$valid) {
                    console.log("valid form")

                   


                    var reqxml ='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservice.chameleonws.com/">'+
                    '<soapenv:Header/>'+
                    '<soapenv:Body>'+
                    '<web:searchDestination>'+
                    '<!--Optional:-->'+
                    '<destinationRQ>'+
                    '<Destination>Foz</Destination>'+
                    '</destinationRQ>'+
                    '</web:searchDestination>'+
                    '</soapenv:Body>'+
                    '</soapenv:Envelope>';

                      
                }
                else
                {
                   $scope.submitted = true;
                    
               }
 
           }
         /*end hotel form */

         
            
         /* flight form start */

          $scope.flightresForm = function(){
          console.log("hotelres")

          }
          /*end of flight form */
            
          });







  
                /**
                 * Controls all other Pages
                 */


            app.controller("LoginCtrl",function( $scope,$cookies,$cookieStore,loginService) {
                // I contain the list of friends to be rendered.
                $scope.friends = [];
                // I contain the ngModel values for form interaction.
                $scope.form = {
                    name: ""
                };

                $scope.login_user = function() {
                   if ($scope.userForm.$valid) {
                    console.log("valid form")
                    // If the data we provide is invalid, the promise will be rejected,
                    // at which point we can tell the user that something went wrong. In
                    // this case, I'm just logging to the console to keep things very
                    // simple for the demo.
                    loginService.login_user()
                        .then(                         
                            function(data) {
                                console.log(data);
                            }
                        )
                    ;
                    // Reset the form once values have been consumed.
                    $scope.form.name = "";
                  }
                  else
                  { 
                    console.log("form not valid");
                  }
                   
                };
               
        
            });
             
           
                

     
        
        app.service("loginService",function( $http, $q ,$cookieStore) {
                $http.get("http://localhost/angular%20js%20phonecat/Chamelion/")
                  $cookieStore.put('user_token','tokentoken');
                // Return public API.
                return({
                   login_user: login_user,
                    
                });
                
                function login_user( name ) {
                    var request = $http({
                        method: "get",
                        url: "http://jsonplaceholder.typicode.com/photos",
                      
                    });
                    return( request.then( handleSuccess, handleError ) );
                }
                // I get all of the friends in the remote collection.
                
                function handleError( response ) {
                    console.log('in error -----------------------')
                    return("error")
                }
                function handleSuccess( response ) {
                    return( response.data );
                }
            });