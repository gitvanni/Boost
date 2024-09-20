const supabase = require('../config/supabaseClient');

async function authenticateToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
  
    try {
      const { data, error } = await supabase.auth.getUser(token);
  
      if (error) {
        return res.status(401).json({ message: 'Invalid token' });
      }
  
      req.user = data.user; // Attach the user info to the request
      next();
    } catch (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }
  }

  module.exports = {authenticateToken}