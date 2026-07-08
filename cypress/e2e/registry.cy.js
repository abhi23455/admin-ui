describe("User sign up", () => {
  it("should allow user to sign up with valid data", () => {
    cy.viewport(550, 750);
    cy.visit("http://localhost:5173/register");
    cy.url().should("include", "/register");

    cy.get("input#fullname")
      .should("be.visible")
      .should("have.attr", "placeholder", "Abhirama Maulana Putra")
      .type("Abhirama Maulana Putra")
      .should("have.value", "Abhirama Maulana Putra");

    cy.get("input#email")
      .should("be.visible")
      .should("have.attr", "placeholder", "hello@example.com")
      .type(`user${Date.now()}@example.com`);

    cy.get("input#password")
      .should("be.visible")
      .should("have.attr", "placeholder", "••••••••")
      .type("123456")
      .should("have.value", "123456");

    cy.get("input#confirmPassword")
      .should("be.visible")
      .should("have.attr", "placeholder", "••••••••")
      .type("123456")
      .should("have.value", "123456");

    cy.get("input#terms").check().should("be.checked");

    cy.get("button").contains("SignUp").click();

  

    cy.wait(5000);
  });

  it("should not allow user to sign up when password and confirm password do not match", () => {
    cy.viewport(550, 750);
    cy.visit("http://localhost:5173/register");
    cy.url().should("include", "/register");

    cy.get("input#fullname")
      .should("be.visible")
      .type("Abhirama Maulana Putra")
      .should("have.value", "Abhirama Maulana Putra");

    cy.get("input#email")
      .should("be.visible")
      .type(`user${Date.now()}@example.com`);

    cy.get("input#password")
      .should("be.visible")
      .type("123456")
      .should("have.value", "123456");

    cy.get("input#confirmPassword")
      .should("be.visible")
      .type("654321")
      .should("have.value", "654321");

    cy.get("input#terms").check().should("be.checked");

    cy.get("button").contains("SignUp").click();

    cy.get("p.text-red-500").contains("Password tidak sama").should("be.visible");
    cy.url().should("not.include", "/login");
    cy.url().should("include", "/register");
  });

  it("should not allow user to sign up without checking the terms and conditions", () => {
    cy.viewport(550, 750);
    cy.visit("http://localhost:5173/register");
    cy.url().should("include", "/register");

    cy.get("input#fullname")
      .should("be.visible")
      .type("Abhirama Maulana Putra")
      .should("have.value", "Abhirama Maulana Putra");

    cy.get("input#email")
      .should("be.visible")
      .type(`user${Date.now()}@example.com`);

    cy.get("input#password")
      .should("be.visible")
      .type("123456")
      .should("have.value", "123456");

    cy.get("input#confirmPassword")
      .should("be.visible")
      .type("123456")
      .should("have.value", "123456");

    cy.get("input#terms").should("not.be.checked");

    cy.get("button").contains("SignUp").click();

    cy.get("p.text-red-500")
      .contains("Anda harus menyetujui Terms and Conditions")
      .should("be.visible");
    cy.url().should("not.include", "/login");
    cy.url().should("include", "/register");
  });
});