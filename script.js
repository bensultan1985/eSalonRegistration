//eSalon New User Console V1.0.0.0
/* Notes:
    1. Init version.
    2. Comments are tagged with "-BEN 5/7/2021"
*/

var span = document.getElementsByClassName("close")[0];

function onLoad() {
  var headElement = createPageHeader(`<span class="bullet">∙</span> Create Your Account <span class="bullet">∙</span>`);
  headElement.style.display = 'none';
  document.getElementById('gen-content').appendChild(headElement);
  $(headElement).fadeIn(500);
  createForm('sign-up', _formElements, validityFunc, returnFunc);
};

function createPageHeader(header) {
  var container = genElement('div', '', 'page-header header-div');
  var text = genElement('div', '', ' h2 header-text', header);
  container.appendChild(text);
  return container;
};


/* 
Mock validity check function for form submission. ReturnData param is the form data.

validityFunc is a very important step in working with a form like this, because
we need to make sure that all fields contain valid data (e.g. zip code value
is a five digit number). If I had more time to work on this project, my next step
would be to build the logic to verify data from all form fields. validityFunc
must return true or false. If false is returned, the form stays open. If true is
returned, the form closes and the user is notified that registration is complete.
-BEN 5/7/2021
*/
function validityFunc(returnData) {
  var isValid = true;
  var fix = [];
  console.log('This log was triggered by the validityFunc. This function allows me to check for issues in the form data before the form submission completes. The form data is in this obj: ', returnData);
  for (id in returnData) {
    if (returnData[id].value == '' && id != 'photo') {
      isValid = false;
      fix.push(id);
    };
  };
  if (fix != []) {
    var str = 'Make sure you fill out the following fields and submit again:<br>';
    fix.forEach(field => {
      var text = returnData[field].label;
      if (field == 'consent') text = 'consent';
      str += `<span class="mod-list"> <u>${text}</u></span>`;
      openModal(str);
    });
  };
  if (isValid) {
    console.log('validity successful')
    return true;
  } else {
    return false;
  };
};


//mock return function for form. param is data from the form. -BEN 5/7/2021
function returnFunc(returnData) {
  completeSignup('sign-up', returnData.firstName.value);
  console.log('successfully saved data:', returnData);
};

//modal functions
document.getElementsByClassName("close")[0].onclick = function() {
  document.getElementById("alertModal").style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == document.getElementById("alertModal")) {
    document.getElementById("alertModal").style.display = "none";
  };
};

function openModal(str) {
  var modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = str;
  document.getElementById("alertModal").style.display = "block";
};

//sign-up completion functions -BEN 5/7/2021
function completeSignup(name, firstName) {
  var userName = '';
  if (firstName) userName = ', ' + firstName;
  $("html, body").animate({scrollTop: 0}, "slow");
  $('#' + name + 'Form').fadeOut(400);
  var msgContainer = genElement('div', 'completedSignUp', 'h3 submitted');
  var msg = genElement('h3', '', 'submitted-msg', `Congratulations${userName}! You're all signed up! We are so glad to have you on board.`);
  msgContainer.style.display = 'none';
  contentContainer.appendChild(msgContainer);
  msgContainer.appendChild(msg);
  setTimeout(showCompleteMsg, 500);
};

function showCompleteMsg() {
  $('#completedSignUp').fadeIn(500);
};
