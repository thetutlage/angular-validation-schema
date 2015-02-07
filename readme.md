
## Schema based Angular JS Validation

[angular-validation](https://github.com/huei90/angular-validation) is damn neat in terms
of validating your forms. I personally hate making my html too much declarative especially 
for long forms.

Schema validator is a provider on top of [angular-validation](https://github.com/huei90/angular-validation) letting you control from forms using schema.

## Example

```javascript
	// Angular validation
	var app = angular.module('yourApp', ['validation', 'validation.rule']);

	// Now injecting valiation.schema
	var app = angular.module('yourApp', ['validation', 'validation.rule','validation.schema']);	
```

### Your Schema

```javascript

// Defining schema 
var Author = {
	firstname: {
		'validations': 'required',
		'validate-on': 'submit',
		'messages':{
			'required': {
				'error':'We need it',
				'success': 'All good'
			}
		}
	},
	url:{
		'validations': 'required,url',
		'validate-on': 'submit',
		'messages':{
			'required': {
				'error':'We need it',
				'success': 'All good'
			},
			'url':{
				'error':'It must be a url'
			}
		}
	}
};

app.config(function(validationSchemaProvider){
	validationSchemaProvider.set("Author",Author);
});

```

### Your html

```html
<form name="Form" validation-schema schema="Author">
    <div class="row">
        <div>
            <label>Required</label>
            <input type="text" name="required" ng-model="form.required">
        </div>
        <div>
            <label>Url</label>
            <input type="text" name="url" ng-model="form.url">
        </div>
        <button validation-submit="Form" ng-click="next()">Submit</button>
        <button validation-reset="Form">Reset</button>
    </div>
</form>

```

## That's All

That is all you need , rest of the stuff will work as specified in angular-valiation docs , it is just a provider to remove validations from html to schema.
