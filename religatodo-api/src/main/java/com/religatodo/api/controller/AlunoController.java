package com.religatodo.api.controller;

import com.religatodo.api.entity.Aluno;
import com.religatodo.api.repository.AlunoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/alunos")
@CrossOrigin(origins = "*")// Permite o React acessar
@RequiredArgsConstructor
public class AlunoController {

    private final AlunoRepository alunoRepository;

    // Endpoint para buscar os dados do aluno pelo ID do usuário
    @GetMapping("/meus-dados/{idUsuario}")
    public ResponseEntity<?> buscarDadosAluno(@PathVariable Long idUsuario) {
        // Tenta encontrar o aluno pelo ID do usuário
        Optional<Aluno> aluno = alunoRepository.findByUsuarioId(idUsuario);
        
        if (aluno.isPresent()) {
            return ResponseEntity.ok(aluno.get());
        } else {
            // Se ainda não tiver perfil de aluno criado, retorna um 404 ou objeto vazio
            return ResponseEntity.status(404).body("Perfil de aluno não encontrado para este usuário.");
        }
    }
}