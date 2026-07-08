package com.religatodo.api.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "alunos")
public class Aluno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAluno;

        // Relacionamento 1 para 1 com Usuario
    @OneToOne
    @JoinColumn(name = "id_usuario") // <-- Remova a parte 'referencedColumnName'
    private Usuario usuario;

    @Column(name = "data_matricula")
    private LocalDate dataMatricula;

    @Column(name = "bimestre_entrada")
    private Integer bimestreEntrada;

    @Column(name = "tag_acessibilidade")
    private String tagAcessibilidade;
}