describe("User accesses dashboard (overview) page", () => {
  // Kredensial user yang valid (sesuaikan dengan akun test/seed data kamu)
  const validUser = {
    email: "hello@example.com",
    password: "123456",
  };

  // Login via UI, di-cache pakai cy.session supaya tidak login berulang tiap test
  // CATATAN: selector input#email/input#password & selector tombol "Login" masih ASUMSI
  // (mengikuti pola id di form signup, karena belum lihat kode FormSignIn.jsx).
  const loginViaUI = () => {
    cy.session(
      [validUser.email, validUser.password],
      () => {
        cy.visit("http://localhost:5173/login");
        cy.get("input#email").should("be.visible").type(validUser.email);
        cy.get("input#password").should("be.visible").type(validUser.password);
        cy.get("button").contains("Login").click();

        // Sesuai signIn.jsx: setelah loginService sukses, login(refreshToken) dipanggil
        // -> context `user` terisi -> AuthContext simpan token ke localStorage key "token"
        // -> router re-render, NotRequireAuth di /login redirect ke "/"
        cy.url({ timeout: 6000 }).should("eq", "http://localhost:5173/");
        cy.window()
          .its("localStorage")
          .invoke("getItem", "token")
          .should("exist");
      },
      {
        validate() {
          cy.window()
            .its("localStorage")
            .invoke("getItem", "token")
            .should("exist");
        },
      }
    );
  };

  beforeEach(() => {
    loginViaUI();
    cy.viewport(1280, 800);
    cy.visit("http://localhost:5173/");
  });

  it("should redirect unauthenticated user away from the overview page", () => {
    // Test ini sengaja tidak pakai loginViaUI dari beforeEach -> clear dulu session-nya
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit("http://localhost:5173/");
    cy.url().should("include", "/login");
  });

  it("should display the overview page with all dashboard cards after login", () => {
    cy.url().should("eq", "http://localhost:5173/");

    // Berdasarkan dashboard.jsx: 6 card ini yang dirender di dalam MainLayout
    // Selector di bawah ini generik (berbasis grid layout), karena saya belum
    // punya kode CardBalance/CardGoal/dll untuk pakai selector yang lebih presisi.
    cy.get(".grid.sm\\:grid-cols-12").should("be.visible").within(() => {
      cy.get(".sm\\:col-span-4").should("have.length.at.least", 3);
      cy.get(".sm\\:col-span-8").should("have.length.at.least", 2);
    });
  });

  it("should display the Total Balance card with account data", () => {
    // Sesuai CardBalance.jsx: title card = "Total Balance" (dari prop `title` komponen Card)
    cy.contains("Total Balance").should("be.visible");

    // Data balance di-render statis dari data.jsx (bukan fetch async), jadi selalu ada
    cy.contains("a", "All account")
      .should("be.visible")
      .and("have.attr", "href", "/balance");

    // Nominal balance ditampilkan dengan prefix "$"
    cy.contains(/^\$[\d,.]+/).should("be.visible");

    // Info account type juga ditampilkan
    cy.contains("Account Type").should("be.visible");
  });

  it("should display recent transactions", () => {
    // TODO: title card CardRecentTransaction kemungkinan pakai pola sama (prop `title` di Card)
    // tapi perlu dikonfirmasi teks persisnya (mis. "Recent Transaction") setelah lihat kodenya
    cy.contains(/transaksi|transaction/i).should("be.visible");
  });

  it("should display expense statistics / breakdown", () => {
    // TODO: sama seperti di atas, perlu teks title yang pasti dari CardStatistics.jsx & CardExpenseBreakdown.jsx
    cy.contains(/statistik|statistics|pengeluaran|expense/i).should("be.visible");
  });
});
