// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		if(window.cordova && window.cordova.plugins.Keyboard) {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

			// Don't remove this line unless you know what you are doing. It stops the viewport
			// from snapping when text inputs are focused. Ionic handles this internally for
			// a much nicer keyboard experience.
			cordova.plugins.Keyboard.disableScroll(true);
		}
		if(window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
})
.controller("ExampleController", function ($scope, $rootScope, $cordovaInAppBrowser, $cordovaCamera, $cordovaFileTransfer) {

	//$rootScope.imgURI = "../img/icon.png";
	$scope.logueofacebook = function(){
		var options = {
			location: 'yes',
			hardwareback: 'yes',
			clearcache: 'no',
			toolbar: 'yes'
		};
		console.log('se activo');
		var url = 'https://www.fb.com';
		$cordovaInAppBrowser.open( url, '_blank', options)
			.then(function(event){
			})
			.catch(function(event){
			});
	}
	$scope.takePhoto = function () {
		var options = {
			quality: 75,
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: Camera.PictureSourceType.CAMERA,
			allowEdit: true,
			encodingType: Camera.EncodingType.JPEG,
			targetWidth: 600,
			targetHeight: 300,
			popoverOptions: CameraPopoverOptions,
			saveToPhotoAlbum: false
		};
		$cordovaCamera.getPicture(options).then(
			function (imageData) {
				$rootScope.imgURI = "data:image/jpeg;base64," + imageData;
				var options = new FileUploadOptions();
				options.fileKey="file";
				options.fileName=  $rootScope.imgURI.substr( $scope.imgURI.lastIndexOf('/')+1);;
				options.mimeType="image/jpeg";
				var params = new Object();
				params.value1 = "test";
				params.value2 = "param";
				options.params = params;
				options.chunkedMode = false;
				options.headers = {
					Connection: "close"
				};
				$cordovaFileTransfer.upload( encodeURI('http://apptablets0km.com/Guido/simagenes.php'), $scope.imgURI,options)
				.then(
					function(r){
						console.log("Code = " + r.responseCode);
						console.log("Response = " + r.response);
						console.log("Sent = " + r.bytesSent);
						alert("la Imagen se guardo en http://apptablets0km.com/Guido/" + r.response);
						$rootScope.sRec = r.response;
					},
					function(error){
						alert("An error has occurred: Code = " + error.code);
					}
				);
			}
		);
	}
	$scope.choosePhoto = function () {
		var options = {
			quality: 75,
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
			allowEdit: true,
			encodingType: Camera.EncodingType.JPEG,
			targetWidth: 600,
			targetHeight: 300,
			popoverOptions: CameraPopoverOptions,
			saveToPhotoAlbum: false
		};
		$cordovaCamera.getPicture(options)
			.then(
				function (imageData) {
					$rootScope.imgURI = "data:image/jpeg;base64," + imageData;
					var options = new FileUploadOptions();
					options.fileKey="file";
					options.fileName=  $rootScope.imgURI.substr( $scope.imgURI.lastIndexOf('/')+1);;
					options.mimeType="image/jpeg";
					var params = new Object();
					params.value1 = "test";
					params.value2 = "param";
					options.params = params;
					options.chunkedMode = false;
					options.headers = {
						Connection: "close"
					};
					$cordovaFileTransfer.upload(encodeURI('http://apptablets0km.com/Guido/simagenes.php'), $scope.imgURI, options)
					.then(
						function(r){
							console.log("Code = " + r.responseCode);
							console.log("Response = " + r.response);
							console.log("Sent = " + r.bytesSent);
							alert("la Imagen se guardo en http://apptablets0km.com/Guido/" + r.response);
							$rootScope.sRec = r.response;
						},
						function(error){
							alert("An error has occurred: Code = " + error.code);
						}
					);
				}
			,function(err){}
		);
	}
})
.controller('FormaCtrl', function ($scope, $rootScope, $http, $cordovaInAppBrowser) {

var configura = $http({method : 'GET',url : "http://apptablets0km.com/Guido/guidoConfiguracion.php"});
configura.then(
	function(data){
		console.log(data)
		$scope.ASR = data.data.asesores;



	$scope.vista = function(){
		console.log($scope.formulario)
		//alert($scope.Compartir);
	}
	
/*	$scope.logueofacebook = function(){
		var options = {
			location: 'yes',
			hardwareback: 'yes',
			clearcache: 'no',
			toolbar: 'yes'
		};
		console.log('se activo');
		var url = 'https://www.fb.com';
		$cordovaInAppBrowser.open( url, '_blank', options)
			.then(function(event){
			})
			.catch(function(event){
			});
	}
*/
	
	$scope.openF = function() {
		var options = {
			location: 'yes',
			hardwareback: 'yes',
			clearcache: 'no',
			toolbar: 'yes'
		};
		//var mensaje = 'Felicidades! ' + $rootScope.nom + ' ' + $rootScope.ape + ' gracias por confiar en nosotros para llegar a tu 0Km.'      
		//var url = 'https://www.facebook.com/dialog/feed?' + 'app_id=1001031530011875&' + 'from=483945621784205&' +'link=http://apptablets0km.com/Guido/posteo.php/' + $rootScope.nom +'/' + $rootScope.ape + '&name='+ mensaje + '&caption=GuidoGuidi.com.ar&' +'picture=http://apptablets0km.com/Guido/'+ $rootScope.sRec + '&' + 'description=Ellos ya tienen su VW, contáctenos y lo asesoraremos para llegar a su 0km&' + 'redirect_uri=http://apptablets0km.com/Guido/postGuido.html';
		//var url = 'https://www.facebook.com/dialog/feed?' + 'app_id=1001031530011875&' + 'from=483945621784205&' +'link=http://encuestasintegracionybases.esy.es/posteo.php/' + $rootScope.nom +'/' + $rootScope.ape + '&name='+ mensaje + '&caption=GuidoGuidi.com.ar&' +'picture=http://apptablets0km.com/Guido/'+ $rootScope.sRec + '&' + 'description=Ellos ya tienen su VW, contáctenos y lo asesoraremos para llegar a su 0km&' + 'redirect_uri=http://encuestasintegracionybases.esy.es/postGuido.html';
		//var modelok = 'https://www.facebook.com/dialog/feed?app_id=1001031530011875&from=483945621784205&link=http://apptablets0km.com/pst.php/nombre/apellido/uriImagenes/Descripcion';
		var appIDface = 'app_id=1001031530011875&';
		var fromFace = 'from=483945621784205&';
		var linkFace = 'link=http://apptablets0km.com/pstGuido.php/' + $rootScope.nom + '/' + $rootScope.ape + '/'+ $rootScope.sRec + '/';
		var url = 'https://www.facebook.com/dialog/feed?' + appIDface + fromFace + linkFace; 
		console.log(url)
		$cordovaInAppBrowser.open( url, '_blank', options)
			.then(function(event){})
			.catch(function(event){});
	};




	
	//$scope.ASR = ["Emanuel Pulella", "Pablo Mazur", "Carlos Britez"];	

	$scope.Stado = [
		{ text: "Sumamente Satisfecho", value: "Sumamente Satisfecho" },
		{ text: "Muy Satisfecho", value: "Muy Satisfecho" },
		{ text: "Satisfecho", value: "Satisfecho" },
		{ text: "Poco Satisfecho", value: "Poco Satisfecho" },
		{ text: "Nada Satisfecho", value: "Nada Satisfecho" }
	];
	$scope.Stado2 = [
		{ text: "Sumamente Satisfecho", value: "Sumamente Satisfecho" },
		{ text: "Muy Satisfecho", value: "Muy Satisfecho" },
		{ text: "Satisfecho", value: "Satisfecho" },
		{ text: "Poco Satisfecho", value: "Poco Satisfecho" },
		{ text: "Nada Satisfecho", value: "Nada Satisfecho" }
	];
	$scope.Sino = [
		{ text: "Si", value: "Si" },
		{ text: "No", value: "No" }	
	];	
	$scope.formulario = {};

	$scope.save = function(){
		console.log('se activo save')
		var formus ={};
		formus.asesor = $scope.formulario.asesor;
		formus.nomape = $scope.formulario.nomape.nom + ' '+ $scope.formulario.nomape.ape;
		formus.email = $scope.formulario.email;
		formus.celular = $scope.formulario.celular;
		formus.compra = $scope.formulario.compra;
		formus.comercial = $scope.formulario.comercial;
		formus.admin = $scope.formulario.admin;
		formus.manejo = $scope.formulario.manejo;
		formus.postventa = $scope.formulario.postventa;
		formus.controles = $scope.formulario.controles;
		formus.limpieza = $scope.formulario.limpieza;
		formus.chasis = $scope.formulario.chasis;
		formus.entrega = $scope.formulario.entrega;
		formus.srec = $rootScope.sRec;
		formus.msj = $scope.formulario.msj;
		$rootScope.msj = $scope.formulario.msj;
		$rootScope.nom =  $scope.formulario.nomape.nom;
		$rootScope.ape =  $scope.formulario.nomape.ape;
		if ((!formus.asesor)||(!formus.nomape)||(!formus.email)||(!formus.celular)||(!formus.compra)||(!formus.comercial)||(!formus.admin)||(!formus.manejo)||(!formus.postventa)||(!formus.controles)||(!formus.limpieza)||(!formus.entrega)||(!formus.srec))
		{
			console.log('no se verifico');
			console.log(formus)
			
			if (!formus.asesor) {
				alert('Selecciona tu Asesor')
			}
			else if (!formus.nomape) {
				alert('Completa tu Nombre')	
			} 
			else if (!formus.email) {
				alert('Completa tu Email')	
			} 
			else if (!formus.celular) {
				alert('Completa tu Celular')	
			} 
			else if (!formus.compra) {
				alert('Complete su nivel satisfaccion respecto a la Compra en general')	
			} 
			else if (!formus.comercial) {
				alert('Complete su nivel satisfaccion respecto a la atencion recibida por su asesor Comercial')	
			} 
			else if (!formus.admin) {
				alert('Complete su nivel satisfaccion respecto a la atencion recibida por el sector administrativo')	
			}
			else if (!formus.manejo) {
				alert('Complete si se le ha ofrecido prueba de Manejo')	
			}
			else if (!formus.postventa) {
				alert('Complete si ha tenido contacto postventa')	
			}
			else if (!formus.controles) {
				alert('Complete su nivel de satisfacción en relacion a la explicacion de los controles y funcionamiento')	
			}
			else if (!formus.limpieza) {
				alert('Complete su nivel de satisfacción en relacion a la limpieza y estado General de su 0Km')	
			}
			else if (!formus.entrega) {
				alert('Complete su nivel de satisfacción en relacion al cumplimiento en la entrega')	
			}
			else if (!formus.srec) {
				alert('Debe sacar una foto')	
			}
			
		}
		else{
			console.log('paso la verificacion de formulario');
			angular.element('#info').before('<div id="noticia" class="card"><div class="item item-text-wrap text-center">Aguarde se esta procesando la Solicitud</div></div>');
			angular.element('#info').hide();
			if ($scope.Compartir == true) {
				alert('Muchas Gracias');

			console.log(formus)
			$http({
				method : 'POST',
				url : "http://apptablets0km.com/Guido/guido.php",    
				data: formus,
				cache: false
				})
				.then(function(data){
					console.log(formus);
					console.log(data);
					console.log( "se envio" + formus);
					var ddd = 'entry_1170368338='+formus.asesor+'&entry_387678932='+formus.nomape+'&entry_1891962030='+formus.celular+'&entry_1237257077='+formus.email+'&entry_41817465='+formus.chasis+'&entry_2124192708='+formus.compra+'&entry_1260841747='+formus.comercial+'&entry_1986849229='+formus.admin+'&entry_309188638='+formus.manejo+'&entry_85086023='+formus.postventa+'&entry_1978505198='+ formus.controles+'&entry_2012652551='+formus.limpieza+'&entry_1096856268='+formus.msj;
					
					$http({
						method : 'POST',
						url : "https://docs.google.com/forms/d/18rVudDUncrNWZjGDjnQleOOe38Y6Xma3LSjIbSj9vYI/formResponse",
						headers: {'Content-Type': 'application/x-www-form-urlencoded' },
						data: ddd
						})
						.then(
							function mySucces(response) {
								console.log(response.data);
							},
							function myError(response) {
								console.log(ddd);
								console.log('fallo gogle')
							}
						);
						
						$scope.formulario ="";
						$rootScope.imgURI = "";
						angular.element('#info').show();
						angular.element('#noticia').remove();
						$scope.openF(); 
				})
			} 			
			else{
				//alert('no se elijio sin compartir el valor es = ' + $scope.Compartir);
				$http({
					method : 'POST',
					url : "http://apptablets0km.com/Guido/guido.php",    
					data: formus,
					cache: false
				})
				.then(function(data){
					console.log(formus);
					console.log(data);
					console.log( "se envio" + formus);
					var ddd = 'entry_1170368338='+formus.asesor+'&entry_387678932='+formus.nomape+'&entry_1891962030='+formus.celular+'&entry_1237257077='+formus.email+'&entry_41817465='+formus.chasis+'&entry_2124192708='+formus.compra+'&entry_1260841747='+formus.comercial+'&entry_1986849229='+formus.admin+'&entry_309188638='+formus.manejo+'&entry_85086023='+formus.postventa+'&entry_1978505198='+ formus.controles+'&entry_2012652551='+formus.limpieza+'&entry_1096856268='+formus.msj;
					$http({
						method : 'POST',
						url : "https://docs.google.com/forms/d/18rVudDUncrNWZjGDjnQleOOe38Y6Xma3LSjIbSj9vYI/formResponse",
						headers: {'Content-Type': 'application/x-www-form-urlencoded' },
						data: ddd
					}).then(function mySucces(response) {
								console.log(response.data);
							},
							function myError(response) {
								console.log(ddd);
								console.log('fallo gogle');
						});
				alert('Muchas Gracias por completar nuestro registro');
				$scope.formulario ="";
				$rootScope.imgURI = "";
				angular.element('#info').show();
				angular.element('#noticia').remove();
				});
			}
		}
	} 


	},
	function(data){
		console.log(data);
	}
	);



})






