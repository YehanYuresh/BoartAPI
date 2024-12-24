const userModel = require('../models/userModel');


const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.findAll();

    const respose = {
      status: "success", 
            data: users,
            result: users.length > 0 ? "Data fetched successfully" : "No data available"
        };
        res.json(respose);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserByName = async (req, res) => {
  try {
    const { name } = req.body; 
   
    if (!name) {
      return res.status(400).json({
        status: 'error',
        message: 'Name is required',
        data: null
      });
    }

    console.log(name);  
    const user = await userModel.findByName(name); // Adjust the query as per your schema
   // console.log(user);  
    if (user) {
      // If the user is found, respond with success
      const response = {
        status: 'success',
        data: user,
        result: 'User data fetched successfully'
      };
      res.json(response);
    } else {
      // If no user is found, respond with an appropriate message
      res.status(404).json({
        status: 'error',
        message: 'User not found',
        data: null
      });
    }
  } catch (error) {
    // Handle unexpected errors
    res.status(500).json({
      status: 'error',
      message: 'An internal server error occurred',
      error: error.message
    });
  }
};


// const getUserByName = async (req, res) => {
//   try {
//     const {name } = req.body; // Extract the 'name' parameter from the URL

//     if (!name) {
//         return res.status(400).json({
//             status: 'error',
//             message: 'Name is required',
//             data: null
//         });
//     }

//     const user = await userModel.findById(req.body.name);
//     if (user) {
//       const respose = {
//         status: "success", 
//               data: users,
//               result: users.length > 0 ? "Data fetched successfully" : "No data available"
//           };
//         res.json(respose);
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const createUser = async (req, res) => {
  try {
    const user = await userModel.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updated = await userModel.update(req.params.id, req.body);
    if (updated) {
      res.json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleted = await userModel.delete(req.params.id);
    if (deleted) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByName
};