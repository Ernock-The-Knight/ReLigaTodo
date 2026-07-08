package com.religatodo.api.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario") // <-- Diz para o Java: "Meu nome é 'id', mas no banco é 'id_usuario'"
    private Long id;

    @Column(nullable = false, length = 150)
    private String nome;

    @Column(nullable = false, unique = true, length = 200)
    private String email;

    @Column(nullable = false, length = 255)
    private String senhaHash;

    @Column(unique = true, length = 11) // <-- Adicione esta linha
    private String cpf;                 // <-- Adicione esta linha

    @Column(nullable = false)
    private Boolean ativo = true;

    @Column(name = "criado_em")
    private LocalDateTime criadoEm = LocalDateTime.now();
}