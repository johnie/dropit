var CustomSelect = CustomSelect || function(selector, settings) {

  if ("ontouchstart" in window) return

  this.selector = selector || "select"
  this.settings = settings || {}

  this.settings.hiddenSelectClass   = this.settings.hiddenSelectClass   || "hidden"
  this.settings.customSelectClass   = this.settings.customSelectClass   || "custom"
  this.settings.activeListClass     = this.settings.activeListClass     || "active"
  this.settings.selectedOptionClass = this.settings.selectedOptionClass || "selected"

  this.originalSelects = []
  this.originalOptions = []

  this.selectButtons = []
  this.selectLists   = []
  this.selectOptions = []

  var init = function() {
    var selectElements = document.querySelectorAll(this.selector)
    for (var i=0, len=selectElements.length; i<len; i++)
      this.create(selectElements.item(i), i)
  }.bind(this)

  if (document.readyState == "complete" || document.readyState == "interactive")
    init()
  else
    document.addEventListener("DOMContentLoaded", init)

}

CustomSelect.prototype = {

  create: function(select, i) {

    this.originalSelects.push(select)
    this.originalOptions.push(select.querySelectorAll("option"))

    var selectedOption = select.querySelector("[selected]") || this.originalOptions[i].item(0),
        selectedOptionIndex = Array.prototype.indexOf.call(this.originalOptions[i], selectedOption),

        createSelectButton = function() {
          var button = document.createElement("button")
          button.textContent = selectedOption.textContent
          button.className = this.settings.customSelectClass
          button.addEventListener("click", function(e) {
            e.preventDefault()
            this.toggle(i)
          }.bind(this))
          this.selectButtons.push(button)
        },
        createSelectList = function() {
          var list = document.createElement("ul")
          list.className = this.settings.customSelectClass
          this.selectLists.push(list)
          this.selectOptions.push([])
          createSelectListOptions.call(this)
        },
        createSelectListOptions = function() {
          var self = this;
          [].forEach.call(self.originalOptions[i], function(option, j) {
            var optionValue = option.textContent,
                listItem = document.createElement("li")
            if (j == selectedOptionIndex)
              listItem.className = self.settings.selectedOptionClass
            selectedOption.setAttribute("selected","selected")
            self.selectOptions[i].push(listItem)
            listItem.textContent = optionValue
            listItem.addEventListener("click", function(e) {
              self.selectOption(e.target, i)
            })
            self.selectLists[i].appendChild(listItem)
          })
        },
        replaceSelects = function() {
          var selectParent = select.parentNode
          selectParent.insertBefore(this.selectButtons[i], select)
          selectParent.insertBefore(this.selectLists[i], select)
          select.classList.add(this.settings.hiddenSelectClass)
        }

    createSelectButton.call(this)
    createSelectList.call(this)
    replaceSelects.call(this)

  },

  toggle: function(i) {
    var activeClass = this.settings.activeListClass,
        list = this.selectLists[i],
        button = this.selectButtons[i],
        closeSelectList = function(e) {
          if ((e.type == "keyup" && e.keyCode != 27) || e.target == button) return
          hide()
        },
        show = function() {
          list.style.left = button.offsetLeft + "px"
          list.style.top = button.offsetTop + "px"
          list.classList.add(activeClass)
          document.addEventListener("click", closeSelectList)
          document.addEventListener("keyup", closeSelectList)
        },
        hide = function() {
          list.classList.remove(activeClass)
          document.removeEventListener("click", closeSelectList)
          document.removeEventListener("keyup", closeSelectList)
        }
    list.classList.contains(activeClass) ? hide() : show()
  },

  selectOption: function(option, i) {

    this.originalSelects[i].querySelector("[selected]").removeAttribute("selected")
    this.originalOptions[i].item(this.selectOptions[i].indexOf(option)).setAttribute("selected","selected")

    this.selectButtons[i].textContent = option.textContent

    this.selectLists[i].querySelector("." + this.settings.selectedOptionClass).classList.remove(this.settings.selectedOptionClass)
    option.className = this.settings.selectedOptionClass

  }

}