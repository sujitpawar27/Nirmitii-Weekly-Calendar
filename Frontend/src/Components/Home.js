import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    const styles = {
        container: {
          textAlign: 'center',
            paddingTop: '50px',
          marginTop:'90px',
        },
        heading: {
          fontSize: '2rem',
          marginBottom: '40px',
        },
        buttonContainer: {
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
        },
        button: {
          padding: '10px 20px',
          fontSize: '1rem',
          cursor: 'pointer',
        }
      };
      
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Appointment Management System</h1>
      <div style={styles.buttonContainer}>
        <Link to="/scheduler">
          <button style={styles.button}>Open Calender</button>
        </Link>
        <Link to="/summary">
          <button style={styles.button}>Appointments List</button>
        </Link>
      </div>
    </div>
  );
}


export default Home;
