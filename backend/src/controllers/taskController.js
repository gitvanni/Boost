const supabase = require('../config/supabaseClient');

const createTask = async (req, res) => {
  const{schedule_id} = req.params
  const { description } = req.body;

  const { error } = await supabase
    .from('Tasks')
    .insert({ description, schedule_id });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({message:"Task successfully created!"});
};


const getTasks = async (req, res) => {
  const { schedule_id } = req.params;

  const { data, error } = await supabase
    .from('Tasks')
    .select('*')
    .eq('schedule_id', schedule_id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
};


const deleteTask = async (req, res) => {
  const { schedule_id,task_id } = req.params;

  const { error } = await supabase
    .from('Tasks')
    .delete()
    .eq('schedule_id', schedule_id)
    .eq('id',task_id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(204).json();
};


const updateTask = async (req,res) => {
  const { schedule_id,task_id } = req.params;
  const {update} = req.query;
  if(update === 'status'){
    const { is_completed } = req.body;

    const{error} = await supabase
    .from('Tasks')
    .update({ is_completed })
    .eq('schedule_id',schedule_id)
    .eq('id', task_id);

    if(error) {
      return res.status(500).json({ error: error.message });
    }
  
    res.status(200).json({message: "Task status updated!"});
  }

  if(update==='content'){
    const { description} = req.body;

    const{data,error} = await supabase
    .from('Tasks')
    .update({description})
    .eq('schedule_id',schedule_id)
    .eq('id',task_id)
    .select();

    if(error) {
      return res.status(500).json({ error: error.message });
    }
  
    res.status(200).json({message:"Task updated!"});

  }
  
  
}

module.exports = { createTask, getTasks, deleteTask, updateTask };
