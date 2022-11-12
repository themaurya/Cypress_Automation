Cypress.Commands.add('loginWithOkta', () => {
    const optionsSessionToken = {
      method: 'POST',
      url: 'https://-----OKTA_AUTH_URL----/api/v1/authn',
      body: {
        username: Cypress.env('username'),
        password: Cypress.env('password'),
        options: {
          warnBeforePasswordExpired: 'true'
        }
      }
    }
  
    cy.request(optionsSessionToken).then(response => {
      const sessionToken = response.body.sessionToken;
      const qs = {
        client_id: '---client_id---',
        code_challenge: Cypress.env('code_challenge'),
        state: '---state---',
        nonce: '---nonce---',
        redirect_uri: Cypress.env('redirect_uri'),
        code_challenge_method: 'S256',
        response_mode: 'fragment',
        response_type: 'code',
        scope: ['openid', 'profile', 'email'],
        sessionToken: sessionToken
      }
  
      cy.request({
        method: 'GET',
        url: Cypress.env('auth_token_url'),
        form: true,
        followRedirect: false,
        qs: qs
      }).then(responseWithToken => {
        const redirectUrl = responseWithToken.redirectedToUrl;
  
        const accessToken = redirectUrl
        .substring(redirectUrl.indexOf('access_token'))
        .split('=')[1]
        .split('&')[0];
  
        cy.wrap(accessToken).as('accessToken');
  
        cy.visit(redirectUrl).then(() => {
          cy.visit('/');
        });
      });
    });
  })