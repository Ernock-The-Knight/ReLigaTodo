package com.religatodo.api.controller;

import com.religatodo.api.entity.Videoaula;
import com.religatodo.api.repository.VideoaulaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/videoaulas")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class VideoaulaController {

    private final VideoaulaRepository videoaulaRepository;

    // GET: Buscar aulas por ID da disciplina (Usa o import java.util.List)
    @GetMapping("/disciplina/{idDisciplina}")
    public ResponseEntity<List<Videoaula>> listarAulasPorDisciplina(@PathVariable Long idDisciplina) {
        return ResponseEntity.ok(videoaulaRepository.findByTopico_Disciplina_Id(idDisciplina));
    }

    // 🆕 GET: Buscar uma aula específica pelo ID (O que faltava para o player funcionar)
        // 🆕 GET: Buscar uma aula específica pelo ID (Com CORS reforçado)
    @GetMapping("/{id}")
    @CrossOrigin(origins = "*") // <-- Adicione esta linha EXATAMENTE aqui!
    public ResponseEntity<Videoaula> buscarAulaPorId(@PathVariable Long id) {
        Videoaula aula = videoaulaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Aula não encontrada com o ID: " + id));
        return ResponseEntity.ok(aula);
    }
}