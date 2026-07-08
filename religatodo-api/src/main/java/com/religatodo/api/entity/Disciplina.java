package com.religatodo.api.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "disciplinas")
public class Disciplina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_disciplina")
    private Long id;

    @Column(nullable = false, length = 200)
    private String nome;

    @Column(name = "codigo_mec", length = 30)
    private String codigoMec;

    @Column(name = "carga_horaria_total")
    private Integer cargaHorariaTotal;

    @Column(nullable = false)
    private Boolean ativa = true;
}