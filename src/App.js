// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/App.css';
import './style/header.css';
import './style/footer.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Step1Welcome from './components/Step1Welcome';
import Step2League from './components/Step2League';
import Step5PersInfo from './components/Step5PersInfo';
import Step4RegioSchool from './components/Step4RegioSchool';
import Step3RegioThuis from './components/Step3RegioThuis';
import Step6Confirmation from './components/Step6Confirmation';
import Step7Thanks from './components/Step7Thanks';
import { RegistrationProvider } from './utils/RegistrationContext';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBaseball } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';


library.add(faBaseball); // Voeg het honkbal-icoon toe aan de bibliotheek

const stepTitles = [
  "Start",
  "League",
  "Regio",
  "School",
  "N.a.w info",
    "Bevestiging",
  "Bedankt"
];

const AppContent = ({ currentDate, openDate, closeDate }) => {
  const location = useLocation(); // Correct usage of useLocation to handle location updates

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header steps={stepTitles} currentDate={currentDate} openDate={openDate} closeDate={closeDate} />
      <main className="flex-grow-1">
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="fade" timeout={300}>
            <Routes location={location}>
              <Route path="/" element={<Step1Welcome currentDate={currentDate} openDate={openDate} closeDate={closeDate} />} />
              <Route path="/step-2" element={<Step2League />} />
              <Route path="/step-3" element={<Step3RegioThuis/>} />
              <Route path="/step-4" element={<Step4RegioSchool/>} />
              <Route path="/step-5" element={<Step5PersInfo currentDate={currentDate} openDate={openDate} closeDate={closeDate} />} />
              <Route path="/step-6" element={<Step6Confirmation />} />
              <Route path="/step-7" element={<Step7Thanks />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [openDate, setOpenDate] = useState('2025-09-01'); // Example open date
  const [closeDate, setCloseDate] = useState('2026-03-01'); // Example close date

  return (
    <RegistrationProvider>
      <Router>
        <AppContent currentDate={currentDate} openDate={openDate} closeDate={closeDate} />
      </Router>
    </RegistrationProvider>
  );
};

export default App;
