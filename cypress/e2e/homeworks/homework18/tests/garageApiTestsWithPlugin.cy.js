import 'cypress-plugin-api';

describe("Garage Expenses Tests With Cypress Plugin", () => {
  const currentDate = new Date().toISOString().split("T")[0];
  let myCarId;
  let globalSid;
  let expenseId = 1;
  let invalidExpenseId = 9999;

  before(() => {
    cy.api({
      method: "POST",
      url: "/api/auth/signin",
      body: {
        email: "kek@ololo.ev",
        password: "123qweASD",
      }
    }).then((response) => {
      const cookie = response.headers["set-cookie"][0];
      const sid = cookie.split(";")[0].split("=")[1];
      globalSid = sid;
    });
  });

  it("Add a new Car", () => {
    cy.api({
      method: "POST",
      url: "/api/cars",
      headers: {
        Cookie: `sid=${globalSid}`,
      },
      body: {
        carBrandId: 1,
        carModelId: 1,
        mileage: 1,
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.data).to.have.property("brand");
      expect(response.body.data).to.have.property("model");
      myCarId = response.body.data.id;
      cy.log(`Created car with ID: ${myCarId}`);
    });
  });

  it("Create a new fuel expense", () => {
    cy.api({
      method: "POST",
      url: "/api/expenses",
      headers: {
        Cookie: `sid=${globalSid}`,
      },
      body: {
        carId: myCarId,
        reportedAt: currentDate,
        mileage: 10,
        liters: 10,
        totalCost: 10,
        forceMileage: false,
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.property("carId").and.eq(myCarId);
      expenseId = response.body.data.id;
    });
  });

  it("Update fuel expense", () => {
    cy.api({
      method: "PUT",
      url: `/api/expenses/${expenseId}`,
      headers: {
        Cookie: `sid=${globalSid}`,
      },
      body: {
        carId: myCarId,
        reportedAt: currentDate,
        mileage: 11,
        liters: 11,
        totalCost: 11,
        forceMileage: false,
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.property("carId").and.eq(myCarId);
      expect(response.body.data.reportedAt).to.eq(currentDate);
      expect(response.body.data.mileage).to.eq(11);
      expect(response.body.data.liters).to.eq(11);
      expect(response.body.data.totalCost).to.eq(11);
    });
  });

  it("Update expense with invalid expense ID", () => {
    cy.api({
      method: "PUT",
      url: `/api/expenses/${invalidExpenseId}`,
      headers: {
        Cookie: `sid=${globalSid}`,
      },
      body: {
        carId: 1,
        reportedAt: currentDate,
        mileage: 11,
        liters: 11,
        totalCost: 11,
        forceMileage: false,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body.message).to.eq("Expense not found");
    });
  });

  it("Update expense without required fields", () => {
    cy.api({
      method: "PUT",
      url: `/api/expenses/${expenseId}`,
      headers: {
        Cookie: `sid=${globalSid}`,
      },
      body: {
        carId: myCarId,
        reportedAt: currentDate,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.include("Mileage is required");
    });
  });

  it("Update expense with invalid carId type", () => {
    cy.api({
      method: "PUT",
      url: `/api/expenses/${expenseId}`,
      headers: {
        Cookie: `sid=${globalSid}`,
      },
      body: {
        carId: "kek",
        reportedAt: currentDate,
        mileage: "invalid",
        liters: 11,
        totalCost: 11,
        forceMileage: false,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.include("Invalid car id type");
    });
  });

  it("Update expense without auth", () => {
    cy.api({
      method: "PUT",
      url: `/api/expenses/${expenseId}`,
      body: {
        carId: myCarId,
        reportedAt: currentDate,
        mileage: 11,
        liters: 11,
        totalCost: 11,
        forceMileage: false,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.message).to.eq("Not authenticated");
    });
  });

  after(() => {
    cy.api({
      method: "GET",
      url: "/api/cars",
      headers: {
        Cookie: `sid=${globalSid}`,
      },
    }).then((response) => {
      const allCars = response.body.data;
      allCars.forEach((car) => {
        cy.api({
          method: "DELETE",
          url: `/api/cars/${car.id}`,
          headers: {
            Cookie: `sid=${globalSid}`,
          },
        }).then((response) => {
          expect(response.status).eq(200);
        });
      });
    });
  });
});
