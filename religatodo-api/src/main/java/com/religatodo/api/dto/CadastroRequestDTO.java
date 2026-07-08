package com.religatodo.api.dto;

import lombok.Data;

@Data
public class CadastroRequestDTO {
    private String nome;
    private String email;
    private String senha;
    private String cpf; // <-- Adicione esta linha
}