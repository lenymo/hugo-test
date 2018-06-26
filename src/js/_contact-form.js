

//
//  CONTACT FORM
//––––––––––––––––––––––––––––––––––––––––––––––––––

var HandleContactForm = (function() {


  //
  //  CONFIG
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  var config = {
    sendingClass: '-is-sending',
    sentClass: '-is-sent',
    doneClass: '-is-done',
    thanksClass: '-is-thankful',
    sendingDelay: 1000,
    antiSpamKeywords: [
      'loan',
      'income',
      'cash',
      'alexa',
      'seo'
    ]
  };
  


  //
  //  HANDLE CONTACT FORM SUBMISSION
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function handleContactForm() {

    // Declare variables.
    var contactForm;
    
    // Get contact form.
    contactForm = document.querySelector('.form__contact');

    // If the contact form exists.
    if ( contactForm !== null && contactForm.length > 0 ) {

      // Listen for form submission event.
      contactForm.addEventListener('submit', handleContactFormSubmission); // contactForm.addEventListener('submit', function(e)
    } // if ( contactForm.length > 0 )
  } // handleContactFormSubmission()


  //
  //  HANDLE CONTACT FORM SUBMISSION
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function handleContactFormSubmission(e) {

    // Stop the form from submitting.
    e.preventDefault();

    // Declare variables.
    var sendingClass;
    var sentClass;
    var doneClass;
    var thanksClass;
    var sendingDelay;

    // Toggle classes.
    sendingClass = config.sendingClass;
    sentClass = config.sentClass;
    doneClass = config.doneClass;
    thanksClass = config.thanksClass;

    // Pull in sending delay from config.
    sendingDelay = config.sendingDelay;

    // Get the form action.
    var form = this;
    var action = form.action;

    // Get form fields.
    var nameField = document.querySelector('.form__field--name');
    var emailField = document.querySelector('.form__field--email');
    var messageField = document.querySelector('.form__field--message');
    var honeypotField = document.querySelector('.form__field--ponyhot');

    // Get the form field values (name, email, message).
    var name = nameField.value;
    var email = emailField.value;
    var message = messageField.value;
    var honeypot = honeypotField.value;

    // If there's no honeypot data.
    if ( ! honeypot ) {

      // Add the sending class to the form.
      form.classList.add( sendingClass );

      // Put together the request string based on form fields.
      var requestString = '?form-name=contact';
      requestString += '&name=' + name;
      requestString += '&email=' + email;
      requestString += '&message=' + message;

      // Build the request URL.
      var requestUrl = action + requestString;

      // Encode the URL.
      requestUrl = encodeURI(requestUrl);

      // Create a new request.
      var request = new XMLHttpRequest();

      // Open the request.
      request.open('POST', requestUrl, true);

      // When the request is loaded.
      request.onload = function() {

        // If it was successful.
        if (request.status >= 200 && request.status < 400) {

          setTimeout( function() {

            // Add the sent class to the form.
            form.classList.add( sentClass );
          }, sendingDelay );

          setTimeout( function() {

            // Add the done class to the form.
            form.classList.add( doneClass );
          }, sendingDelay * 2 );

          setTimeout( function() {

            // Add the thanks class to the form.
            form.classList.add( thanksClass );

            // Empty fields.
            nameField.value = '';
            emailField.value = '';
            messageField.value = '';

            // Remove the .-has-text class from email field.
            emailField.classList.remove('-has-text');

            // Reset the form.
            form.reset();

          }, sendingDelay * 3 );

        // If the server was contacted but submissions was unsuccessful.
        } else {
          // console.log('Server was reached but it returned an error');
        }
      }; // request.onload = function() {

      // Handle errors.
      request.onerror = function() {
        // console.log('There was a connection error of some sort.');
      };

      // Send the request.
      request.send();

    } // if ( ! honeypot )
  }
  

  //
  //  VALIDATE MESSAGE
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function validateMessage( message ) {

    // Declare variables.
    var messageIsValid = false;

    return messageIsValid;
  }
  

  //
  //  INIT
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  function init() {
    handleContactForm();
  }


  //
  //  RETURN
  //––––––––––––––––––––––––––––––––––––––––––––––––––

  return {
    init: init
  };

})();