package com.religatodo.api.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "topicos_ementa")
public class TopicoEmenta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_topico")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_disciplina")
    private Disciplina disciplina;

    @Column(nullable = false, length = 300)
    private String titulo;

    @Column(nullable = false)
    private Integer ordem;

    @Column(name = "carga_horaria_min")
    private Integer cargaHorariaMin;

    @Column(name = "obrigatorio_mec")
    private Boolean obrigatorioMec;
}