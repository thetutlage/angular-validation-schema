
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

## Global Validations

At times we have similar validations on most of the fields and it is very frustating to add same validations on all the fields.

Using globals inside your schema you can add global rules on all mentioned fields.

```

var Author = {
	globals: {
		'validations': 'required',
		'validate-on': 'submit',
		'messages':{
			'required': {
				'error':'We need it',
				'success': 'All good'
			}
		}
	},
	firstname: {
	},
	url:{
		'validations': 'required,url'
	}
};

```

You see how much we have cut down by using globals, as they apply rules globally on all fields.

## Tiny Templating

We all like personalized error messages, and using globals it will be difficult to show personalized
messages. So by using this tiny helper `%field%` you can print field name.

So `%field% is required on firstname` with turn out to be `firstname is required`.


## Plunker

[Live Demo](http://plnkr.co/edit/X56HEsDYgYoY8gbSj7cu?p=preview)

## That's All

That is all you need , rest of the stuff will work as specified in angular-valiation docs , it is just a provider to remove validations from html to schema.
