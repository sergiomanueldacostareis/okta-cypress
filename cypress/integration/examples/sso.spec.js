var sessionToken = "";
var applicationURL = "";
 
describe('OKTA Authentication', function() {
  it('Perform the okta API calls before visiting the site', function() {
    cy.request('POST', 'https://dev-632801.oktapreview.com/api/v1/authn', {
      "username": "Test@test.com",
      "password": "Pa55word",
      "options": {
        "multiOptionalFactorEnroll": true,
        "warnBeforePasswordExpired": true
      }
    })
    .then((response) => {
      sessionToken = response.body.sessionToken;
      cy.request('POST', 'https://dev-632801.oktapreview.com/api/v1/sessions', {
        "sessionToken": sessionToken
      })
      .then((response) => {
        console.log(response.body);
        var options = {};
        options.domain = '.dev-632801.oktapreview.com';
        options.log = 'true';
        cy.setCookie('sid', response.body.id, options);
      })
    })
    cy.visit('https://www-dev.uat-thesun.co.uk/nu-sun-pod-loaders-dev/')
  });
});