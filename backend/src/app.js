const express = require('express');
const dotenv= require('dotenv');
const scheduleRoutes = require('./routes/scheduleRoutes');
const taskRoutes = require('./routes/taskRoutes');
const diaryRoutes = require('./routes/diaryRoutes');
const pageRoutes = require('./routes/pageRoutes');
const authRoues = require('./routes/loginRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/schedules',scheduleRoutes)

app.use('/api/schedules',taskRoutes);

app.use('/api/diary',diaryRoutes)

app.use('/api/diary',pageRoutes)

app.use('/api/auth',authRoues)



module.exports = app;