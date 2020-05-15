(function (global, $) {
  var Greeter = function (firstName, lastName, language) {
    return new Greeter.init(firstName, lastName, language);
  };

  var supportedLangs = ["en", "es"];

  var greetings = {
    en: "Hello",
    es: "Hola",
  };

  var formalGreeting = {
    en: "Greetings",
    es: "Saludos",
  };

  var logMessages = {
    en: "Logged in",
    es: "Inicio sesion",
  };

  Greeter.prototype = {
    fullName: function () {
      return this.firstName + " " + this.lastName;
    },

    validate: function () {
      if (supportedLangs.indexOf(this.language) === -1) {
        throw "Invalid language";
      }
    },

    greeting: function () {
      return greetings[this.language] + " " + this.firstName + "!";
    },

    formalGreeting: function () {
      return formalGreeting[this.language] + ", " + this.fullName();
    },

    greet: function (formal) {
      var msg;

      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      if (console) {
        console.log(msg);
      }

      // chainable
      return this;
    },

    log: function () {
      if (console) {
        console.log(logMessages[this.language] + ": " + this.fullName());
      }

      return this;
    },

    setLang: function (lang) {
      this.language = lang;

      this.validate();

      return this;
    },
  };

  Greeter.init = function (firstName, lastName, language) {
    var self = this;

    self.firstName = firstName || "";
    self.lastName = lastName || "";
    self.language = language || "en";
  };

  Greeter.init.prototype = Greeter.prototype;

  global.Greeter = global.$G = Greeter;
})(window, jQuery);