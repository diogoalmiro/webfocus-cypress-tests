context('Test WebfocusApp Server',() => {
    describe('Root', () => {
        beforeEach(()=>{
            cy.visit('/')
        })
        it('Displays application name', () => {
            cy.contains('Cypress Test Application')
        })
        it('Lists Components', () => {
            cy.contains('Cypress Component Test')
            cy.contains('Static Tests')
        })
    })
    describe('Cypress Component Test', () => {
        beforeEach(() => {
            cy.visit('/cypress-component-test/');
        })
        it('Has a navbar', () => {
            cy.get('nav').contains('Cypress Component Test')
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
            cy.get('[data-pagination-map]').contains("Item #1") // follow next once
            cy.get('[data-pagination-next]').click() // follow next once
            cy.get('#check-pagination > li').should('have.length', 33)
            cy.get('#check-pagination > li:last-child').contains('Item #65');
        })

        it('Statically send files', () => {
            cy.request('/cypress-component-test/text.txt').should((res) => {
                expect(res.status).to.eq(200)
                expect(res.body).to.eq("This text should be served by the component.")
            })
        })

        it('Inline Fetch', () => {
            cy.get('[data-inline-fetch-map]').contains("Hello World!")
            cy.get('[data-inline-fetch-function]').contains("Hello World!")
        })
    })

    describe('Static Tests (Component Behaviour)', () => {
        let expected = {
            'render static-tests/index.pug' : "Server Side Render index.pug",
            'return static-tests/file.txt' : "Text-plain file.txt",
            'render static-tests/file.pug' : "Server Side Render file.pug",
            'render static-tests/subfolder/index.pug' : "Server Side Render subfolder/index.pug",
            'render static-tests/subfolder/file.pug' : "Server Side Render subfolder/file.pug",
            'return static-tests/subfolder/file.txt' : "Text-plain subfolder/file.txt",
        }
        let itGets = (url, expectedResponse) => {
            it(`GET ${url}','${expectedResponse}`, () => {
                if( expectedResponse.startsWith("return") ){
                    cy.request(url).should((res) => {
                        expect(res.status).to.eq(200)
                        expect(res.body).to.eq(expected[expectedResponse]);
                    })
                }
                else{
                    cy.visit(url).contains(expected[expectedResponse])
                }
            })
        }
        itGets('/static-tests/','render static-tests/index.pug')
        itGets('/static-tests/file.txt','return static-tests/file.txt')
        itGets('/static-tests/file','render static-tests/file.pug')
        itGets('/static-tests/anotherfile.txt','render static-tests/index.pug')
        itGets('/static-tests/subfolder/','render static-tests/subfolder/index.pug')
        itGets('/static-tests/subfolder/file','render static-tests/subfolder/file.pug')
        itGets('/static-tests/subfolder/file.txt','return static-tests/subfolder/file.txt')
        itGets('/static-tests/subfolder/anotherfile.txt','render static-tests/index.pug')
        itGets('/static-tests/anothersubfolder/anotherfile.txt','render static-tests/index.pug')
        it('GET /api/static-tests/ -> returns JSON', () => {
            cy.request('/api/static-tests/').should((res) => {
                expect(res.status).to.eq(200)
                expect(res.body).to.eq("API Component String")
            })
        })
    })
})