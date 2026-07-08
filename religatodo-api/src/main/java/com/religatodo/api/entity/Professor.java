package com.religatodo.api.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "professores")
public class Professor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_professor")
    private Long idProfessor;

    // Relacionamento 1 para 1 com Usuario (pois um professor também é um usuário)
    @OneToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @Column(name = "tipo")
    private String tipo; // expositor, atendente, especialista
}