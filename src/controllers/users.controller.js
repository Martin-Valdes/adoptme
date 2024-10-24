import { UserServices } from "../services/user.services.js";

export class UserControllers {
  constructor() {
    this.userServices = new UserServices();
  }

  createUserMock = async (req, res, error) => {
    try {
      const users = await this.userServices.createMocks();
      res.status(201).json({ status: "ok", users });
    } catch (error) {
      next(error)
    }
  };

  getAllUsers = async (req, res, next) => {
    try {
      const users = await this.userServices.getAll();
      res.send({ status: "success", payload: users });
    } catch (error) {
      next(error);
    }
  };

  getUser = async (req, res, next) => {
    try {
      const userId = req.params.uid;
      const user = await this.userServices.getById(userId);
      res.send({ status: "success", payload: user });
    } catch (error) {
      console.log(`Error: ${error.message}`);
      next(error);
    }
  };

  updateUser = async (req, res, next) => {
    try {
      const updateBody = req.body;
      const userId = req.params.uid;
      const user = await this.userServices.getById(userId);
      if (!user) return res.status(404).send({ status: "error", error: "User not found" });
      const result = await this.userServices.update(userId, updateBody);
      res.status(201).json({ status: "success", payload: result });
      
    } catch (error) {
      next(error)
    }
  };

  deleteUser = async (req, res) => {
    try {
      const userId = req.params.uid;
      const result = await this.userServices.remove(userId);
      res.send({ status: "success", message: "User deleted" });
    } catch (error) {
      next(error)
    }
  };

  postUser = async (req, res, next ) => {
    try {
      const dataUser = req.body;
      const user = await this.userServices.create(dataUser);
      res.status(201).json({ status: "sucess", payload: user })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}
