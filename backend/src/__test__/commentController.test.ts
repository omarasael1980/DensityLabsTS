import request from "supertest";
import app from "../server";

describe("createComment", () => {
  //region createComment
  it("should create a new comment", async () => {
    const response = await request(app).post("/api/comments").send({
      comment: "Este es un comentario de prueba dos",
      email: "Omar@algo.com",
    });
    expect(response.status).toBe(201);
    expect(response.body.title).toBe("Comment created");
    expect(response.body.error).toBe(false);
  });

  it("should return an error if the comment is empty", async () => {
    const response = await request(app).post("/api/comments").send({
      comment: "",
      email: "",
    });
    expect(response.status).toBe(400);
    expect(response.body.title).toBe("Bad request");
    expect(response.body.msg).toBe("All fields are required");
    expect(response.body.error).toBe(true);
  });
});
//region getAllComments
describe("getAllComments", () => {
  it("should return all comments", async () => {
    const response = await request(app).get("/api/comments");
    expect(response.status).toBe(200);
    expect(response.body.title).toBe("All comments");
    expect(response.body.error).toBe(false);
  });
});
//region updateComment
describe("updateComment", () => {
  it("should update a comment", async () => {
    const response = await request(app).put("/api/comments/3").send({
      comment: "Este es un comentario de prueba actualizado",
      email: "email@cambiado.com",
    });
    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Comment updated");
    expect(response.body.error).toBe(false);
  });
  it("should return an error if the comment doesn't exist", async () => {
    const response = await request(app).put("/api/comments/100").send({
      comment: "Este es un comentario de prueba actualizado",
    });
    expect(response.status).toBe(404);
    expect(response.body.title).toBe("Not found");
    expect(response.body.msg).toBe("Comment not found");
    expect(response.body.error).toBe(true);
  });
  it("should return an error if the comment is empty", async () => {
    const response = await request(app).put("/api/comments/1").send({
      comment: "",
    });
    expect(response.status).toBe(400);
    expect(response.body.title).toBe("Bad request");
    expect(response.body.msg).toBe("All fields are required");
    expect(response.body.error).toBe(true);
  });
});
//region deleteComment
describe("deleteComment", () => {
  it("should delete a comment", async () => {
    const response = await request(app).delete("/api/comments/1");
    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Comment deleted");
    expect(response.body.error).toBe(false);
  });
  it("should return an error if the comment doesn't exist", async () => {
    const response = await request(app).delete("/api/comments/100");
    expect(response.status).toBe(404);
    expect(response.body.title).toBe("Not found");
    expect(response.body.msg).toBe("Comment not found");
    expect(response.body.error).toBe(true);
  });
});
