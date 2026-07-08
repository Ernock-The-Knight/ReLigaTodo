package com.religatodo.api.controller;

import com.religatodo.api.entity.Disciplina;
import com.religatodo.api.repository.DisciplinaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/disciplinas")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class DisciplinaController {

    private final DisciplinaRepository disciplinaRepository;

    // GET: Listar todas as disciplinas ativas
    @GetMapping
    public ResponseEntity<List<Disciplina>> listarDisciplinas() {
        return ResponseEntity.ok(disciplinaRepository.findAll());
    }

    // 🆕 GET: Buscar uma disciplina específica pelo ID (Adicionado para o Materia.jsx)
    @GetMapping("/{id}")
    public ResponseEntity<Disciplina> buscarDisciplina(@PathVariable Long id) {
        Disciplina disciplina = disciplinaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Disciplina não encontrada com o ID: " + id));
        return ResponseEntity.ok(disciplina);
    }
}