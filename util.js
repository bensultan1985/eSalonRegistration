//eSalon UTIL.js V1.0.0.0
/* Notes:
    1. Init version.
    2. Comments are tagged with "-BEN 5/7/2021"
*/

//hardcoded element to place content in:
var genContent = document.getElementById('gen-content');
//formatted container for all body content:
var contentContainer = genElement('div', '', 'content-container');


//This function builds forms using element data from _formElements obj.
//this is excellent for building consoles with multiple sites/apps.
//We can build uniform, consistent forms, instead of hardcoding form elements
//into index.html each time. -BEN 5/7/2021
function createForm(name, elements, validityFunc, returnFunc) {
  var count = 1;
  var genContentContainer = document.getElementById('gen-content');
  var thisForm = '';
  window[name + 'Data'] = {};
  if (document.getElementById(name + 'Form')) {
    thisForm = document.getElementById(name + 'Form');
    thisForm.innerHTML = '';
  } else {
    thisForm = genElement('form', name + 'Form', 'row');
    thisForm.style.display = 'none';
    contentContainer.appendChild(thisForm);
    genContentContainer.appendChild(contentContainer);
  };
  if (elements != null) {
    for (key in elements) {
      switch (elements[key].type) {
        case 'input':
          var comp = elements[key];
          var newEl = createInput(comp.id, comp.label, comp.value, comp.width, comp.isLocked, count, name);
          thisForm.appendChild(newEl);
          break;
        case 'radio':
          var comp = elements[key];
          var newEl = createRadio(comp.id, comp.label, comp.values, comp.startSelection, comp.width, count, name);
          thisForm.appendChild(newEl);
          break;
        case 'checkbox':
          var comp = elements[key];
          var newEl = createCheckbox(comp.id, comp.label, comp.value, comp.isChecked, comp.width, count, name);
          thisForm.appendChild(newEl);
          break;
        case 'upload':
          var comp = elements[key];
          var newEl = createUpload(comp.id, comp.label, comp.value, comp.icon, comp.width, count, name);
          thisForm.appendChild(newEl);
          break;
        case 'dropdown':
          var comp = elements[key];
          var newEl = createDropdown(comp.id, comp.label, comp.values, comp.startSelection, comp.width, count, name);
          thisForm.appendChild(newEl);
          break;
        default:
          count--;
          break;
      };
      if (comp.width) {
        addWidth(comp.width, newEl);
      } else {
        newEl.className += ` col-xl-6 col-lg-6 col-sm-12 col-md-6 col-xs-12 col-12 `;
      };
      count < 8 ? count++ : count = 1;
    };
  };
  var footer = createFormFooter(name, validityFunc, returnFunc, count);
  thisForm.appendChild(footer);
  $(thisForm).fadeIn(1100);
};

function createInput(id, label, value, width, isLocked, count, name) {
  var elLabel = genElement('label', id + 'label', 'input-label', label + ':');
  var element = genElement('input', id + 'element', 'input-element', '', value);
  addToData(name, id, label);
  if (isLocked) {
    element.value = value;
    element.setAttribute("readonly", true);
    element.style.background = '#EAEAEA';
    element.style.color = '#606060';
    window[name + 'Data'][id] = {
      label: label,
      value: value
    }
  };
  //I created outerContainer for a visual effect, but I removed the effect.
  //Might want to use it at a later time. -BEN 5/7/2021

  // var outerContainer = genElement('div', id+'outer-container', 'outer-div')
  var innerContainer = genElement('div', id + 'inner-container', `inner-div el-color-${count}`);
  // outerContainer.appendChild(innerContainer)
  updateData('input', id, element, label, window[name + 'Data']);
  appendChildren(innerContainer, [elLabel, element]);
  return innerContainer;
};

function createDropdown(id, label, values, startSelection, width, count, name) {
  var container = genElement('div', id + 'container', `inner-div el-color-${count}`);
  var elLabel = genElement('label', id + 'label', '', label + ':');
  var element = genElement('select', id + 'element');
  addToData(name, id, label);
  values.forEach(value => {
    var option = genElement('option', '', '', value, value);
    element.appendChild(option);
  });
  updateData('dropdown', id, element, label, window[name + 'Data']);
  appendChildren(container, [elLabel, element]);
  var value = element.options[element.selectedIndex].text;
  window[name + 'Data'][id] = {
    'label': label,
    'value': value
  }
  return container;
};

function createRadio(id, label, values, startSelection, width, count, name) {
  var container = genElement('div', id + 'container', `inner-div el-color-${count}`);
  var elLabel = genElement('label', id + 'label', '', label + ':');
  var element = genElement('div', id + 'element', 'radio-container', '', '', '', {
    "style": "border-radius: 25px;"
  });
  addToData(name, id, label);
  values.forEach(value => {
    var innerContainer = genElement('div', '', 'inner-container');
    var innerContainer = genElement('div', '', `inner-container el-color-${count}`);
    var btnLabel = genElement('label', '', 'radio-label', '&nbsp;' + value, '', '', {
      "for": id
    });
    var btn = genElement('input', 'radio-element', 'radio-btn', '', value, id, {
      "type": "radio"
    });
    appendChildren(innerContainer, [btn, btnLabel]);
    element.appendChild(innerContainer);
    btnLabel.addEventListener('click', () => {
      btn.checked = true;
      var radios = document.getElementsByName(id);
      for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) var value = radios[i].value;
      };
      window[name + 'Data'][id] = {
        'label': label,
        'value': value
      }
    });
  });
  updateData('radio', id, element, label, window[name + 'Data']);
  appendChildren(container, [elLabel, element]);
  return container;
};

