const supabase = require('../config/supabaseClient');

// Create a new task in a schedule
const createTask = async (req, res) => {
  const{schedule_id} = req.params
  const { description } = req.body;

  const { error } = await supabase
    .from('Tasks')
    .insert({ description, schedule_id });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json("Task creata con successo!");
};

// Get all tasks in a specific schedule
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

const getTask = async (req,res) => {
  const  { schedule_id, task_id } = req.params;

  const { data, error } = await supabase
    .from('Tasks')
    .select()
    .eq('schedule_id', schedule_id)
    .eq('id',task_id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
}


// Delete a task
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

//non bellissimo così, pero funziona...
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
  
    res.status(201).json("Stato della task aggiornata!");
  }

  if(update==='content'){
    const { description} = req.body;

    const{data,error} = await supabase
    .from('Tasks')
    .update({description})
    .eq('schedule_id',schedule_id)
    .eq('id',task_id)
    .select();

    console.log(data);
    if(error) {
      return res.status(500).json({ error: error.message });
    }
  
    res.status(201).json("Task aggiornata!");

  }
  
  
}

module.exports = { createTask, getTasks, getTask, deleteTask, updateTask };
