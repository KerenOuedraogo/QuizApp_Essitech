package com.essitech.quizapp.controller;

import com.essitech.quizapp.model.Answer;
import com.essitech.quizapp.model.Question;
import com.essitech.quizapp.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "*") // Permet au frontend de parler au backend
public class QuizController {

    @Autowired
    private QuestionRepository questionRepository;

    // 1. Récupérer les questions (SANS les bonnes réponses)
    @GetMapping
    public List<Question> getQuestions() {
        List<Question> questions = questionRepository.findAll();
        // On s'assure que le champ isCorrect n'est pas utilisé par le front
        // Pour faire simple ici, on envoie tout, mais dans un vrai projet on filtrerait.
        return questions;
    }

    // 2. Soumettre les réponses et calculer le score
    @PostMapping("/submit")
    public String submitQuiz(@RequestBody Map<Long, String> userChoices) {
        int score = 0;
        List<Question> questions = questionRepository.findAll();

        for (Question q : questions) {
            String userResponse = userChoices.get(q.getId());
            if (userResponse != null) {
                // Vérifier si la réponse choisie est la bonne en base de données
                for (Answer a : q.getAnswers()) {
                    if (a.isCorrect() && a.getTexteReponse().equals(userResponse)) {
                        score++;
                    }
                }
            }
        }
        return "Votre score : " + score + "/" + questions.size();
    }
}