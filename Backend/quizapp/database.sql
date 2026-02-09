-- SCRIPT POUR POSTGRESQL (Livrable Essitech)

-- 1. Création des tables
CREATE TABLE IF NOT EXISTS question (
                                        id SERIAL PRIMARY KEY,
                                        titre TEXT NOT NULL,
                                        categorie VARCHAR(50)
    );

CREATE TABLE IF NOT EXISTS answer (
                                      id SERIAL PRIMARY KEY,
                                      question_id INT REFERENCES question(id) ON DELETE CASCADE,
    texte_reponse TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL
    );

-- 2. Insertion des 10 questions (identiques au DataInitializer)
INSERT INTO question (id, titre, categorie) VALUES (1, 'Que signifie SQL ?', 'SQL');
INSERT INTO answer (question_id, texte_reponse, is_correct) VALUES (1, 'Structured Query Language', true), (1, 'Simple Question List', false);

INSERT INTO question (id, titre, categorie) VALUES (2, 'Quel hook gere l''etat dans React ?', 'ReactJS');
INSERT INTO answer (question_id, texte_reponse, is_correct) VALUES (2, 'useState', true), (2, 'useEffect', false);

INSERT INTO question (id, titre, categorie) VALUES (3, 'Comment déclarer une constante en JS ?', 'JS');
INSERT INTO answer (question_id, texte_reponse, is_correct) VALUES (3, 'const', true), (3, 'var', false);

INSERT INTO question (id, titre, categorie) VALUES (4, 'Port par défaut de Spring Boot ?', 'Java');
INSERT INTO answer (question_id, texte_reponse, is_correct) VALUES (4, '8080', true), (4, '3000', false);

INSERT INTO question (id, titre, categorie) VALUES (5, 'Signification de HTML ?', 'Web');
INSERT INTO answer (question_id, texte_reponse, is_correct) VALUES (5, 'HyperText Markup Language', true), (5, 'Hyperlink Text Language', false);

INSERT INTO question (id, titre, categorie) VALUES (6, 'Quel mot-clé crée une classe en Java ?', 'Java');
INSERT INTO answer (question_id, texte_reponse, is_correct) VALUES (6, 'class', true), (6, 'public', false);

INSERT INTO question (id, titre, categorie) VALUES (7, 'Commande pour installer npm ?', 'Node');
INSERT INTO answer (question_id, texte_reponse, is_correct) VALUES (7, 'npm install', true), (7, 'npm start', false);

INSERT INTO question (id, titre, categorie) VALUES (8, 'Symbole pour les ID en CSS ?', 'Web');
INSERT INTO answer (question_id, texte_reponse, is_correct) VALUES (8, '#', true), (8, '.', false);

INSERT INTO question (id, titre, categorie) VALUES (9, 'Langage pour styliser une page ?', 'Web');
INSERT INTO answer (question_id, texte_reponse, is_correct) VALUES (9, 'CSS', true), (9, 'Java', false);

INSERT INTO question (id, titre, categorie) VALUES (10, 'Utilité de @RestController ?', 'Spring');
INSERT INTO answer (question_id, texte_reponse, is_correct) VALUES (10, 'Créer une API', true), (10, 'Créer une base de données', false);