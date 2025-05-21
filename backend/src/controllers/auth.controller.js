export const signup = (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    res.send("Signup Page");
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).send("Internal Server Error");
    
  }
};

export const login = (req, res) => {
  res.send("Login Page");
};

export const logout = (req, res) => {
  res.send("Logout Page");
};


