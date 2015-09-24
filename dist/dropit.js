/*!
 * dropit
 * A super-small, non-dependent JavaScript framework that allows you to easily customize selectboxes
 * https://github.com/johnie/dropit#readme
 * @author Johnie Hjelm <johnie@hjelm.im>
 * @version 1.0.0
 * Copyright 2015. MIT licensed.
 */
var Dropit = Dropit || function(selector, settings) {
  if ("ontouchstart" in window) {
    return;
  }
  this.selector = selector || "select";
  this.settings = settings || {};
  this.settings.hiddenSelectClass = this.settings.hiddenSelectClass || "hidden";
  this.settings.dropitClass = this.settings.dropitClass || "custom";
  this.settings.activeListClass = this.settings.activeListClass || "active";
  this.settings.selectedOptionClass = this.settings.selectedOptionClass || "selected";
  this.originalSelects = [];
  this.originalOptions = [];
  this.selectButtons = [];
  this.selectLists = [];
  this.selectOptions = [];
  var init = function() {
    var selectElements = document.querySelectorAll(this.selector);
    for (var i = 0, len = selectElements.length; i < len; i++) {
      this.create(selectElements.item(i), i);
    }
  }.bind(this);
  if (document.readyState == "complete" || document.readyState == "interactive") {
    init();
  } else {
    document.addEventListener("DOMContentLoaded", init);
  }
};

Dropit.prototype = {
  create: function(select, i) {
    this.originalSelects.push(select);
    this.originalOptions.push(select.querySelectorAll("option"));
    var selectedOption = select.querySelector("[selected]") || this.originalOptions[i].item(0);
    var selectedOptionIndex = Array.prototype.indexOf.call(this.originalOptions[i], selectedOption);
    var createSelectButton = function() {
      var button = document.createElement("button");
      button.textContent = selectedOption.textContent;
      button.className = this.settings.dropitClass;
      button.addEventListener("click", function(e) {
        e.preventDefault();
        this.toggle(i);
      }.bind(this));
      this.selectButtons.push(button);
    };
    var createSelectList = function() {
      var list = document.createElement("ul");
      list.className = this.settings.dropitClass;
      this.selectLists.push(list);
      this.selectOptions.push([]);
      createSelectListOptions.call(this);
    };
    var createSelectListOptions = function() {
      var self = this;
      [].forEach.call(self.originalOptions[i], function(option, j) {
        var optionValue = option.textContent;
        var listItem = document.createElement("li");
        if (j == selectedOptionIndex) {
          listItem.className = self.settings.selectedOptionClass;
        }
        selectedOption.setAttribute("selected", "selected");
        self.selectOptions[i].push(listItem);
        listItem.textContent = optionValue;
        listItem.addEventListener("click", function(e) {
          self.selectOption(e.target, i);
        });
        self.selectLists[i].appendChild(listItem);
      });
    };
    var replaceSelects = function() {
      var selectParent = select.parentNode;
      selectParent.insertBefore(this.selectButtons[i], select);
      selectParent.insertBefore(this.selectLists[i], select);
      select.classList.add(this.settings.hiddenSelectClass);
    };
    createSelectButton.call(this);
    createSelectList.call(this);
    replaceSelects.call(this);
  },
  toggle: function(i) {
    var activeClass = this.settings.activeListClass;
    var list = this.selectLists[i];
    var button = this.selectButtons[i];
    var closeSelectList = function(e) {
      if (e.type == "keyup" && e.keyCode != 27 || e.target == button) {
        return;
      }
      hide();
    };
    var show = function() {
      list.style.left = button.offsetLeft + "px";
      list.style.top = button.offsetTop + "px";
      list.classList.add(activeClass);
      document.addEventListener("click", closeSelectList);
      document.addEventListener("keyup", closeSelectList);
    };
    var hide = function() {
      list.classList.remove(activeClass);
      document.removeEventListener("click", closeSelectList);
      document.removeEventListener("keyup", closeSelectList);
    };
    list.classList.contains(activeClass) ? hide() : show();
  },
  selectOption: function(option, i) {
    this.originalSelects[i].querySelector("[selected]").removeAttribute("selected");
    this.originalOptions[i].item(this.selectOptions[i].indexOf(option)).setAttribute("selected", "selected");
    this.selectButtons[i].textContent = option.textContent;
    this.selectLists[i].querySelector("." + this.settings.selectedOptionClass).classList.remove(this.settings.selectedOptionClass);
    option.className = this.settings.selectedOptionClass;
  }
};