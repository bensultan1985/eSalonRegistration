//The ideal place for this data is a config file - I placed it here to save time in this exercise. -BEN 5/7/2021
var _stateArray = ["Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District Of Columbia", "Federated States Of Micronesia", "Florida", "Georgia", "Guam", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Marshall Islands", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Northern Mariana Islands", "Ohio", "Oklahoma", "Oregon", "Palau", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virgin Islands", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
var _genderArray = ["female", "male", "non-binary", "other", "I decline to answer"]


//Util.js uses this data to construct form elements -BEN 5/7/2021
var _formElements = {
    "firstName": {
        label: "First Name",
        type: "input",
        value: '', 
        width: '',
        isLocked: false,
        id: "firstName"
    },
    "lastName": {
        label: "Last Name",
        type: "input",
        value: '', 
        width: '',
        isLocked: false,
        id: "lastName"
    },
    "emailAddress": {
        label: "Email Address",
        value: 'myemail@esalon.com',
        type: 'input',
        width: '',
        isLocked: true,
        id: "emailAddress"
    },
    "phoneNumber": {
        label: "Phone #",
        value: '', 
        type: 'input',
        width: '',
        id: 'phoneNumber'

    },
    "streetAddress": {
        label: "Street Address",
        value: '', 
        type: 'input',
        id: 'streetAddress',
        width: '12'
    },
    "city": {
        label: "City",
        value: '', 
        type: 'input',
        width: '',
        id: 'city'
    },
    "state": {
        label: "State",
        values: _stateArray, 
        type: 'dropdown',
        width: '',
        id: 'state'
    },
    "zipCode": {
        label: "Zip Code",
        value: '', 
        type: 'input',
        width: '',
        id: 'zipCode'
    },
    "photo": {
        label: "Upload Photo (optional)",
        value: '', 
        type: 'upload',
        width: '',
        id: 'photo'
    },
    "radio": {
        label: "Gender",
        values: _genderArray, 
        type: 'radio',
        width: '12',
        id: 'radio'
    },
    "consent": {
        label: "I understand and accept the <a href='legal.html' target='_blank'>terms and conditions.</a>",
        isChecked: false, 
        type: 'checkbox',
        width: '10',
        id: 'consent'
    }
}