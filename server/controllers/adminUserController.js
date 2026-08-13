
import User from "../models/User.js";

// ==========================
// GET ALL USERS - ADMIN
// ==========================

export const getAllUsers = async (req, res) => {
  try {

    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });


    res.status(200).json({

      message: "Users fetched successfully",

      users,

    });


  } catch (error) {

    console.error(
      "Get All Users Error:",
      error
    );


    res.status(500).json({

      message: "Server error",

      error: error.message,

    });

  }
};


// ==========================
// GET SINGLE USER - ADMIN
// ==========================

export const getSingleUser = async (req, res) => {
  try {

    const { id } = req.params;


    const user = await User.findById(id)
      .select("-password");


    if (!user) {

      return res.status(404).json({

        message: "User not found",

      });

    }


    res.status(200).json({

      message: "User fetched successfully",

      user,

    });


  } catch (error) {

    console.error(
      "Get Single User Error:",
      error
    );


    if (error.name === "CastError") {

      return res.status(400).json({

        message: "Invalid user ID",

      });

    }


    res.status(500).json({

      message: "Server error",

      error: error.message,

    });

  }
};


// ==========================
// UPDATE USER ROLE - ADMIN
// ==========================

export const updateUserRole = async (req, res) => {
  try {

    const { id } = req.params;

    const { role } = req.body;


    // ==========================
    // VALID ROLE
    // ==========================

    const validRoles = [
      "user",
      "admin",
    ];


    if (!validRoles.includes(role)) {

      return res.status(400).json({

        message: "Invalid role",

      });

    }


    // ==========================
    // FIND USER
    // ==========================

    const user = await User.findById(id);


    if (!user) {

      return res.status(404).json({

        message: "User not found",

      });

    }


    // ==========================
    // UPDATE ROLE
    // ==========================

    user.role = role;


    await user.save();


    res.status(200).json({

      message: "User role updated successfully",

      user: {

        _id: user._id,

        name: user.name,

        email: user.email,

        role: user.role,

      },

    });


  } catch (error) {

    console.error(
      "Update User Role Error:",
      error
    );


    if (error.name === "CastError") {

      return res.status(400).json({

        message: "Invalid user ID",

      });

    }


    res.status(500).json({

      message: "Server error",

      error: error.message,

    });

  }
};


// ==========================
// DELETE USER - ADMIN
// ==========================

export const deleteUser = async (req, res) => {
  try {

    const { id } = req.params;


    // ==========================
    // FIND USER
    // ==========================

    const user = await User.findById(id);


    if (!user) {

      return res.status(404).json({

        message: "User not found",

      });

    }


    // ==========================
    // PREVENT SELF DELETE
    // ==========================

    if (
      user._id.toString() ===
      req.user._id.toString()
    ) {

      return res.status(400).json({

        message: "You cannot delete your own account",

      });

    }


    // ==========================
    // DELETE USER
    // ==========================

    await User.findByIdAndDelete(id);


    res.status(200).json({

      message: "User deleted successfully",

    });


  } catch (error) {

    console.error(
      "Delete User Error:",
      error
    );


    if (error.name === "CastError") {

      return res.status(400).json({

        message: "Invalid user ID",

      });

    }


    res.status(500).json({

      message: "Server error",

      error: error.message,

    });

  }
};

