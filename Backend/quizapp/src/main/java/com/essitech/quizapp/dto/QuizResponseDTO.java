package com.essitech.quizapp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter @Setter @AllArgsConstructor
public class QuizResponseDTO {
    private Long questionId;
    private String titre;
    private List<String> options; // On n'envoie que le texte des réponses
}