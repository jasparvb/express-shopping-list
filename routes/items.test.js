process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
let items = require("../fakeDb")

let item = { name: "candy", price: 3.00 }

beforeEach(async () => {
  items.push(item)
});

afterEach(async () => {
  items = []
});

/** GET all items */

describe("GET /items", function () {
  test("Returns list of items", async function () {
    const res = await request(app).get(`/items`);
    const { items } = res.body;
    expect(res.statusCode).toBe(200);
    expect(items).toHaveLength(1);
  });
});
// end


/** GET item by name */

describe("GET /items/:name", function () {
  test("Gets a single item", async function () {
    const res = await request(app).get(`/items/${item.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.item).toEqual(item);
  });

  test("Responds with 404 if can't find item", async function () {
    const res = await request(app).get(`/items/dsfdss`);
    expect(res.statusCode).toBe(404);
  });
});


/** POST create new item */

describe("POST /items", function () {
  test("Creates a new item", async function () {
    const res = await request(app).post(`/items`).send({name: "Pizza", price: 2.00});
    expect(res.statusCode).toBe(200);
    expect(res.body.added).toHaveProperty("name");
    expect(res.body.added).toHaveProperty("price");
    expect(res.body.added.name).toEqual("Pizza");
    expect(res.body.added.price).toEqual(2.00);
  });
});
// end


/** PATCH update an item by name */

describe("PATCH /items/:name", function () {
  test("Updates a single item", async function () {
    const res = await request(app).patch(`/items/${item.name}`).send({name: "Pasta", price: 3.00});
    expect(res.statusCode).toBe(200);
    expect(res.body.updated.item).toEqual({name: "Pasta", price: 3.00});
  });

  test("Responds with 404 if can't find item", async function () {
    const res = await request(app).patch(`/items/dsfdss`);
    expect(res.statusCode).toBe(404);
  });
});
// end


/** DELETE delete an item by name */

describe("DELETE /items/:name", function () {
  test("Deletes a single a item", async function () {
    const res = await request(app).delete(`/items/${item.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Deleted" });
  });
});

