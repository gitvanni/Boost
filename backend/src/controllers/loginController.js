const supabase = require('../config/supabaseClient');


const createUser = async (req, res) => {
    const{email, password} = req.body;
    const { error } = await supabase.auth.signUp({email, password});
  
    if (error) {return res.status(500).json({ error: error.message });}
  
     return res.status(201).json({messagge: "Account created!"});
  };


  const signInUser = async (req, res) => {
    const{email, password} = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({email,password});
  
    if (error) {return res.status(500).json({ error: error.message })};
  
     return res.status(200).json({token: data.session.access_token }); 
  };


  const signOutUser = async(req, res) =>{
    const { error } = await supabase.auth.signOut();

    if(error){return res.status(500).json({ error: error.message })};

    return res.status(200).json({messagge: "Sign out successful"});
  }

  module.exports = {signInUser,createUser, signOutUser};


    