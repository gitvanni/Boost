const supabase = require('../config/supabaseClient');

// Create a new page in a diary
const createPage = async (req, res) => {
  const{diary_id} = req.params
  const { date, content } = req.body;

  const { error } = await supabase
    .from('Page')
    .insert({ user_id, diary_id, date, content })

  if (error) {
    return res.status(500).json({ error: error.message });
  }

   res.status(201).json("Page successfully created!");
};

// Get all pages in a specific diary
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

const getMonthRange = (year, month) => {
    const startDate = new Date(year, month - 1, 1).toISOString().split('T')[0];
    const endDate = new Date(year, month, 0).toISOString().split('T')[0];
    return { startDate, endDate };
  };

  
//get a page if date is specified in request query, otherwise get all pages
const getPages = async (req,res) => {
    const{diary_id} = req.params;
    const { date, month, year } = req.query;

  try {
    let data, error;

    if (date) {
      // Fetch page by exact date
      ({ data, error } = await supabase
        .from('Page')
        .select('*')
        .eq('diary_id',diary_id)
        .eq('date', date));

    } else if (month && year) {
      // Fetch pages by specific month and year
      const { startDate, endDate } = getMonthRange(year, month);
      ({ data, error } = await supabase
        .from('Page')
        .select('*')
        .eq('diary_id',diary_id)
        .gte('date', startDate)
        .lte('date', endDate));

    } else if (year) {
      // Fetch pages by specific year
      const startDate = `${year}-01-01`;
      const endDate = `${year}-12-31`;
      ({ data, error } = await supabase
        .from('Page')
        .select('*')
        .eq('diary_id',diary_id)
        .gte('date', startDate)
        .lte('date', endDate));

    } else {
      // Fetch all pages if no specific filter is provided
      ({ data, error } = await supabase
        .from('Page')
        .select('*')
        .eq('diary_id',diary_id));
    }

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: 'No pages found' });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
  /*const  { diary_id } = req.params;
  const {date} = req.query;
  if(!date){
    const { data, error } = await supabase
    .from('Page')
    .select('*')
    .eq('diary_id', diary_id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
    return res.status(400).json({ error: 'Date parameter is required' });   
  }else{
    const { data, error } = await supabase
    .from('Page')
    .select('*')
    .eq('diary_id', diary_id)
    .eq('date',date);

    if(data.length===0){
        return res.status(400).json("No record available for this date");
    }
  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
  }

}*/


// Deletes a page
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
  
    res.status(201).json("Page successfully updated!"); 
}

module.exports = { createPage, getPages, getPage, deletePage, updatePage };