package com.religatodo.api.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "videoaulas")
public class Videoaula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_video")
    private Long id;

    // Relacionamento com Tópico (para saber qual matéria/aula)
    @ManyToOne
    @JoinColumn(name = "id_topico")
    private TopicoEmenta topico;

    @ManyToOne
    @JoinColumn(name = "id_professor")
    private Professor professor;

    @Column(nullable = false, length = 300)
    private String titulo;

    @Column(columnDefinition = "TEXT")
    private String urlVideo;

    @Column(name = "duracao_segundos", nullable = false)
    private Integer duracaoSegundos;

    @Column(nullable = false)
    private Integer bimestre;

    @Column(nullable = false)
    private Boolean publicado = false;
}