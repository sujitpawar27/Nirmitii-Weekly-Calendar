
import React, { useState, useEffect } from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import axios from 'axios';
import '@syncfusion/ej2-base/styles/material.css';

function Schedular() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/appointments');
        console.log("Fetched Appointments:", response.data); 
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchAppointments();
  }, []);

  //Update Appointment
  const onAppointmentChange = async (event) => {
    if (!event.changedRecords || event.changedRecords.length === 0) {
      console.error("No appointment ID found!");
      return; 
    }
    const updatedAppointment = event.changedRecords[0]; 
    console.log("appointment updated successfully");
    
    try {
      await axios.put(`http://localhost:5000/appointments/${updatedAppointment._id}`, updatedAppointment);
      const updatedList = appointments.map(appt => appt._id === updatedAppointment._id ? updatedAppointment : appt);
      setAppointments(updatedList);
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  //Delete Appointment
  const onAppointmentDelete = async (event) => {
    if (!event.deletedRecords  || event.deletedRecords.length === 0) {
      console.error("No appointment ID found for deletion!");
      return;
    }
    const deletedAppointment = event.deletedRecords[0];
    console.log("Deleted Appointment:", deletedAppointment);

  if (!deletedAppointment._id) {
    console.error("No appointment ID found for deletion!");
    return; 
  }
    try {
      await axios.delete(`http://localhost:5000/appointments/${deletedAppointment._id}`);
      setAppointments(appointments.filter((appt) => appt._id !== deletedAppointment._id));
        console.log("Appointment Deleted Successfully:");
        window.location.reload();
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  //Add Appointment
  const onAppointmentAdd = async (event) => {
    if (!event.addedRecords || event.addedRecords.length === 0) {
      console.error("No added records found!");
      return; 
    }

    const newAppointment = event.addedRecords[0];
    const appointmentData = {
      Subject: newAppointment.Subject,
      StartTime: newAppointment.StartTime,
      EndTime: newAppointment.EndTime,
      Location: newAppointment.Location || '',
      Description: newAppointment.Description || '',
    };

    try {
      const response = await axios.post('http://localhost:5000/appointments', appointmentData);
      setAppointments([...appointments, response.data]);
      console.log("Appointment Created Successfully:", response.data);
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  };

  return (
      <div style={ {marginTop:'50px'}}>
      <h1>Doctor's Appointment Scheduler</h1>
      <ScheduleComponent
        height="650px"
        eventSettings={{ dataSource: appointments }}
        actionComplete={(event) => {
          console.log("Action complete event:", event);

          if (event.requestType === 'eventCreated') {
            if (event.addedRecords && event.addedRecords.length > 0) {
              onAppointmentAdd(event);
            }
          } else if (event.requestType === 'eventChanged') {
            onAppointmentChange(event);
          } else if (event.requestType === 'eventRemoved') {
            onAppointmentDelete(event);
          }
        }}
      >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, DragAndDrop]} />
      </ScheduleComponent>
    </div>
  );
}

export default Schedular;
