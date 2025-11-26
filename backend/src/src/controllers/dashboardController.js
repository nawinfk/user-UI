exports.getStats = async (req, res) => {
    // In a real app, query the DB here.
    // Example: const count = await pool.query('SELECT COUNT(*) FROM users');
    
    res.json([
      { title: "Active Users", value: "1,234", change: "+12%" },
      { title: "Revenue", value: "$45,200", change: "+5%" },
      { title: "System Health", value: "98%", change: "stable" }
    ]);
  };
  
  
  