(function (global, $) {
  // 'new' an object
  var Greeter = function (firstName, lastName, language) {
    return new Greeter.init(firstName, lastName, language);
  };

  // hidden within the scope of the IIFE and never directly accessible
  var supportedLangs = ["en", "es"];

  // Informal greetings
  var greetings = {
    en: "Hello",
    es: "Hola",
  };

  // Formal greetings
  var formalGreeting = {
    en: "Greetings",
    es: "Saludos",
  };

  // Logger messages
  var logMessages = {
    en: "Logged in",
    es: "Inicio sesion",
  };

  // prototype holds methods (to save memory space)
  Greeter.prototype = {
    // 'this' refers to the calling object at execution time
    fullName: function () {
      return this.firstName + " " + this.lastName;
    },

    validate: function () {
      // checks is a valid language
      // references the externally inaccessible 'supportedLangs' within the closure
      if (supportedLangs.indexOf(this.language) === -1) {
        throw "Invalid language";
      }
    },

    // retrieve messages from object by referring to property using [] syntax
    greeting: function () {
      return greetings[this.language] + " " + this.firstName + "!";
    },

    formalGreeting: function () {
      return formalGreeting[this.language] + ", " + this.fullName();
    },

    greet: function (formal) {
      var msg;

      // if undefined or null it will be coersed to 'false'
      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      if (console) {
        console.log(msg);
      }

      // 'this' refers to the calling object at execution time
      // makes method chainable
      return this;
    },

    log: function () {
      if (console) {
        console.log(logMessages[this.language] + ": " + this.fullName());
      }

      // makes chainable
      return this;
    },

    setLang: function (lang) {
      // set the language
      this.language = lang;

      // validate
      this.validate();

      // makes chainable
      return this;
    },

    HTMLGreeting: function (selector, formal) {
      if (!$) {
        throw "jQuery not loaded";
      }

      if (!selector) {
        throw "Missing jQuery selector";
      }

      // determine the message
      var msg;
      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      // inject the message in the chosen place in the DOM
      $(selector).html(msg);

      // makes chainable
      return this;
    },
  };

  // actual object is created here, allowing us to 'new' an object without calling 'new'
  Greeter.init = function (firstName, lastName, language) {
    var self = this;

    self.firstName = firstName || "";
    self.lastName = lastName || "";
    self.language = language || "en";

    self.validate();
  };

  // trick borrowed from jQuery so we don't have to use the 'new' keyword
  Greeter.init.prototype = Greeter.prototype;

  // attach our Greetr to the global object, and provide a shorthand 'G$' for ease our poor fingers
  global.Greeter = global.G$ = Greeter;
})(window, jQuery);
