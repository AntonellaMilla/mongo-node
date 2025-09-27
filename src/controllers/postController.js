/*
import postService from "../services/postService.js";

class PostController {
    async create(req, res) {
        try {
            const { userId } = req.params;
            const post = await postService.createPost(userId, req.body);
            res.status(201).json(post);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const posts = await postService.getPosts();
            console.log(posts);
            res.render("posts", { posts }); // Renderiza la vista posts/index.ejs
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new PostController();
*/

import postService from "../services/postService.js";

class PostController {
  async create(req, res) {
    try {
      const { userId } = req.body; // Ahora viene desde el form
      const post = await postService.createPost(userId, req.body);
      res.redirect("/posts"); // Después de crear, volver a la lista
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  async getAll(req, res) {
    try {
      const posts = await postService.getPosts();
      res.render("posts", { posts });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async editForm(req, res) {
    try {
      const post = await postService.getPostById(req.params.id);
      res.render("editPost", { post });
    } catch (error) {
      res.status(404).send("Post no encontrado");
    }
  }

  async update(req, res) {
    try {
      await postService.updatePost(req.params.id, req.body);
      res.redirect("/posts");
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  async delete(req, res) {
    try {
      await postService.deletePost(req.params.id);
      res.redirect("/posts");
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

export default new PostController();
