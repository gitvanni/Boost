const supabase = require('../config/supabaseClient');

const createPage = async (req, res) => {
  const{diary_id} = req.params
  const { date, content } = req.body;

  const { error } = await supabase
    .from('Page')
    .insert({ diary_id, date, content })

  if (error) {
    return res.status(500).json({ error: error.message });
  }

   res.status(201).json({message: "Page successfully created!"});
};

const getPage = async (req, res) => {
  const { diary_id } = req.params;

  const { data, error } = await supabase
    .from('Page')
    .select('*')
    .eq('diary_id', diary_id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
};


const deletePage = async (req, res) => {
  const { diary_id,page_id } = req.params;

  const { error } = await supabase
    .from('Page')
    .delete()
    .eq('diary_id', diary_id)
    .eq('id',page_id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(204).json();
};


const updatePage = async (req,res) => {
  const { diary_id,page_id } = req.params;    
  const { content} = req.body;

  const{error} = await supabase
    .from('Page')
    .update({content})
    .eq('diary_id',diary_id)
    .eq('id',page_id)

    if(error) {
      return res.status(500).json({ error: error.message });
    }
  
    res.status(200).json({message: "Page successfully updated!"}); 
}

module.exports = { createPage, getPage, deletePage, updatePage };