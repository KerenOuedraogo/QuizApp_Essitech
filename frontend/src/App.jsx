import { useState, useEffect } from 'react';

function App() {
  const [step, setStep] = useState('home');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userChoices, setUserChoices] = useState({});
  const [finalScore, setFinalScore] = useState("");

  const startQuiz = () => {
    fetch('http://localhost:8080/api/quiz')
      .then(res => res.json())
      .then(data => {
        setQuestions(data);
        setStep('quiz');
      })
      .catch(err => alert("Erreur : Vérifie que le Backend Java est lancé !"));
  };

  const selectResponse = (questionId, responseText) => {
    setUserChoices({ ...userChoices, [questionId]: responseText });
  };

  const submitQuiz = () => {
    fetch('http://localhost:8080/api/quiz/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userChoices)
    })
    .then(res => res.text())
    .then(scoreText => {
      setFinalScore(scoreText);
      setStep('result');
    });
  };

  // --- STYLES POUR LE CENTRAGE PARFAIT ---
  const screenContainer = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#f0f2f5', // Fond de page gris très clair
    margin: 0,
    padding: 0,
    fontFamily: 'Arial, sans-serif'
  };

  const whiteCard = {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '550px', // Largeur de la zone centrale
    textAlign: 'center',
    boxSizing: 'border-box'
  };

  const questionTitleStyle = {
    color: '#000000', // Noir pur pour la question
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '25px',
    textAlign: 'left'
  };

  const answerOptionStyle = (isSelected) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    margin: '10px 0',
    borderRadius: '8px',
    border: '2px solid',
    borderColor: isSelected ? '#3498db' : '#ecf0f1',
    backgroundColor: isSelected ? '#ebf5fb' : '#ffffff',
    cursor: 'pointer',
    textAlign: 'left',
    color: '#000000', // Noir pur pour les réponses
    fontSize: '16px',
    transition: '0.2s'
  });

  // --- ECRAN 1 : ACCUEIL ---
  if (step === 'home') {
    return (
      <div style={screenContainer}>
        <div style={whiteCard}>
          <h1 style={{ color: '#2c3e50', fontSize: '32px' }}>QuizApp - Essitech</h1>
          <p style={{ color: '#444', marginBottom: '30px', fontSize: '18px' }}>Évaluation pour le stage de sélection.</p>
          <button onClick={startQuiz} style={{ padding: '15px 40px', fontSize: '18px', cursor: 'pointer', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '30px', fontWeight: 'bold' }}>
            Démarrer le Quiz
          </button>
        </div>
      </div>
    );
  }

  // --- ECRAN 2 : RESULTAT ---
  if (step === 'result') {
    return (
      <div style={screenContainer}>
        <div style={whiteCard}>
          <h2 style={{ color: '#000' }}>Votre Résultat</h2>
          <div style={{ fontSize: '50px', fontWeight: 'bold', color: '#27ae60', margin: '30px 0' }}>{finalScore}</div>
          <button onClick={() => window.location.reload()} style={{ padding: '10px 25px', cursor: 'pointer', borderRadius: '5px', border: '2px solid #3498db', background: 'white', color: '#3498db', fontWeight: 'bold' }}>
            Recommencer le test
          </button>
        </div>
      </div>
    );
  }

  // --- ECRAN 3 : LE QUIZ ---
  const currentQ = questions[currentIndex];
  return (
    <div style={screenContainer}>
      <div style={whiteCard}>
        {/* En-tête de la question */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: '#777', fontWeight: 'bold' }}>
          <span>Catégorie : {currentQ.categorie}</span>
          <span>Question {currentIndex + 1} / {questions.length}</span>
        </div>

        {/* Titre de la question en NOIR */}
        <h2 style={questionTitleStyle}>{currentQ.titre}</h2>

        {/* Liste des réponses en NOIR */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {currentQ.answers.map((ans) => (
            <div
              key={ans.id}
              onClick={() => selectResponse(currentQ.id, ans.texteReponse)}
              style={answerOptionStyle(userChoices[currentQ.id] === ans.texteReponse)}
            >
              <input
                type="radio"
                checked={userChoices[currentQ.id] === ans.texteReponse}
                readOnly
                style={{ marginRight: '15px', transform: 'scale(1.2)' }}
              />
              <span style={{ fontWeight: '500' }}>{ans.texteReponse}</span>
            </div>
          ))}
        </div>

        {/* Boutons de navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '35px' }}>
          <button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(currentIndex - 1)}
            style={{ padding: '10px 20px', border: 'none', background: 'none', color: currentIndex === 0 ? '#ccc' : '#3498db', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
          >
            ← Précédent
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={() => setCurrentIndex(currentIndex + 1)}
              style={{ padding: '12px 30px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
            >
              Suivant →
            </button>
          ) : (
            <button
              onClick={submitQuiz}
              style={{ padding: '12px 30px', backgroundColor: '#e67e22', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
            >
              Terminer et voir le score
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;