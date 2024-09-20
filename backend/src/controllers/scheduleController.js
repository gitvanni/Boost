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

  res.status(201).json("Schedule creata con successo");
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

//get all schedules
/*
const getAllSchedules = async (req, res) => {

  const { data, error } = await supabase
    .from('Schedule')
    .select('*')

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
};
*/

const deleteSchedule = async(req,res) => {
  const {id} = req.params;

 /* const { data: list, error: fetchError } = await supabase
  .from('Schedule')
  .select('*')
  .eq('id', id)
  .eq('user_id', user_id)
  .single();

if (fetchError) {
  return res.status(404).json({ error: 'List not found or does not belong to the user' });
}
  */

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
