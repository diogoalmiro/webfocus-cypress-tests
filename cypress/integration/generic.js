const port = require('../../shared.json').port

context('Test WebfocusApp Server',() => {
    describe('General', () => {
        it('Displays application name', () => {
            cy.visit('/')
            cy.contains('Cypress Test Application')
        })
    })
    describe('Main Index', () => {
        it('Lists Components', () => {
            cy.visit('/');
            cy.get('.card').contains('Cypress Component Test')
            cy.get('#navbar').contains('Cypress Component Test')
        })
    })

    describe('Component Index', () => {
        beforeEach(() => {
            cy.visit('/cypress-component-test/');
        })
        it('Has a navbar', () => {
            cy.get('nav.navbar').contains('Cypress Component Test')
        })
        it('Renders pug', () => {
            cy.get('#check-text').contains("This is the render of pug, it should have headers and more generated html from the webfocus app.")
        })
        it('Has access to util/fecth.js', () => {
            cy.get('#check-fetch').contains("GET /api/cypress-component-test/ should return this string.")
        })
        it('Paginates results', () => {
            cy.get('#check-pagination > li').should('have.length', 33)
            cy.get('#check-pagination > li:last-child').contains('Item #32');
            cy.get('[data-pagination-next').click() // follow next once
            cy.get('#check-pagination > li').should('have.length', 33)
            cy.get('#check-pagination > li:last-child').contains('Item #65');
        })

        it('Statically send files', () => {
            cy.request('/cypress-component-test/text.txt').should((res) => {
                expect(res.status).to.eq(200)
                expect(res.body).to.eq("This text should be served by the component.")
            })
        })
    })
})