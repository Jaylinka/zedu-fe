Cypress.on("uncaught:exception", () => {
  return false;
});

/**
 * Regression test for issue #530
 * Switching workspace on mobile web lands on a blank "Select a channel" screen.
 */
describe("workspace entry with a slow channel lookup (#530)", () => {
  const baseUrl = Cypress.env("baseUrl");
  const orgSlug = Cypress.env("orgSlug") || "hng-internship";

  it("opens the user's first channel instead of the empty 'Select a channel' screen", () => {
    cy.intercept("GET", "**/organisations/*/user-channels*", (req) => {
      req.on("response", (res) => {
        res.setDelay(1500);
      });
    }).as("slowChannels");

    cy.visit(`${baseUrl}/${orgSlug}`, { timeout: 30000 });
    cy.wait("@slowChannels", { timeout: 20000 });

    cy.url({ timeout: 20000 }).should("match", /\/home\/channels\/.+/);
    cy.contains("Select a channel").should("not.exist");
  });

  it("still shows the empty state when the workspace genuinely has no channels", () => {
    cy.intercept("GET", "**/organisations/*/user-channels*", {
      statusCode: 200,
      body: { data: [] },
    }).as("noChannels");

    cy.visit(`${baseUrl}/${orgSlug}`, { timeout: 30000 });
    cy.wait("@noChannels", { timeout: 20000 });

    cy.contains("Select a channel", { timeout: 20000 }).should("be.visible");
  });
});
