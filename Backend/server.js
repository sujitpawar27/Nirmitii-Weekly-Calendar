const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/appointmentsDB', { useNewUrlParser: true, useUnifiedTopology: true });

const appointmentSchema = new mongoose.Schema({
  Subject: String,
  StartTime: Date,
  EndTime: Date,
  Location: String,
  Description: String,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

app.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).send('Server error');
  }
});


app.post('/appointments', async (req, res) => {
  const { Subject, StartTime, EndTime, Location, Description } = req.body;
  const newAppointment = new Appointment({ Subject, StartTime, EndTime, Location, Description });

  try {
    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    console.error('Error saving appointment:', error);
    res.status(500).send('Server error');
  }
});


app.put('/appointments/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedAppointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).send('Server error');
  }
});

app.delete('/appointments/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Appointment.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).send('Server error');
  }
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