function createCheckbox(id, label, value, isChecked, width, count, name) {
  var container = genElement('div', id + 'container', `el-color-${count}`);
  var element = genElement('input', id + 'element', '', '', '', '', {
    "type": "checkbox"
  });
  if (isChecked) element.setAttribute("checked", true)
  var elLabel = genElement('text', id + 'label', '', '&nbsp;' + label);
  addToData(name, id, label);
  elLabel.addEventListener('click', function() {
    element.checked = !element.checked;
    window[name + 'Data'][id] = {
      'label': label,
      'value': element.checked
    }
  });
  updateData('checkbox', id, element, label, window[name + 'Data']);
  appendChildren(container, [element, elLabel]);
  return container;
};

function createUpload(id, label, value, icon, width, count, name) {
  var container = genElement('div', id + 'container', `inner-div el-color-${count}`);
  var elLabel = genElement('label', id + 'label', '', label + ':');
  var element = genElement('input', id + 'element', 'choose-file', '', '', '', {
    "type": "file",
    "enctype": "multipart/form-data"
  });
  addToData(name, id, label);
  updateData('upload', id, element, label, window[name + 'Data']);
  appendChildren(container, [elLabel, element]);
  return container;
};

//creates html elements with custom attributes -BEN 5/7/2021
function genElement(type, id, className, innerHTML, value, nameAttr, otherAttr) {
  var newElement = document.createElement(type);
  if (innerHTML) newElement.innerHTML = innerHTML;
  if (value) newElement.setAttribute("value", value);
  if (id) newElement.id = id;
  if (className) newElement.className = className;
  if (nameAttr) newElement.setAttribute("name", nameAttr);
  if (otherAttr) {
    for (key in otherAttr) {
      newElement.setAttribute(key, otherAttr[key]);
    };
  };
  return newElement;
};

//append children to divs -BEN 5/7/2021
function appendChildren(div, children) {
  children.forEach(element => {
    div.appendChild(element);
  });
};

function addWidth(elSize, newEl) {
  newEl.className += ` col-xl-${elSize} col-lg-${elSize} col-sm-12 col-md-${elSize} col-xs-12 col-12 `;
};

function createFormFooter(name, validityFunc, returnFunc, count) {
  var footerContainer = genElement('div', name + 'FooterContainer', `inner-div input-element el-color-${count} form-footer col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 footer`);
  var okbtn = formOkElement('Create Your Account', name, validityFunc, returnFunc);
  var innerFooter = genElement('div', '', 'inner-footer');
  appendChildren(footerContainer, [innerFooter]);
  innerFooter.style.textAlign = 'center';
  appendChildren(innerFooter, [okbtn]);
  return footerContainer;
};

function formOkElement(title, name, validityFunc, returnFunc) {
  var btn = genElement('button', '', 'btn btn-primary', title, '', '', {
    "type": "submit"
  });
  formOnClickOk(btn, name, validityFunc, returnFunc);
  return btn;
};

//Clicking the submit button calls a validityFunc if a validityFunc is given.
//Otherwise, clicking "submit" executes the returnFunc on the first click. -BEN 5/7/2021
function formOnClickOk(okBtn, name, validityFunc, returnFunc) {
  okBtn.onclick = function(e) {
    e.preventDefault();
    var returnData = getFormData(name);
    if (validityFunc) {
      var valid = validityFunc(returnData);
      if (valid) {
        returnFunc(returnData);
      };
    } else {
      returnFunc(returnData);
    };
  };
};


//Form data is stored in a global object associated with the form name. -BEN 5/7/2021
function updateData(type, id, element, label, data) {
  switch (type) {
    case 'input':
      element.addEventListener('input', function() {
        data[id] = {
          'label': label,
          'value': this.value
        }
      });
      break;
    case 'dropdown':
      element.addEventListener('input', function() {
        var value = element.options[element.selectedIndex].text;
        data[id] = {
          'label': label,
          'value': value
        }
      });
      break;
    case 'upload':
      element.addEventListener('input', function() {
        data[id] = {
          'label': label,
          'value': element.value
        }
      });
      break;
    case 'radio':
      element.addEventListener('input', function() {
        var radios = document.getElementsByName(id);
        for (var i = 0, length = radios.length; i < length; i++) {
          if (radios[i].checked) var value = radios[i].value;
        };
        data[id] = {
          'label': label,
          'value': value
        }
      });
      break;
    case 'checkbox':
      element.addEventListener('input', function() {
        var isChecked = false;
        if (element.checked) isChecked = true;
        data[id] = {
          'label': label,
          'value': isChecked
        }
      });
      break;
  };
};

//Useful to get data when a site has multiple forms. Not really necessary in this case. -BEN 5/7/2021
function getFormData(name) {
  return window[name + 'Data'];
};

function addToData(name, id, label) {
  window[name + 'Data'][id] = {
    label: label,
    value: ''
  };
};