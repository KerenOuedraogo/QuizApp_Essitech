package com.essitech.quizapp.config;

import com.essitech.quizapp.model.Answer;
import com.essitech.quizapp.model.Question;
import com.essitech.quizapp.repository.QuestionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(QuestionRepository repository) {
        return args -> {
            if (repository.count() > 0) return;

            String[][] data = {
                    {"Que signifie SQL ?", "SQL", "Structured Query Language", "Simple Question List"},
                    {"Quel hook gere l'etat dans React ?", "ReactJS", "useState", "useEffect"},
                    {"Comment déclarer une constante en JS ?", "JS", "const", "var"},
                    {"Port par défaut de Spring Boot ?", "Java", "8080", "3000"},
                    {"Signification de HTML ?", "Web", "HyperText Markup Language", "Hyperlink Text Language"},
                    {"Quel mot-clé crée une classe en Java ?", "Java", "class", "public"},
                    {"Commande pour installer npm ?", "Node", "npm install", "npm start"},
                    {"Symbole pour les ID en CSS ?", "Web", "#", "."},
                    {"Langage pour styliser une page ?", "Web", "CSS", "Java"},
                    {"Utilité de @RestController ?", "Spring", "Créer une API", "Créer une base de données"}
            };

            for (String[] d : data) {
                Question q = new Question();
                q.setTitre(d[0]);
                q.setCategorie(d[1]);

                Answer a1 = new Answer();
                a1.setTexteReponse(d[2]);
                a1.setCorrect(true);
                a1.setQuestion(q);

                Answer a2 = new Answer();
                a2.setTexteReponse(d[3]);
                a2.setCorrect(false);
                a2.setQuestion(q);

                q.setAnswers(List.of(a1, a2));
                repository.save(q);
            }
            System.out.println("10 questions de test ajoutées !");
        };
    }
}