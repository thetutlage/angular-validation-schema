/*
	***************************************
			SCHEMA VALIDATOR
	***************************************
	Schema validator for angular-valiation, good
	if you want to keep your backend validation rules
	in sync or your hate making your html too declarative.

	@author - Harminder Virk
	@github - https://github.com/thetutlage/angular-validation-schema
*/

(function() {
	var app = angular.module('validation.schema',[])

	// Tiny provider to save and fetch schemas
	.provider('validationSchema',function(){

		// List of schemas are stored here
		var schemas = {};

		// Adding schema to object
		this.set = function(name,hash){
			schemas[name] = hash;
		};

		// fetching from object
		this.get = function(name){
			return schemas[name];
		}

		// Exposing them here
		this.$get = function(){
			return{
				set: this.set,
				get: this.get
			}
		}
	})

	// Required directive
	.directive('validationSchema',['validationSchema',function(validationSchema){
		return{
			restrict: 'AE',
			compile: function(tElem, tAttrs){
				// Default schema to extend upon
				var defaultSchema = {
					// default validation is set to required
					'validations':'required',
					// Messages to display
					'messages':{
						// on required
						'required':{
							'error': 'Required',
							'success': 'Good Required'
						}
					},
					// When to validate , default to watch
					'validate-on':'watch'
				};

				// Grabbing schema the user wants
				var schema = validationSchema.get(tAttrs.schema);

				if(schema){

					// If it is an valid schema , then setFixtures
					setFixtures(schema);

				}else{

					// Otherwise show warning of non-existing schema
					warnDeveloper(tAttrs.schema);
				}

				// Warn developer method
				function warnDeveloper(schema){

					// Error message
					var error_message = schema + ' Schema not found';

					// Outputting to console
					console.warn('VALIDATION SCHEMA :',error_message);
				}

				function setFixtures(schema){

					// Deep extending objects
					function extendDeep(dst) {

						// Looping through all the values
					  angular.forEach(arguments, function(obj) {
					    if (obj !== dst) {
					      angular.forEach(obj, function(value, key) {
					        if (dst[key] && dst[key].constructor && dst[key].constructor === Object) {

					        	// Rerun if above key is an Object

					          extendDeep(dst[key], value);

					        } else {

					        	// Extend here

					          dst[key] = dst[key] || value;
					        }     
					      });   
					    }
					  });
					  return dst;
					}

					// schema.firstname = extendDeep(schema.firstname,defaultSchema);

					// Grabbing all form elements inside the tElem
					var formElements = tElem[0].querySelectorAll('input,select,textarea');

					// Looping through all form Elements
					angular.forEach(formElements,function(input){

						// Getting instance of angular element
						var i = angular.element(input);

						// Grabbing name
						// @description -  Name is required to match keys on schema
						// @example - firstname key on schema will be matched with firstname as form
						// 						element name

						var input_name = i.attr('name');

						// If schema defination exists
						if(schema[input_name]){

							// Deep extend rules to save undefined stuff
							var i_schema = extendDeep(schema[input_name],defaultSchema);

							// Setting validator on field
							i.attr('validator',i_schema.validations);

							// Setting valid-method on field
							i.attr('valid-method',i_schema['validate-on']);

							// Looping through messages object
							angular.forEach(i_schema.messages,function(vals,key){

								// Setting error message for validation type
								i.attr(key+'-error-message',vals.error || '');

								// Setting success message for validation type
								i.attr(key+'-success-message',vals.success || '');

							});
						}

					});
				}
			}
		}
	}]);
}).call(this);