package com.religatodo.api.controller;

import com.religatodo.api.entity.Professor;
import com.religatodo.api.repository.ProfessorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/professores")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class ProfessorController {

    private final ProfessorRepository professorRepository;

    // GET: Listar todos os professores
    @GetMapping
    public ResponseEntity<List<Professor>> listarProfessores() {
        return ResponseEntity.ok(professorRepository.findAll());
    }
    
    // GET: Listar professores de uma disciplina específica (O seu Materia.jsx está batendo aqui)
    @GetMapping("/disciplina/{idDisciplina}")
    public ResponseEntity<List<Professor>> listarProfessoresPorDisciplina(@PathVariable Long idDisciplina) {
        return ResponseEntity.ok(professorRepository.findAll());
    }
}