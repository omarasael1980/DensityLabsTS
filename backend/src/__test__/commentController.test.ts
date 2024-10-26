import request from "supertest";
import app from "../server";
import { prisma } from "../prismaClient";
//region createComment
describe("createComment", () => {
  it("should create a new comment", async () => {
    const response = await request(app).post("/api/comments").send({
      comment: "this is a test comment",
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
    const response = await request(app).put("/api/comments/1").send({
      comment: "this is an updated comment",
      email: "email@uptadtes.com",
    });
    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Comment updated");
    expect(response.body.error).toBe(false);
  });
  it("should return an error if the comment doesn't exist", async () => {
    const response = await request(app).put("/api/comments/100").send({
      comment: "this is an updated comment",
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
//region createReply
//create a comment to reply to a comment

describe("createReply", () => {
  it("should create a reply", async () => {
    const comment = await prisma.comments.create({
      data: {
        comment: "this is a test comment to reply to",
        email: "omar@es.com",
      },
    });
    const response = await request(app).post("/api/comments/replies").send({
      reply: "this is a reply to the comment",
      email: "a@c.com",
      id: comment.id,
    });
    expect(response.status).toBe(201);
    expect(response.body.title).toBe("Reply created");
    expect(response.body.error).toBe(false);
  });
  it("should return an error if the email or reply is empty", async () => {
    const comment = await prisma.comments.create({
      data: {
        comment: "this is a test comment to reply to",
        email: "omar@es.com",
      },
    });
    const response = await request(app).post("/api/comments/replies").send({
      reply: "",
      email: "",
      id: comment.id,
    });
    expect(response.status).toBe(400);
    expect(response.body.title).toBe("Bad request");
    expect(response.body.msg).toBe("All fields are required");
    expect(response.body.error).toBe(true);
  });
  it("should return an error if the comment doesn't exist", async () => {
    const response = await request(app).post("/api/comments/replies").send({
      reply: "this is a reply to the comment",
      email: "anything@s.com",
      id: 100,
    });
    expect(response.status).toBe(404);
    expect(response.body.title).toBe("Not found");
    expect(response.body.msg).toBe("Comment not found");
    expect(response.body.error).toBe(true);
  });
});
//region findReply
describe("findReply", () => {
  it("should return a reply by id", async () => {
    const response = await request(app).get("/api/comments/replies/1");
    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Reply found");
    expect(response.body.error).toBe(false);
  });
  it("should return an error if the reply doesn't exist", async () => {
    const response = await request(app).get("/api/comments/replies/100");
    expect(response.status).toBe(404);
    expect(response.body.title).toBe("Not found");
    expect(response.body.msg).toBe("Reply not found");
    expect(response.body.error).toBe(true);
  });
});
//region updateReply
describe("updateReply", () => {
  it("should update a reply", async () => {
    const response = await request(app).put("/api/comments/replies/1").send({
      reply: "This is an updated reply",
      email: "updated@mail.com",
    });
    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Reply updated");
    expect(response.body.error).toBe(false);
  });
  it("should return an error if the reply doesn't exist", async () => {
    const response = await request(app).put("/api/comments/replies/100").send({
      reply: "This is an updated reply",
      email: "anything@something.com",
      id: 100,
    });
    expect(response.status).toBe(404);
    expect(response.body.title).toBe("Not found");
    expect(response.body.msg).toBe("Reply not found");
    expect(response.body.error).toBe(true);
  });
});
//region deleteReply
describe("deleteReply", () => {
  it("should delete a reply", async () => {
    const response = await request(app).delete("/api/comments/replies/1");
    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Reply deleted");
    expect(response.body.error).toBe(false);
  });
  it("should return an error if the reply doesn't exist", async () => {
    const response = await request(app).delete("/api/comments/replies/100");
    expect(response.status).toBe(404);
    expect(response.body.title).toBe("Not found");
    expect(response.body.msg).toBe("Reply not found");
    expect(response.body.error).toBe(true);
  });
});
//region server
describe("API Server", () => {
  it("should respond with a message on the root endpoint", async () => {
    const response = await request(app).get("/api/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("¡Server with TS working!");
  });

  // Aquí puedes añadir más pruebas para tus rutas de comentarios
  describe("Comments Routes", () => {
    it("should return a 404 for unknown routes", async () => {
      const response = await request(app).get("/api/unknown");
      expect(response.status).toBe(404);
    });

    // Asegúrate de incluir las pruebas para las rutas específicas de comentarios
  });
});
//region restartDatabase
afterAll(async () => {
  //Delete all the comments and replies from the database
  await prisma.comments.deleteMany();
  await prisma.reply.deleteMany();
  //restart the autoincrement of the id
  await prisma.$executeRaw`ALTER TABLE comments AUTO_INCREMENT =1;`;
  await prisma.$executeRaw`ALTER TABLE reply AUTO_INCREMENT =1;`;
  //close the database connection
  await prisma.$disconnect();
});
