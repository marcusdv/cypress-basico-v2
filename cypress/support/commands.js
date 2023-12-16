Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    const longText = 'Sim sim, isso realmente mudou meu entendimento sobre lulas e ostras. Por quê você não me conta mais sobre, sei lá, crustáceos?'

    cy.get('#firstName').type('Marcus')
    cy.get('#lastName').type('Costa')
    cy.get('#email').type('marcus@gmail.com')
    cy.get("#open-text-area").type(longText, { delay: 0 })
    cy.get('button[type="submit"]').click()
})

