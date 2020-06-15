process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
let items = require("../fakeDb")

let item = { name: "peanut butter", price:3.00 }

beforeEach(async () => {
  items.push(item)
});

afterEach(async () => {
  items = []
});

/** GET all items */

describe("GET /items", async function () {
  test("Returns list of items", async function () {
    const res = await request(app).get(`/items`);
    const { items } = res.body;
    expect(res.statusCode).toBe(200);
    expect(items).toHaveLength(1);
  });
});
// end


/** GET item by name */

describe("GET /items/:name", async function () {
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
// end


/** POST create new item */

describe("POST /items", async function () {
  test("Creates a new item", async function () {
    const res = await request(app).post(`/items`).send({name: "Pizza", price: 2.00});
    expect(res.statusCode).toBe(200);
    expect(res.body.item).toHaveProperty("name");
    expect(res.body.item).toHaveProperty("price");
    expect(res.body.item.name).toEqual("Pizza");
    expect(res.body.item.price).toEqual(2.00);
  });
});
// end


/** PATCH update an item by name */

describe("PATCH /items/:name", async function () {
  test("Updates a single item", async function () {
    const res = await request(app).patch(`/items/${item.name}`).send({name: "Troll"});
    expect(res.statusCode).toBe(200);
    expect(res.body.item).toEqual({name: "Troll"});
  });

  test("Responds with 404 if can't find item", async function () {
    const res = await request(app).patch(`/items/dsfdss`);
    expect(res.statusCode).toBe(404);
  });
});
// end


/** DELETE delete an item by name */

describe("DELETE /items/:name", async function () {
  test("Deletes a single a item", async function () {
    const res = await request(app).delete(`/items/${item.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Deleted" });
  });
});

