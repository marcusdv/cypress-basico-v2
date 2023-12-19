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
    const longText = 'Sim sim, isso realmente mudou meu entendimento sobre lulas e ostras. Por quê você não me conta mais sobre, sei lá, crustáceos?'

    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function () {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('1 preenche os campos obrigatórios e envia o formulário', function () {
        cy.get('#firstName').type('Marcus')
        cy.get('#lastName').type('Costa')
        cy.get('#email').type('marcus@gmail.com')
        cy.get("#open-text-area").type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get(".success").should('not.be.visible')

    })

    it('2 exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('Marcus')
        cy.get('#lastName').type('Costa')
        cy.get('#email').type('marcus@')
        cy.get("#open-text-area").type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get(".error").should('be.visible')
    })

    it('3 exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#phone').type('Não deve ter texto')
        cy.get('#phone').should('have.value', '')
    })

    it('4 exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('Marcus')
        cy.get('#lastName').type('Costa')
        cy.get('#email').type('marcus@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get("#open-text-area").type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get(".error").should('be.visible')
    })

    it('5 preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName').type('Marcus').clear()
        cy.get('#lastName').type('Costa').clear()
        cy.get('#email').type('marcus@gmail.com').clear()
        cy.get('#phone').type('71986593535').clear()

        cy.get('#firstName').should('have.value', '')
        cy.get('#lastName').should('have.value', '')
        cy.get('#email').should('have.value', '')
        cy.get('#phone').should('have.value', '')
    })

    it('6 exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('button', 'Enviar').click()
        cy.get(".error").should('be.visible')

    })

    it('7 envia o formuário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()

    })
})
describe('Seleciona Produtos no Dropdown', function () {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('0 seleciona um produto (YouTube) por seu texto', function () {
        cy.get('#product').select('YouTube')
        cy.get('#product').should('have.value', 'youtube')
    })

    it('1 seleciona um produto (Mentoria) por seu valor (value)', function () {
        cy.get('#product').select('mentoria')
        cy.get('#product').should('have.value', 'mentoria')
    })

    it('1 seleciona um produto (Blog) por seu índice', function () {
        cy.get('#product').select(1)
        cy.get('#product').should('have.value', 'blog')
    })
})

describe('Seleciona Produtos no Dropdown', function () {
    beforeEach(() => {
        cy.visit('./src/index.html')
        cy.get('input[type="radio"][value="ajuda"]').as('ajudaRadio')
        cy.get('input[type="radio"][value="elogio"]').as('elogioRadio')
        cy.get('input[type="radio"][value="feedback"]').as('feedbackRadio')
    })

    it('1 marca o tipo de atendimento "Feedback"', function () {
        cy.get('@feedbackRadio').check('feedback')
    })

    it('2 marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]').should('have.length', 3).each(($radio) => {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })
})

describe('Checkboxes', function () {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('1 marca ambos checkboxes, depois desmarca o último"', function () {
        cy.get('input[type="checkbox"]').as('checkboxes').check()
        cy.get('@checkboxes').last().uncheck()
        cy.get('@checkboxes').last().should('not.be.checked')
    })

    it('2 exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('Marcus')
        cy.get('#lastName').type('Costa')
        cy.get('#email').type('marcus@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get("#open-text-area").type('Caju, castanha e tapioca')
        cy.contains('button', 'Enviar').click()
        cy.get(".error").should('be.visible')
    })

})

describe('Files', function () {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('1 seleciona um arquivo da pasta fixtures"', function () {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('2 seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    it('3 seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        // 
        cy.fixture('example.json').as('sampleFile')

        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('@sampleFile', { action: 'drag-drop' })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })


})

describe('Links que abrem outras abas', function () {
    it('1 verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })
    it('2 acessa a página da política de privacidade removendo o target e então clicando no link', function () {
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')
    })
})