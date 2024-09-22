const supabase = require('../config/supabaseClient');

const createSchedule = async (req, res) => {
  const user_id = req.user.id
  const { name } = req.body;

  const { error } = await supabase
    .from('Schedule')
    .insert({ name, user_id });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({message:"Schedule successfully created"});
};


const getSchedules = async (req, res) => {
  const user_id = req.user.id;

  const { data, error } = await supabase
    .from('Schedule')
    .select('*')
    .eq('user_id',user_id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
};


const deleteSchedule = async(req,res) => {
  const {id} = req.params;

  const {error: deleteError} = await supabase
    .from('Schedule')
    .delete()
    .eq('id',id)

    if(deleteError){
      return res.status(500).json({ error: deleteError.message });
    }

    res.status(204).json();
};


module.exports = { createSchedule, getSchedules, deleteSchedule };
