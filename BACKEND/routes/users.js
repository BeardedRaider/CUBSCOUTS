
app.get('/api/users', async (req, res) => {
    try {
      // Extract the token from the request headers
      const token = req.headers.authorization?.split(' ')[1];
  
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
      }
  
      // Verify the token
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }
  
        // The decoded.userId should match the structure used in jwt.sign during login
        const user = await user.findById(decoded.userId);
  
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
  
        // Return data only for the authenticated user
  const formattedUser = {
    _id: user._id,
    name: user.forename,
    email: user.email,
    dob: user.dob,
    address: user.address,
    is_admin: user.role,
    disclosureScotland: user.disclosureScotland,
    helperRegistered: user.helperRegistered,
    helperTrained: user.helperTrained,
    mondayAvailability: user.mondayAvailability,
    tuesdayAvailability: user.tuesdayAvailability,
    wednesdayAvailability: user.wednesdayAvailability,
    thursdayAvailability: user.thursdayAvailability,
    fridayAvailability: user.fridayAvailability,
    saturdayAvailability: user.saturdayAvailability,
    sundayAvailability: user.sundayAvailability,
    child_id: user.child_id, // Assign child_id directly
    parent_id: user.parent_id,// Assign parent_id directly
  };
  
  res.json(formattedUser);
  
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  