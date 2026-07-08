package com.religatodo.api.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "aluno_favorito")
public class AlunoFavorito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_aluno", referencedColumnName = "idAluno") // <-- Isso resolve o erro
    private Aluno aluno;

    @ManyToOne
    @JoinColumn(name = "id_disciplina")
    private Disciplina disciplina;
}