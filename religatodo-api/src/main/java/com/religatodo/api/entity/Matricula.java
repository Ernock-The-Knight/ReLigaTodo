package com.religatodo.api.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "matriculas")
public class Matricula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_matricula")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_aluno")
    private Aluno aluno;

    @ManyToOne
    @JoinColumn(name = "id_disciplina")
    private Disciplina disciplina;

    @ManyToOne
    @JoinColumn(name = "id_professor_escolhido")
    private Professor professorEscolhido;

    @Column(nullable = false)
    private Integer bimestre;

    @Column(name = "ano_letivo")
    private Integer anoLetivo;

    @Column(nullable = false)
    private String status = "ativa";

    @Column(name = "nota_final", precision = 4, scale = 2)
    private BigDecimal notaFinal;

    // 🆕 Data de criação da matrícula. Preenchida automaticamente pelo Hibernate!
    @CreationTimestamp
    @Column(name = "criado_em", updatable = false)
    private LocalDateTime criadoEm;
}