context("Taltech Search", () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        // this is added due to some unknown bug to Cypress devs that I have
        // might or might not be due to the website
        // thanks https://github.com/cypress-io/cypress/issues/987
        return false
    })

    beforeEach(() => {
        cy.visit("");
    })

    it("user can search for a staff member by their first name", ()=>{
        cy.get(".main-container .top-search").type("Ago{enter}");
        cy.get(".contacts__name").contains("Ago Luberg");
    })

    it("user can search for a staff member by their last name", ()=>{
        cy.get(".main-container .top-search").type("Luberg{enter}");
        cy.get(".contacts__name").contains("Ago Luberg");
    })

    it("user can search for a staff member by their full name", ()=>{
        cy.get(".main-container .top-search").type("Ago Luberg{enter}");
        cy.get(".contacts__name").contains("Ago Luberg");
    })
})

context("Taltech Positions", () => {

    it("user can search for a staff member and find their position", ()=>{
        cy.visit("");
        cy.get(".main-container .top-search").type("German Mumma{enter}");
        cy.get(".t-icon__plus-minus").click();
        cy.get(".contacts__expand > .contacts__listing > li:nth-child(1)").first().should("have.text", "külalisõppejõud")
    })
})

context("Taltech Grantee", () => {

    beforeEach(() => {
        cy.visit("");
    })

    it("grantee can find relevant grant information by using menu plus buttons", ()=>{
        cy.get(".first-level-menu-item").contains("Tudeng").click();
        cy.get('.t-menu--icon-wrapp').contains("Finantsinfo").parent().find(".t-btn--plus").click();
        cy.get('.t-menu--icon-wrapp').contains("Õppetoetused ja stipendiumid").parent().find(".t-btn--plus").click();
        cy.get('.t-menu--icon-wrapp').contains("Sihtstipendium").click();
        cy.get(".main-container").find("h3").should("have.text", "Üliõpilase kohustused stipendiumi saamisel:")
    })

    it("grantee can find relevant grant information by clicking relevant menu links", ()=>{
        cy.get(".first-level-menu-item").contains("Tudeng").click();
        cy.get('.t-menu--icon-wrapp').contains("Finantsinfo").click();
        cy.get('.t-menu--icon-wrapp').contains("Õppetoetused ja stipendiumid").click();
        cy.get(".links__3col").contains("Sihtstipendium").click();
        cy.get(".main-container").find("h3").should("have.text", "Üliõpilase kohustused stipendiumi saamisel:")
    })
})
