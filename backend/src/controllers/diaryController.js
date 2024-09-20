const supabase = require('../config/supabaseClient');

const createDiary = async (req, res) => {
  const user_id = req.user.id
  const {  title } = req.body;

  const { error } = await supabase
    .from('Diary')
    .insert({ user_id, title });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json("Diary successfully created");
};


const getDiaries = async (req, res) => {
  const user_id  = req.user.id;

  const { data, error } = await supabase
    .from('Diary')
    .select('*')
    .eq('user_id',user_id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
};

//get all diaries
/*
const getAllDiaries = async (req, res) => {

  const { data, error } = await supabase
    .from('Diary')
    .select('*')

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
};
*/

const deleteDiary = async(req,res) => {
  const {id} = req.params;

  const {error: deleteError} = await supabase
    .from('Diary')
    .delete()
    .eq('id',id)

    if(deleteError){
      return res.status(500).json({ error: deleteError.message });
    }

    res.status(204).json();
};


module.exports = { createDiary, getDiaries,  deleteDiary };