describe("FeaturedArtwork", () => {
  beforeEach(() => {
    // Intercept the API call and respond with mock data
    cy.intercept("GET", "/api/artworks/of-the-day", {
      body: {
        title: "The Starry Night",
        primaryImageUrl: "/the-starry-night.jpg",
        mediaType: "Oil on canvas",
        yearCreated: 1889,
        contributingArtists: ["Vincent van Gogh"],
        description: "A masterpiece of post-impressionist art.",
      },
    }).as("getArtworkOfTheDay");

    cy.visit("http://localhost:8080/artworkofday"); // visit the page containing the FeaturedArtwork
  });

  it("displays the correct subheading", () => {
    cy.wait("@getArtworkOfTheDay"); // wait for the API call to complete
    cy.get(".card-div .card-subheading").should("contain", "The Starry Night");
  });

  it("displays the correct image", () => {
    cy.wait("@getArtworkOfTheDay"); // wait for the API call to complete
    cy.get(".card-div .card-img").should(
      "have.attr",
      "src",
      "/the-starry-night.jpg"
    );
  });

  it("displays the correct details", () => {
    cy.wait("@getArtworkOfTheDay"); // wait for the API call to complete
    cy.get(".card-div .detail").eq(0).should("contain", "Oil on canvas");
    cy.get(".card-div .detail").eq(1).should("contain", "1889");
    cy.get(".card-div .detail").eq(2).should("contain", "Vincent van Gogh");
    cy.get(".card-div .detail-description").should(
      "contain",
      "A masterpiece of post-impressionist art."
    );
  });
});
