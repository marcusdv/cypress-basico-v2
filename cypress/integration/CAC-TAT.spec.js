/// <reference types="Cypress" />


const textao = "\
loreipsum dolor sit amet, consectetur adipiscing elit et just\
loreipsum dolor sit amet, consectetur adipiscing elit et just\
loreipsum dolor sit amet, consectetur adipiscing elit et just\
loreipsum dolor sit amet, consectetur adipiscing elit et just\
loreipsum dolor sit amet, consectetur adipiscing elit et just\
loreipsum dolor sit amet, consectetur adipiscing elit et just\
loreipsum dolor sit amet, consectetur adipiscing elit et just\
loreipsum dolor sit amet, consectetur adipiscing elit et just\
loreipsum dolor sit amet, consectetur adipiscing elit et just\
loreipsum dolor sit amet, consectetur adipiscing elit et just\
"

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function () {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = 'Sim sim, isso realmente mudou meu entendimento sobre lulas e ostras. Por quê você não me conta mais sobre, sei lá, crustáceos?'
        cy.get('#firstName').type('Marcus')
        cy.get('#lastName').type('Costa')
        cy.get('#email').type('marcus@gmail.com')
        // cy.get('#phone').type('71986593535')
        // cy.get('input[value="elogio"]').click()
        // cy.get('#phone-checkbox').click()
        cy.get("#open-text-area").type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get(".success").should('be.visible')

    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('Marcus')
        cy.get('#lastName').type('Costa')
        cy.get('#email').type('marcus@')
        cy.get('button[type="submit"]').click()
        cy.get(".error").should('be.visible')
    })

    it('digita um texto grande na area de texto', function () {
        cy.get("#open-text-area").type(textao, { delay: 0 })
    })
})  