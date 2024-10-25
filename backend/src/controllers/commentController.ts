import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

//region createComment
/**
 * This controller will receive a comment and an email to create a new comment
 */
export const createComment = async (req: Request, res: Response) => {
  try {
    //console.log(req.body);
    const { comment, email } = req.body as { comment: string; email: string };

    if (!comment || !email || comment === "" || email === "") {
      res.status(400).json({
        msg: "All fields are required",
        title: "Bad request",
        error: true,
      });
    } else {
      const newComment = await prisma.comments.create({
        data: { comment, email },
      });

      res
        .status(201)
        .json({ msg: newComment, title: "Comment created", error: false });
    }
  } catch (error) {
    res.status(500).json({
      msg: (error as Error).message,
      title: "Internal server error",
      error: true,
    });
  }
};

//region getAllComments
/**
 * This controller will  all comments with their replies
 */
export const getAllComments = async (req: Request, res: Response) => {
  try {
    const comments = await prisma.comments.findMany({
      include: {
        replies: {
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      msg: comments,
      title: "All comments",
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      msg: (error as Error).message,
      title: "Internal server error",
      error: true,
    });
  }
};

//region updateComment
/**
 * This controller will update a comment by id
 */
export const updateComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const commentExist = await prisma.comments.findUnique({
      where: { id: parseInt(id) },
    });

    if (!commentExist) {
      res.status(404).json({
        msg: "Comment not found",
        title: "Not found",
        error: true,
      });
    } else {
      const { comment, email } = req.body as { comment: string; email: string };

      if (!comment || !email || comment === "" || email === "") {
        res.status(400).json({
          msg: "All fields are required",
          title: "Bad request",
          error: true,
        });
      } else {
        const updatedComment = await prisma.comments.update({
          where: { id: parseInt(id) },
          data: { comment, email },
        });

        res.status(200).json({
          msg: updatedComment,
          title: "Comment updated",
          error: false,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      msg: (error as Error).message,
      title: "Internal server error",
      error: true,
    });
  }
};

//region deleteComment
/**
 * This controller will delete a comment by id
 */
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const comment = await prisma.comments.findUnique({
      where: { id: parseInt(id) },
    });

    if (!comment) {
      res.status(404).json({
        msg: "Comment not found",
        title: "Not found",
        error: true,
      });
    } else {
      await prisma.comments.delete({
        where: { id: parseInt(id) },
      });

      res.status(200).json({
        msg: "Comment deleted",
        title: "Comment deleted",
        error: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: (error as Error).message,
      title: "Internal server error",
      error: true,
    });
  }
};

//region createReply
/**
 * This controller will receive a comment id, email, and reply to create a new reply
 */
export const createReply = async (req: Request, res: Response) => {
  try {
    const { id, email, reply } = req.body as {
      id: string;
      email: string;
      reply: string;
    };

    if (!id || !email || !reply || email === "" || reply === "") {
      res.status(400).json({
        msg: "All fields are required",
        title: "Bad request",
        error: true,
      });
    }

    const commentExist = await prisma.comments.findUnique({
      where: { id: parseInt(id) },
    });

    if (!commentExist) {
      res.status(404).json({
        msg: "Comment not found",
        title: "Not found",
        error: true,
      });
    }

    const newReply = await prisma.reply.create({
      data: { email, reply, commentId: parseInt(id) },
    });

    res.status(201).json({
      msg: newReply,
      title: "Reply created",
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      msg: (error as Error).message,
      title: "Internal server error",
      error: true,
    });
  }
};
//region find a Reply by id
/**
 * Controller to find a reply by ID from params.
 */
export const findReply = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const reply = await prisma.reply.findUnique({
      where: { id: parseInt(id) },
    });

    if (!reply) {
      res.status(404).json({
        msg: "Reply not found",
        title: "Not found",
        error: true,
      });
    }

    res.status(200).json({
      msg: reply,
      title: "Reply found",
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      msg: (error as Error).message,
      title: "Internal server error",
      error: true,
    });
  }
};

//region update a reply
/**
 * Controller to update a reply by ID. Receives ID from params and updated data from body.
 */
export const updateReply = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email, reply } = req.body;

    // Check if all fields are provided
    if (!email || !reply || email === "" || reply === "") {
      res.status(400).json({
        msg: "All fields are required",
        title: "Bad request",
        error: true,
      });
    }

    // Check if reply exists
    const replyExist = await prisma.reply.findUnique({
      where: { id: parseInt(id) },
    });

    if (!replyExist) {
      res.status(404).json({
        msg: "Reply not found",
        title: "Not found",
        error: true,
      });
    }

    // Update reply
    const updatedReply = await prisma.reply.update({
      where: { id: parseInt(id) },
      data: { email, reply },
    });

    res.status(200).json({
      msg: updatedReply,
      title: "Reply updated",
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      msg: (error as Error).message,
      title: "Internal server error",
      error: true,
    });
  }
};

//region delete a reply
/**
 * Controller to delete a reply by ID from params.
 */
export const deleteReply = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const reply = await prisma.reply.findUnique({
      where: { id: parseInt(id) },
    });

    if (!reply) {
      res.status(404).json({
        msg: "Reply not found",
        title: "Not found",
        error: true,
      });
    }

    await prisma.reply.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      msg: "Reply deleted successfully",
      title: "Reply deleted",
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      msg: (error as Error).message,
      title: "Internal server error",
      error: true,
    });
  }
};
